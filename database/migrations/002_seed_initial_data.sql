-- Run once in the Supabase SQL Editor after 001_supabase_schema.sql.
-- It imports the sample content bundled with the application. Existing rows
-- (matching an id) are deliberately left unchanged.

insert into public.berita (id, judul, slug, ringkasan, konten, kategori, gambar, penulis, tanggal, dibaca, unggulan) values
('b1', 'Musrenbangdes Tahun 2026: Pembahasan RKPDes Fokus Pada Pembangunan Infrastruktur dan UMKM', 'musrenbangdes-2026-pembangunan-infrastruktur', 'Pemerintah Desa Kebonratu menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) bersama BPD, tokoh masyarakat, dan perwakilan perempuan.', $$Pemerintah Desa Kebonratu menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) penetapan RKPDes Tahun 2026 di Balai Desa Kebonratu pada Kamis (15/1/2026).

Acara ini dihadiri oleh Kepala Desa Kebonratu H. Ahmad Syauqi, S.IP, Camat Lebakwangi, Ketua BPD, Babinsa, Bhabinkamtibmas, serta tokoh masyarakat dan kelompok perempuan PKK.

Dalam sambutannya, Kepala Desa menyampaikan bahwa fokus penganggaran Dana Desa 2026 diprioritaskan untuk pemerataan jalan usaha tani, penguatan ketahanan pangan lokal, pendampingan UMKM Emping Melinjo, serta digitalisasi pelayanan administrasi kependudukan.$$, 'Pemerintahan', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', 'Sekretariat Desa', '15 Januari 2026', 342, true),
('b2', 'Panen Raya Padi Organik Dusun Karangtengah Hasil Tanam Musim Hujan 2025/2026', 'panen-raya-padi-organik-dusun-karangtengah', 'Kelompok Tani Tani Makmur Kebonratu berhasil meningkatkan produktivitas panen padi organik hingga 7.8 ton per hektar.', $$Kelompok Tani "Tani Makmur" Dusun Karangtengah Desa Kebonratu merayakan panen raya padi varietas Ciherang Organik pada lahan seluas 25 hektar.

Ketua Kelompok Tani mengungkapkan, berkat bantuan perbaikan jaringan irigasi tersier dari APBDes Kebonratu dan penyuluhan Dinas Pertanian Kabupaten Serang, hasil panen meningkat dari sebelumnya 6.2 ton menjadi 7.8 ton per hektar.

Kepala Desa Kebonratu turut hadir memotong batang padi pertama dan menjanjikan bantuan mesin traktor tangan tambahan pada alokasi tahun 2026.$$, 'Ekonomi', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'Tim Ekonomi Desa', '28 Januari 2026', 289, true),
('b3', 'Pelatihan Sertifikasi Halal dan Kemasan Digital Bagi Pengrajin Emping Melinjo Kebonratu', 'pelatihan-sertifikasi-halal-umkm-emping', 'Sebanyak 35 pelaku UMKM olahan melinjo mengikuti workshop sertifikasi halal gratis bekerja sama dengan Halal Center Banten.', $$Pemerintah Desa Kebonratu memfasilitasi pendampingan sertifikasi Halal dan desain kemasan modern bagi 35 pengrajin Emping Melinjo di Dusun Babakan Jaya.

Melalui pelatihan ini, produk emping khas Kebonratu kini dikemas dalam aluminium foil tahan udara dengan barcode QR dan merek kolektif "Kebonratu Gold". Produk ini disiapkan untuk menembus supermarket modern di Serang, Cilegon, hingga Jabodetabek.$$, 'Pembangunan', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80', 'Kaur Ekbang', '10 Februari 2026', 215, false),
('b4', 'Kegiatan Posyandu Integrasi Layanan Primer (ILP) Balita dan Lansia Dusun Kebonratu I', 'posyandu-ilp-balita-lansia-kebonratu-i', 'Kader PKK dan Posyandu Desa Kebonratu secara rutin menggelar penimbangan balita, pemberian makanan tambahan (PMT), dan cek kesehatan gratis.', $$Kader Posyandu Mawar Dusun Kebonratu I melayani lebih dari 120 balita dan 45 lansia dalam program Integrasi Layanan Primer (ILP) bersama bidan desa dan tim Puskesmas Lebakwangi.

Program pencegahan stunting menjadi prioritas utama dengan penyaluran PMT bergizi seimbang berbahan baku telur ayam kampung dan olahan ikan lokal.$$, 'Kemasyarakatan', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', 'Kader PKK', '18 Februari 2026', 178, false)
on conflict (id) do nothing;

insert into public.agenda (id, judul, tanggal, waktu, lokasi, penyelenggara, keterangan, status) values
('a1', 'Gotong Royong Bersih Saluran Irigasi Sambut Musim Tanam II', '2026-03-08', '07.00 - 11.00 WIB', 'Saluran Irigasi Blok Karangtengah', 'Pemerintah Desa & Gabungan Kelompok Tani', 'Diimbau kepada seluruh warga dan petani membawa alat kerja bakti cangkul dan sabit.', 'Mendatang'),
('a2', 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap I 2026', '2026-03-12', '08.30 - 14.00 WIB', 'Balai Desa Kebonratu', 'Kasi Kesejahteraan Desa Kebonratu', 'Penerima KPM wajib membawa KTP asli, KK, dan Surat Undangan resmi.', 'Mendatang'),
('a3', 'Turnamen Sepakbola Karang Taruna Cup "Kebonratu Bersatu"', '2026-03-20', '15.30 - 18.00 WIB', 'Lapangan Sepakbola Kebonratu', 'Karang Taruna Karya Kebonratu', 'Diikuti oleh 8 tim antar-RT se-Desa Kebonratu mempererat silaturahmi pemuda.', 'Mendatang')
on conflict (id) do nothing;

insert into public.pengumuman (id, judul, isi, tanggal, prioritas, "fileUrl") values
('p1', 'Jadwal Batas Akhir Pembayaran PBB-P2 Tahun 2026 dan Layanan Mobil Keliling Bapenda', 'Diberitahukan kepada seluruh wajib pajak Desa Kebonratu bahwa Mobil Pelayanan Keliling Pembayaran PBB-P2 akan hadir di Kantor Desa pada Selasa, 10 Maret 2026. Manfaatkan kemudahan tanpa denda!', '25 Februari 2026', 'Penting', null),
('p2', 'Pendaftaran Program Bantuan Sertifikat Tanah Gratis (PTSL) Tahap II Desa Kebonratu', 'Pemerintah Desa Kebonratu membuka pendaftaran kelengkapan berkas PTSL bagi warga pemilik tanah yang belum bersertifikat. Persyaratan: Fotokopi KTP, KK, SPPT PBB, dan surat alas hak tanah.', '20 Februari 2026', 'Mendesak', null),
('p3', 'Himbauan Kewaspadaan Cuaca Ekstrem dan Kebersihan Lingkungan RT/RW', 'Berdasarkan rilis BMKG Serang, diimbau kepada para Ketua RT/RW untuk menggiatkan siskamling dan pembersihan saluran air guna mengantisipasi genangan air.', '12 Februari 2026', 'Normal', null)
on conflict (id) do nothing;

insert into public.perangkat_desa (id, nama, jabatan, nipd, pendidikan, foto, telepon, kategori) values
('pd1', 'H. Ahmad Syauqi, S.IP', 'Kepala Desa', '19680514 198903 1 005', 'S1 Ilmu Pemerintahan', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', '(0254) 892-104', 'Pemerintah Desa'),
('pd2', 'Rina Mulyani, S.STP', 'Sekretaris Desa', '19830415 201001 1 004', 'S1 Agribisnis', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', '(0254) 892-105', 'Pemerintah Desa'),
('pd3', 'Dewi Suryani', 'Kaur Keuangan', '19851121 201102 2 008', 'S1 Akuntansi', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', '(0254) 892-106', 'Pemerintah Desa'),
('pd4', 'Joko Sutrisno', 'Kepala Urusan Pemerintahan', '19870312 201401 1 012', 'S1 Hukum', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', '(0254) 892-107', 'Pemerintah Desa'),
('pd5', 'Toni Suryana', 'Ketua BPD', '19771212 200401 1 015', 'SMA / Sederajat', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', '(0254) 892-108', 'BPD'),
('pd6', 'Siti Aminah', 'Ketua PKK Desa', '19890918 201701 2 020', 'SMA / Sederajat', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', '(0254) 892-109', 'PKK'),
('pd7', 'Rizki Maulana', 'Ketua Karang Taruna', '20010105 202001 1 032', 'SMA / Sederajat', 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', '(0254) 892-110', 'Karang Taruna')
on conflict (id) do nothing;

insert into public.galeri (id, judul, tipe, url, kategori, album, tanggal, deskripsi) values
('g1', 'Suasana Sawah Hijau dan Alam Asri Kebonratu', 'foto', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'Keindahan Alam', 'Pesona Alam Kebonratu', '10 Januari 2026', 'Hamparan sawah terbentang di Dusun Karangtengah Kebonratu Serang.'),
('g2', 'Kantor Balai Desa Kebonratu Tampak Depan', 'foto', '/src/assets/images/kebonratu_office_1785575436763.jpg', 'Kegiatan Desa', 'Infrastruktur Publik', '05 Januari 2026', 'Gedung pelayanan warga dan ruang sekretariat desa.'),
('g3', 'Proses Pembuatan Emping Melinjo Super Kebonratu', 'foto', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80', 'Budaya & Tradisi', 'Sentra UMKM Melinjo', '12 Februari 2026', 'Pengrajin melinjo menumbuk secara tradisional menghasilkan emping renyah khas Serang.'),
('g4', 'Pembangunan Jalan Rabat Beton Dusun Cilaku', 'foto', 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80', 'Pembangunan', 'Realisasi Pembangunan APBDes', '20 Januari 2026', 'Hasil kerja bakti dan rabat beton jalan lingkungan.'),
('g5', 'Pentas Seni Budaya Pencak Silat Khas Banten', 'foto', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', 'Budaya & Tradisi', 'Festival Seni Kebonratu', '17 Agustus 2025', 'Penampilan pesilat muda Karang Taruna Kebonratu.'),
('g6', 'Profil Video Singkat Desa Kebonratu 2026', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Kegiatan Desa', 'Video Profil', '01 Februari 2026', 'Video dokumenter perkembangan dan keindahan Desa Kebonratu.')
on conflict (id) do nothing;

insert into public.potensi (id, nama, kategori, deskripsi, gambar, lokasi, pemilik, "kontakWA", "hargaRange") values
('pot1', 'Emping Melinjo "Kebonratu Gold"', 'UMKM', 'Emping melinjo asli tanpa campuran bahan pengawet, diproduksi secara tradisional oleh warga Babakan Jaya. Tersedia rasa original gurih dan manis pedas.', 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', 'Dusun Babakan Jaya, RT 02/03', 'Ibu Hj. Aminah', '081289001234', 'Rp 45.000 - Rp 75.000 / kg'),
('pot2', 'Bebek Bakar & Telur Asin khas Kebonratu', 'UMKM', 'Olahan daging bebek empuk dengan bumbu rempah khas Serang dan produksi telur asin masir bernutrisi tinggi dari peternakan lokal.', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80', 'Dusun Kebonratu I, RT 04/01', 'H. Mastur', '081398765432', 'Rp 25.000 - Rp 35.000 / porsi'),
('pot3', 'Lumbung Padi Ciherang & Irigasi Desa', 'Pertanian', 'Kawasan persawahan produktif seluas 180 hektar yang memasok kebutuhan beras berkualitas tinggi untuk wilayah Serang Utara dan sekitarnya.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', 'Dusun Karangtengah & Cilaku', 'Gabungan Kelompok Tani (Gapoktan) Kebonratu', null, 'Hasil Panen > 1.200 Ton / Tahun'),
('pot4', 'Wisata Edukasi Sawah & Saung Kuliner Desa', 'Wisata', 'Destinasi wisata keluarga dengan saung bambu di tengah hamparan sawah, jalur sepeda santai, tempat pemancingan ikan, dan spot foto instagramable.', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80', 'Dusun Kebonratu II (Cilaku)', 'BUMDes Kebonratu Sejahtera', '081289001234', 'Tiket Masuk: Gratis / Parkir Rp 5.000'),
('pot5', 'Peternakan Kambing PE & Bebek Petelur', 'Peternakan', 'Budi daya peternakan kambing peranakan etawa dan bebek petelur skala menengah yang dikelola secara modern dan ramah lingkungan.', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80', 'Dusun Karangtengah', 'Koperasi Ternak Mandiri', '087812349988', 'Suplai Susu & Telur Harian')
on conflict (id) do nothing;

insert into public.surat_requests (id, nik, "namaLengkap", "noHp", rt, rw, dusun, "jenisSurat", keperluan, "tanggalPengajuan", status, "dokumenSyarat", "catatanPetugas", "tanggalSelesai") values
('KR-2026-8942', '3604121508880001', 'Budi Santoso', '081234567890', '02', '01', 'Dusun Kebonratu I', 'Surat Keterangan Domisili', 'Kelengkapan administrasi lamaran pekerjaan di Cilegon', '2026-02-25', 'Selesai', null, 'Surat telah ditandatangani secara digital oleh Kepala Desa.', '2026-02-26'),
('KR-2026-9104', '3604122003920004', 'Siti Rahmawati', '085712345678', '01', '03', 'Dusun Babakan Jaya', 'Surat Keterangan Usaha (SKU)', 'Pengajuan kredit KUR modal usaha Emping Melinjo di Bank BRI', '2026-02-28', 'Diproses', null, 'Dokumen sedang dalam pemeriksaan Kasi Pemerintahan.', null)
on conflict (id) do nothing;

insert into public.penduduk (id, nik, nama, "jenisKelamin", "tempatLahir", "tanggalLahir", dusun, rt, rw, agama, pendidikan, pekerjaan, "statusPernikahan", "bantuanSosial") values
('pend1', '3604121508880001', 'Budi Santoso', 'Laki-laki', 'Serang', '1988-08-15', 'Dusun Kebonratu I', '02', '01', 'Islam', 'SMA / Sederajat', 'Wiraswasta', 'Menikah', array['BLT Dana Desa']),
('pend2', '3604122003920004', 'Siti Rahmawati', 'Perempuan', 'Serang', '1992-03-20', 'Dusun Babakan Jaya', '01', '03', 'Islam', 'D3 / Diploma', 'Pedagang / UMKM', 'Menikah', array['BPNT']),
('pend3', '3604120101750002', 'H. Suparman', 'Laki-laki', 'Serang', '1975-01-01', 'Dusun Karangtengah', '03', '02', 'Islam', 'S1 / Sarjana', 'Petani / Pekebun', 'Menikah', array[]::text[]),
('pend4', '3604121010010005', 'Ahmad Faisal', 'Laki-laki', 'Serang', '2001-10-10', 'Dusun Kebonratu II', '01', '04', 'Islam', 'SMA / Sederajat', 'Karyawan Swasta', 'Belum Menikah', array[]::text[]),
('pend5', '3604120505680003', 'Hj. Maryam', 'Perempuan', 'Serang', '1968-05-05', 'Dusun Kebonratu I', '01', '01', 'Islam', 'SMP / Sederajat', 'Ibu Rumah Tangga', 'Cerai Mati', array['PKH', 'BLT Dana Desa'])
on conflict (id) do nothing;

insert into public.apbdes (id, tahun, kategori, "subKategori", anggaran, realisasi) values
('apb1', 2026, 'Pendapatan', 'Dana Desa (APBN)', 980000000, 490000000),
('apb2', 2026, 'Pendapatan', 'Alokasi Dana Desa (ADD Serang)', 520000000, 260000000),
('apb3', 2026, 'Pendapatan', 'Bagi Hasil Pajak & Retribusi', 65000000, 32500000),
('apb4', 2026, 'Pendapatan', 'Pendapatan Asli Desa (PADes)', 45000000, 28000000),
('apb5', 2026, 'Pendapatan', 'Bantuan Keuangan Provinsi Banten', 100000000, 100000000),
('apb6', 2026, 'Belanja', 'Penyelenggaraan Pemerintahan Desa', 540000000, 270000000),
('apb7', 2026, 'Belanja', 'Pelaksanaan Pembangunan Desa', 710000000, 380000000),
('apb8', 2026, 'Belanja', 'Pembinaan Kemasyarakatan', 180000000, 95000000),
('apb9', 2026, 'Belanja', 'Pemberdayaan Masyarakat (UMKM/Tani)', 220000000, 110000000),
('apb10', 2026, 'Belanja', 'Penanggulangan Bencana & Darurat', 60000000, 15000000)
on conflict (id) do nothing;
