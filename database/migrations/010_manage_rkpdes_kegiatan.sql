-- Jalankan setelah migration 009. RKPDes memuat kegiatan rencana kerja desa
-- tahunan dan dipisahkan dari program RPJMDes yang berlaku per periode.
create table if not exists public.rkpdes_kegiatan (
  id text primary key,
  tahun integer not null check (tahun >= 2000),
  kegiatan text not null,
  bidang text not null,
  anggaran bigint not null check (anggaran >= 0),
  status text not null
);

alter table public.rkpdes_kegiatan enable row level security;

drop policy if exists "rkpdes publik" on public.rkpdes_kegiatan;
drop policy if exists "petugas kelola rkpdes" on public.rkpdes_kegiatan;
create policy "rkpdes publik" on public.rkpdes_kegiatan for select using (true);
create policy "petugas kelola rkpdes" on public.rkpdes_kegiatan for all to authenticated using (public.is_staff()) with check (public.is_staff());

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'rkpdes_kegiatan'
  ) then
    alter publication supabase_realtime add table public.rkpdes_kegiatan;
  end if;
end;
$$;

drop trigger if exists audit_rkpdes_kegiatan on public.rkpdes_kegiatan;
create trigger audit_rkpdes_kegiatan
  after insert or update or delete on public.rkpdes_kegiatan
  for each row execute function public.log_staff_change();
