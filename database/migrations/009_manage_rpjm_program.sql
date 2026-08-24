-- Jalankan setelah migration 008. Menjadikan daftar program RPJM dapat
-- dikelola operator melalui dashboard, tanpa tercampur dengan pos APBDes.
create table if not exists public.rpjm_program (
  id text primary key,
  program text not null,
  bidang text not null,
  biaya bigint not null check (biaya >= 0),
  status text not null
);

alter table public.rpjm_program enable row level security;

drop policy if exists "rpjm publik" on public.rpjm_program;
drop policy if exists "petugas kelola rpjm" on public.rpjm_program;
create policy "rpjm publik" on public.rpjm_program for select using (true);
create policy "petugas kelola rpjm" on public.rpjm_program for all to authenticated using (public.is_staff()) with check (public.is_staff());

insert into public.rpjm_program (id, program, bidang, biaya, status) values
('rpjm1', 'Penyelenggaraan Posyandu', 'Kesehatan', 720000000, 'Terlaksananya penyelenggaraan Posyandu'),
('rpjm2', 'Penyuluhan dan pelatihan bidang kesehatan', 'Kesehatan', 40000000, 'Terlaksananya penyuluhan dan pelatihan kesehatan'),
('rpjm3', 'Pemeliharaan jalan desa', 'Pekerjaan umum', 50000000, 'Terlaksananya pemeliharaan jalan desa'),
('rpjm4', 'Pemeliharaan jalan lingkungan / gang', 'Pekerjaan umum', 800000000, 'Terlaksananya pemeliharaan jalan lingkungan'),
('rpjm5', 'Pembangunan / rehabilitasi jalan desa', 'Pekerjaan umum', 1500000000, 'Terlaksananya pembangunan dan rehabilitasi jalan desa'),
('rpjm6', 'Peningkatan / pengerasan jalan lingkungan', 'Pekerjaan umum', 1000000000, 'Terlaksananya peningkatan jalan lingkungan'),
('rpjm7', 'Rehabilitasi prasarana jalan dan drainase', 'Pekerjaan umum', 1000000000, 'Terlaksananya rehabilitasi prasarana jalan desa'),
('rpjm8', 'Pemeliharaan sanitasi lingkungan', 'Pekerjaan umum', 160000000, 'Terlaksananya pemeliharaan sanitasi'),
('rpjm9', 'Pembangunan / peningkatan saluran irigasi', 'Pertanian', 500000000, 'Terlaksananya pembangunan saluran irigasi'),
('rpjm10', 'Penyelenggaraan festival kesenian dan keagamaan', 'Kemasyarakatan', 80000000, 'Terlaksananya festival kesenian dan keagamaan'),
('rpjm11', 'Pembentukan BUM Desa', 'Pemberdayaan ekonomi', 200000000, 'Terlaksananya pembentukan BUM Desa'),
('rpjm12', 'Pengadaan teknologi tepat guna untuk pengembangan pertanian', 'Pemberdayaan ekonomi', 25000000, 'Terlaksananya pengadaan teknologi tepat guna')
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'rpjm_program'
  ) then
    alter publication supabase_realtime add table public.rpjm_program;
  end if;
end;
$$;

drop trigger if exists audit_rpjm_program on public.rpjm_program;
create trigger audit_rpjm_program
  after insert or update or delete on public.rpjm_program
  for each row execute function public.log_staff_change();
