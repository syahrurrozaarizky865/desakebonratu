create table if not exists public.sambutan_kepala_desa (
  id text primary key, nama text not null, jabatan text not null, periode text not null, foto text not null,
  judul text not null, salam text not null, "isiPertama" text not null, "isiKedua" text not null, visi text not null
);

alter table public.sambutan_kepala_desa enable row level security;
create policy "sambutan publik" on public.sambutan_kepala_desa for select using (true);
create policy "petugas kelola sambutan" on public.sambutan_kepala_desa for all to authenticated using (public.is_staff()) with check (public.is_staff());

insert into public.sambutan_kepala_desa (id, nama, jabatan, periode, foto, judul, salam, "isiPertama", "isiKedua", visi)
values ('utama', 'H. Ahmad Syauqi, S.IP', 'Kepala Desa Kebonratu', 'Periode 2021-2027', '/src/assets/images/kebonratu_kades_1785575447875.jpg', 'Bersama Membangun Desa Kebonratu yang Asri, Sejahtera & Transparan', 'Sampurasun, Assalamu''alaikum Warahmatullahi Wabarakatuh.', 'Selamat datang di portal informasi dan layanan digital resmi Pemerintah Desa Kebonratu, Kecamatan Lebakwangi, Kabupaten Serang. Website ini kami hadirkan sebagai sarana transparansi publik, publikasi potensi desa, serta mempermudah seluruh masyarakat dalam mengurus administrasi kependudukan secara mandiri dan cepat.', 'Mari bersama-sama kita jaga semangat gotong royong, mendukung kemajuan UMKM emping melinjo dan sektor pertanian, serta mewujudkan tata kelola pemerintahan desa yang bersih, modern, dan melayani.', 'Terwujudnya Desa Kebonratu yang Maju, Sejahtera, Adil, dan Agamis.')
on conflict (id) do nothing;
