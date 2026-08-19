-- Run this file once in Supabase SQL Editor.
-- Column names intentionally follow the existing TypeScript model so PostgREST
-- can read/write records without a mapping layer.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'operator' check (role in ('admin', 'operator')),
  avatar text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.handle_new_user();

create table if not exists public.berita (
  id text primary key, judul text not null, slug text not null unique, ringkasan text not null,
  konten text not null, kategori text not null, gambar text not null, penulis text not null,
  tanggal text not null, dibaca integer not null default 0, unggulan boolean not null default false
);
create table if not exists public.agenda (
  id text primary key, judul text not null, tanggal text not null, waktu text not null,
  lokasi text not null, penyelenggara text not null, keterangan text not null, status text not null
);
create table if not exists public.pengumuman (
  id text primary key, judul text not null, isi text not null, tanggal text not null,
  prioritas text not null, "fileUrl" text
);
create table if not exists public.perangkat_desa (
  id text primary key, nama text not null, jabatan text not null, nipd text, pendidikan text not null,
  foto text not null, telepon text not null, kategori text not null
);
create table if not exists public.galeri (
  id text primary key, judul text not null, tipe text not null, url text not null, kategori text not null,
  album text not null, tanggal text not null, deskripsi text not null
);
create table if not exists public.potensi (
  id text primary key, nama text not null, kategori text not null, deskripsi text not null,
  gambar text not null, lokasi text not null, pemilik text, "kontakWA" text, "hargaRange" text
);
create table if not exists public.surat_requests (
  id text primary key, nik text not null, "namaLengkap" text not null, "noHp" text not null,
  rt text not null, rw text not null, dusun text not null, "jenisSurat" text not null,
  keperluan text not null, "tanggalPengajuan" text not null, status text not null,
  "dokumenSyarat" text, "catatanPetugas" text, "tanggalSelesai" text
);
create table if not exists public.penduduk (
  id text primary key, nik text not null unique, nama text not null, "jenisKelamin" text not null,
  "tempatLahir" text not null, "tanggalLahir" text not null, dusun text not null, rt text not null,
  rw text not null, agama text not null, pendidikan text not null, pekerjaan text not null,
  "statusPernikahan" text not null, "bantuanSosial" text[] not null default '{}'
);
create table if not exists public.apbdes (
  id text primary key, tahun integer not null, kategori text not null, "subKategori" text not null,
  anggaran bigint not null check (anggaran >= 0), realisasi bigint not null check (realisasi >= 0)
);

alter table public.profiles enable row level security;
alter table public.berita enable row level security;
alter table public.agenda enable row level security;
alter table public.pengumuman enable row level security;
alter table public.perangkat_desa enable row level security;
alter table public.galeri enable row level security;
alter table public.potensi enable row level security;
alter table public.surat_requests enable row level security;
alter table public.penduduk enable row level security;
alter table public.apbdes enable row level security;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator'));
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Hapus policy lama terlebih dahulu agar migration aman dijalankan ulang di SQL Editor.
drop policy if exists "profile sendiri dapat dibaca" on public.profiles;
drop policy if exists "admin mengelola profil" on public.profiles;
drop policy if exists "berita publik" on public.berita;
drop policy if exists "agenda publik" on public.agenda;
drop policy if exists "pengumuman publik" on public.pengumuman;
drop policy if exists "perangkat publik" on public.perangkat_desa;
drop policy if exists "galeri publik" on public.galeri;
drop policy if exists "potensi publik" on public.potensi;
drop policy if exists "apbdes publik" on public.apbdes;
drop policy if exists "petugas kelola berita" on public.berita;
drop policy if exists "petugas kelola agenda" on public.agenda;
drop policy if exists "petugas kelola pengumuman" on public.pengumuman;
drop policy if exists "petugas kelola perangkat" on public.perangkat_desa;
drop policy if exists "petugas kelola galeri" on public.galeri;
drop policy if exists "petugas kelola potensi" on public.potensi;
drop policy if exists "petugas kelola apbdes" on public.apbdes;
drop policy if exists "warga mengajukan surat" on public.surat_requests;
drop policy if exists "petugas kelola surat" on public.surat_requests;
drop policy if exists "admin kelola penduduk" on public.penduduk;

create policy "profile sendiri dapat dibaca" on public.profiles for select to authenticated using (id = auth.uid());
create policy "admin mengelola profil" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Informasi publik dibaca siapa pun; pengelolaan hanya petugas terautentikasi.
create policy "berita publik" on public.berita for select using (true);
create policy "agenda publik" on public.agenda for select using (true);
create policy "pengumuman publik" on public.pengumuman for select using (true);
create policy "perangkat publik" on public.perangkat_desa for select using (true);
create policy "galeri publik" on public.galeri for select using (true);
create policy "potensi publik" on public.potensi for select using (true);
create policy "apbdes publik" on public.apbdes for select using (true);

create policy "petugas kelola berita" on public.berita for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "petugas kelola agenda" on public.agenda for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "petugas kelola pengumuman" on public.pengumuman for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "petugas kelola perangkat" on public.perangkat_desa for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "petugas kelola galeri" on public.galeri for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "petugas kelola potensi" on public.potensi for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "petugas kelola apbdes" on public.apbdes for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Warga boleh mengajukan surat, tetapi data pribadi hanya dapat dibaca petugas.
create policy "warga mengajukan surat" on public.surat_requests for insert with check (true);
create policy "petugas kelola surat" on public.surat_requests for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "admin kelola penduduk" on public.penduduk for all to authenticated using (public.is_admin()) with check (public.is_admin());
