-- Jalankan setelah 009_create_bumdes.sql. Menyamakan akses BUMDes dengan
-- tabel publik lain: semua pengunjung dapat membaca, hanya petugas masuk
-- yang dapat menambah, mengubah, atau menghapus data.

alter table public.bumdes enable row level security;

drop policy if exists "bumdes publik" on public.bumdes;
drop policy if exists "petugas kelola bumdes" on public.bumdes;

create policy "bumdes publik" on public.bumdes
  for select using (true);

create policy "petugas kelola bumdes" on public.bumdes
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'bumdes'
  ) then
    alter publication supabase_realtime add table public.bumdes;
  end if;
end;
$$;
