-- Menambahkan koordinat GPS untuk instalasi yang tabel bumdes-nya dibuat
-- sebelum kolom latitude dan longitude tersedia.
alter table public.bumdes
  add column if not exists latitude numeric,
  add column if not exists longitude numeric;
