-- Run after 007. Adds no content; it only enables secure public services.

alter table public.surat_requests add column if not exists submitted_at timestamptz not null default now();

create or replace function public.create_surat_request(
  p_nik text, p_nama_lengkap text, p_no_hp text, p_rt text, p_rw text,
  p_dusun text, p_jenis_surat text, p_keperluan text, p_dokumen_syarat text default null
) returns text
language plpgsql security invoker set search_path = public as $$
declare tracking_id text;
begin
  if exists (select 1 from public.surat_requests where nik = p_nik and submitted_at > now() - interval '5 minutes') then
    raise exception 'Permohonan untuk NIK ini baru saja dikirim. Silakan tunggu beberapa menit.';
  end if;
  tracking_id := format('KR-%s-%s', to_char(current_date, 'YYYY'), lpad(nextval('public.surat_tracking_sequence')::text, 6, '0'));
  insert into public.surat_requests (id, nik, "namaLengkap", "noHp", rt, rw, dusun, "jenisSurat", keperluan, "tanggalPengajuan", status, "dokumenSyarat")
  values (tracking_id, p_nik, p_nama_lengkap, p_no_hp, p_rt, p_rw, p_dusun, p_jenis_surat, p_keperluan, current_date::text, 'Menunggu Verifikasi', p_dokumen_syarat);
  return tracking_id;
end;
$$;

-- The earlier version returned a different set of columns; PostgreSQL requires
-- a drop before replacing a function whose table return type has changed.
drop function if exists public.track_surat_request(text);

create function public.track_surat_request(p_tracking_id text)
returns table (
  id text, "jenisSurat" text, "tanggalPengajuan" text,
  status text, "catatanPetugas" text, "tanggalSelesai" text
)
language sql
security definer
set search_path = public
as $$
  select s.id, s."jenisSurat", s."tanggalPengajuan", s.status,
    s."catatanPetugas", s."tanggalSelesai"
  from public.surat_requests s
  where s.id = upper(trim(p_tracking_id));
$$;

revoke all on function public.track_surat_request(text) from public;
grant execute on function public.track_surat_request(text) to anon, authenticated;
revoke all on sequence public.surat_tracking_sequence from public;
grant usage on sequence public.surat_tracking_sequence to anon, authenticated;
revoke all on function public.create_surat_request(text, text, text, text, text, text, text, text, text) from public;
grant execute on function public.create_surat_request(text, text, text, text, text, text, text, text, text) to anon, authenticated;

create table if not exists public.pengaduan (
  id uuid primary key default gen_random_uuid(), nama text not null, email text,
  telepon text, subjek text not null, pesan text not null,
  status text not null default 'Baru', submitted_at timestamptz not null default now()
);
alter table public.pengaduan enable row level security;
drop policy if exists "warga mengirim pengaduan" on public.pengaduan;
drop policy if exists "petugas kelola pengaduan" on public.pengaduan;
create policy "warga mengirim pengaduan" on public.pengaduan for insert with check (char_length(trim(nama)) >= 2 and char_length(trim(pesan)) >= 10);
create policy "petugas kelola pengaduan" on public.pengaduan for all to authenticated using (public.is_staff()) with check (public.is_staff());

create table if not exists public.audit_log (
  id bigint generated always as identity primary key, table_name text not null,
  record_id text, action text not null, actor_id uuid references auth.users(id),
  changed_at timestamptz not null default now(), data jsonb
);
alter table public.audit_log enable row level security;
drop policy if exists "admin baca audit" on public.audit_log;
create policy "admin baca audit" on public.audit_log for select to authenticated using (public.is_admin());

create or replace function public.log_staff_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'DELETE' then
    insert into public.audit_log (table_name, record_id, action, actor_id, data)
    values (tg_table_name, old.id, tg_op, auth.uid(), to_jsonb(old));
    return old;
  end if;
  insert into public.audit_log (table_name, record_id, action, actor_id, data)
  values (tg_table_name, new.id, tg_op, auth.uid(), to_jsonb(new));
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array['berita','agenda','pengumuman','perangkat_desa','galeri','potensi','penduduk','apbdes','sambutan_kepala_desa']
  loop
    if to_regclass('public.' || table_name) is not null then
      execute format('drop trigger if exists audit_%I on public.%I', table_name, table_name);
      execute format('create trigger audit_%I after insert or update or delete on public.%I for each row execute function public.log_staff_change()', table_name, table_name);
    end if;
  end loop;
end;
$$;
