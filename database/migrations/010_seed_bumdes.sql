-- 010_seed_bumdes.sql

INSERT INTO public.bumdes (id, nama, jenis_usaha, deskripsi, alamat, kontak, pemilik, gambar)
VALUES (
  'bum-1',
  'BUMDes Kebonratu Sejahtera',
  'Pengelolaan Wisata & UMKM',
  'BUMDes yang mengelola destinasi wisata edukasi, saung kuliner, serta pendampingan UMKM lokal seperti produksi emping melinjo.',
  'Dusun Kebonratu II',
  '081289001234',
  'Pengurus BUMDes Kebonratu',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
) ON CONFLICT (id) DO NOTHING;