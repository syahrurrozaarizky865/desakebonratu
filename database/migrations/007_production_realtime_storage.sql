-- Production hardening. Run after 001, 003, and 006. This migration adds no
-- sample content and is safe to run on an empty database.

create sequence if not exists public.surat_tracking_sequence start 1000;

create or replace function public.create_surat_request(
  p_nik text, p_nama_lengkap text, p_no_hp text, p_rt text, p_rw text,
  p_dusun text, p_jenis_surat text, p_keperluan text, p_dokumen_syarat text default null
) returns text
language plpgsql
security invoker
set search_path = public
as $$
declare
  tracking_id text;
begin
  tracking_id := format('KR-%s-%s', to_char(current_date, 'YYYY'), lpad(nextval('public.surat_tracking_sequence')::text, 6, '0'));
  insert into public.surat_requests (
    id, nik, "namaLengkap", "noHp", rt, rw, dusun, "jenisSurat", keperluan,
    "tanggalPengajuan", status, "dokumenSyarat"
  ) values (
    tracking_id, p_nik, p_nama_lengkap, p_no_hp, p_rt, p_rw, p_dusun, p_jenis_surat,
    p_keperluan, current_date::text, 'Menunggu Verifikasi', p_dokumen_syarat
  );
  return tracking_id;
end;
$$;

do $$
begin
  if to_regclass('public.sambutan_kepala_desa') is not null
    and not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'sambutan_kepala_desa'
  ) then
    alter publication supabase_realtime add table public.sambutan_kepala_desa;
  end if;
end;
$$;

-- One public bucket for website images. Only authenticated staff may upload.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('desa-media', 'desa-media', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "media publik dibaca" on storage.objects;
drop policy if exists "petugas unggah media" on storage.objects;
drop policy if exists "petugas ubah media" on storage.objects;
drop policy if exists "petugas hapus media" on storage.objects;
create policy "media publik dibaca" on storage.objects for select using (bucket_id = 'desa-media');
create policy "petugas unggah media" on storage.objects for insert to authenticated with check (bucket_id = 'desa-media' and public.is_staff());
create policy "petugas ubah media" on storage.objects for update to authenticated using (bucket_id = 'desa-media' and public.is_staff()) with check (bucket_id = 'desa-media' and public.is_staff());
create policy "petugas hapus media" on storage.objects for delete to authenticated using (bucket_id = 'desa-media' and public.is_staff());

-- Give the first trusted account admin access manually in SQL Editor:
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
