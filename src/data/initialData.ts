import {
  Berita,
  Agenda,
  Pengumuman,
  PerangkatDesa,
  GaleriItem,
  PotensiItem,
  SuratRequest,
  PendudukItem,
  APBDesItem
} from '../types';
import heroImage from '../assets/images/kebonratu_hero_1785575421949.jpg';

// Import the hero asset so Vite copies it into the production build.
export const HERO_IMAGE = heroImage;
export const KANTOR_IMAGE = '/src/assets/images/kebonratu_office_1785575436763.jpg';
export const KADES_IMAGE = '/src/assets/images/kebonratu_kades_1785575447875.jpg';
export const KANTOR_DESA_MAP_URL = 'https://www.google.com/maps/place/Kantor+Desa+Kebonratu/@-6.098286,106.2512215,17z/data=!3m1!4b1!4m6!3m5!1s0x2e41f7005d9bf2fb:0x8b48a97476945ce!8m2!3d-6.098286!4d106.2537964!16s%2Fg%2F11wvk84sz9';
// Google Maps blocks regular place URLs inside iframes, so search the official place name via its supported embed endpoint.
export const KANTOR_DESA_MAP_EMBED_URL = 'https://www.google.com/maps?q=Kantor+Desa+Kebonratu%2C+W723%2BMGM%2C+Kebonratu%2C+Kec.+Lebak+Wangi%2C+Kabupaten+Serang%2C+Banten&z=17&output=embed';

export const PROFIL_DESA_DATA = {
  nama: 'Desa Kebonratu',
  kecamatan: 'Kec. Lebak Wangi',
  kabupaten: 'Kabupaten Serang',
  provinsi: 'Banten',
  kodePos: '42182',
  alamat: 'W723+MGM, Kp. Warakas, RT.003/RW.002, Kebonratu',
  email: 'dkebonratu@gmail.com',
  telepon: '087741196061',
  whatsapp: '087741196061',
  luasWilayah: 2.8, // km²
  jumlahPenduduk: 4532,
  jumlahKK: 1373,
  jumlahDusun: 6,
  jumlahRT: 10,
  jumlahRW: 5,
  sumberData: 'Dokumen Perubahan RPJM Desa Kebonratu Tahun 2022-2029',
  tahunData: 2025,
  jarakKeKecamatanKm: 3,
  waktuKeKecamatanMenit: 15,
  jarakKeKabupatenKm: 12,
  waktuKeKabupatenMenit: 45,
  luasPadiSawahHa: 280,
  petaCoordinates: {
    lat: -6.098286,
    lng: 106.2537964
  },
  sejarah: `Desa Kebonratu berada di Kecamatan Lebak Wangi, Kabupaten Serang. Kecamatan Lebak Wangi merupakan kecamatan pemekaran dari Kecamatan Ciruas, Kragilan, Carenang, dan Pontang berdasarkan Peraturan Daerah Kabupaten Serang Nomor 7 Tahun 2012.

Sesuai namanya, Desa Kebonratu dahulu merupakan area perkebunan yang dimiliki seorang ratu dari Kerajaan Banten. Pemerintahan Desa Kebonratu berdiri sekitar tahun 1932 dan mula-mula dipimpin oleh Lurah H. Asmad (1932-1942), kemudian dilanjutkan oleh Lurah H. Juarsa (1942-1952).`,
  sejarahLengkap: 'Pada awal Pemerintahan Republik Indonesia, sistem pemerintahan lurah/kelurahan diganti menjadi kepala desa. Namun, sistem pemerintahan desa belum dapat dilaksanakan secara maksimal sehingga masa bakti jabatan kepala desa belum jelas dan belum ada pemilihan kepala desa secara demokratis sampai tahun 1980.',
  riwayatKepalaDesa: [
    ['1932-1942', 'H. Asmad'], ['1942-1952', 'H. Juarsa'], ['1952-1960', 'Nawawi'], ['1960-1961', 'H. Idris (PJS)'],
    ['1961-1971', 'Tawi'], ['1971-1975', 'H. Abu Bakar'], ['1975-1980', 'H. Amsur (PJS)'], ['1980-1988', 'H. Kasnari'],
    ['1988-1990', 'H. Abdulmalik'], ['1990-1998', 'Sawiri'], ['1998-2000', 'Abdullah (PJS)'], ['2000-2008', 'H. Madumar'],
    ['2008-2014', 'H. Madumar'], ['2014-2015', 'Hamami El (PJS)'], ['2015-2021', "Sam'un"], ['2021-2029', 'A. Guruh Tajul Arasy']
  ],
  visi: 'Terwujudnya Desa Kebonratu yang Maju, Sejahtera, Adil, dan Agamis.',
  penjabaranVisi: [
    { istilah: 'Maju', isi: 'Pembangunan di segala sektor untuk meningkatkan pelayanan dasar dan perekonomian masyarakat, didukung pembenahan infrastruktur di seluruh wilayah Desa Kebonratu.' },
    { istilah: 'Sejahtera', isi: 'Terpenuhinya kebutuhan lahiriah dan batiniah masyarakat, meliputi pangan, sandang, papan, kesehatan, pendidikan, agama, dan budaya.' },
    { istilah: 'Adil', isi: 'Pembangunan dilakukan secara merata dengan memperhatikan aspek kewilayahan dan sosial ekonomi masyarakat untuk mewujudkan pembangunan berkelanjutan.' },
    { istilah: 'Agamis', isi: 'Implementasi norma agama dan nilai budaya sebagai landasan moral dan spiritual dalam kehidupan bermasyarakat.' }
  ],
  misi: [
    'Mewujudkan pembangunan desa di segala sektor untuk meningkatkan pelayanan dasar dan perekonomian masyarakat, didukung pembenahan infrastruktur di seluruh wilayah Desa Kebonratu.',
    'Memenuhi kebutuhan lahiriah dan batiniah masyarakat melalui peningkatan kesejahteraan, kesehatan, pendidikan, agama, dan budaya.',
    'Melaksanakan pembangunan secara merata dengan memperhatikan aspek kewilayahan serta sosial ekonomi masyarakat secara berkelanjutan.',
    'Mengimplementasikan norma agama dan nilai budaya sebagai landasan moral dan spiritual dalam kehidupan bermasyarakat.'
  ],
  batasWilayah: {
    utara: 'Desa Tirem',
    selatan: 'Desa Pulo',
    timur: 'Desa Bolang',
    barat: 'Desa Gosara'
  },
  dusunList: [
    'Kampung Singapadu',
    'Kampung Warakas',
    'Kampung Penyairan',
    'Kampung Kebonratu',
    'Kampung Kriyan',
    'Kampung Kebon Baru'
  ]
};

export const INITIAL_SAMBUTAN = {
  id: 'utama', nama: 'A. Guruh Tajul Arasy', jabatan: 'Kepala Desa Kebonratu', periode: 'Periode 2021-2029', foto: KADES_IMAGE,
  judul: 'Terwujudnya Desa Kebonratu yang Maju, Sejahtera, Adil, dan Agamis',
  salam: 'Sampurasun, Assalamu’alaikum Warahmatullahi Wabarakatuh.',
  isiPertama: 'Selamat datang di portal informasi dan layanan digital resmi Pemerintah Desa Kebonratu, Kecamatan Lebakwangi, Kabupaten Serang. Website ini kami hadirkan sebagai sarana transparansi publik, publikasi potensi desa, serta mempermudah seluruh masyarakat dalam mengurus administrasi kependudukan secara mandiri dan cepat.',
  isiKedua: 'Mari bersama-sama membangun Desa Kebonratu secara merata, memperkuat potensi pertanian, serta menjadikan norma agama dan nilai budaya sebagai landasan kehidupan bermasyarakat.',
  visi: 'Terwujudnya Desa Kebonratu yang Maju, Sejahtera, Adil, dan Agamis.'
};

export const INITIAL_BERITA: Berita[] = [
  {
    id: 'b1',
    judul: 'Musrenbangdes Tahun 2026: Pembahasan RKPDes Fokus Pada Pembangunan Infrastruktur dan UMKM',
    slug: 'musrenbangdes-2026-pembangunan-infrastruktur',
    ringkasan: 'Pemerintah Desa Kebonratu menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) bersama BPD, tokoh masyarakat, dan perwakilan perempuan.',
    konten: `Pemerintah Desa Kebonratu menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) penetapan RKPDes Tahun 2026 di Balai Desa Kebonratu pada Kamis (15/1/2026).

Acara ini dihadiri oleh Kepala Desa Kebonratu A. Guruh Tajul Arasy, Camat Lebakwangi, Ketua BPD, Babinsa, Bhabinkamtibmas, serta tokoh masyarakat dan kelompok perempuan PKK.

Dalam sambutannya, Kepala Desa menyampaikan bahwa fokus penganggaran Dana Desa 2026 diprioritaskan untuk pemerataan jalan usaha tani, penguatan ketahanan pangan lokal, pendampingan UMKM Emping Melinjo, serta digitalisasi pelayanan administrasi kependudukan.`,
    kategori: 'Pemerintahan',
    gambar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    penulis: 'Sekretariat Desa',
    tanggal: '15 Januari 2026',
    dibaca: 342,
    unggulan: true
  },
  {
    id: 'b2',
    judul: 'Panen Raya Padi Organik Dusun Karangtengah Hasil Tanam Musim Hujan 2025/2026',
    slug: 'panen-raya-padi-organik-dusun-karangtengah',
    ringkasan: 'Kelompok Tani Tani Makmur Kebonratu berhasil meningkatkan produktivitas panen padi organik hingga 7.8 ton per hektar.',
    konten: `Kelompok Tani "Tani Makmur" Dusun Karangtengah Desa Kebonratu merayakan panen raya padi varietas Ciherang Organik pada lahan seluas 25 hektar.

Ketua Kelompok Tani mengungkapkan, berkat bantuan perbaikan jaringan irigasi tersier dari APBDes Kebonratu dan penyuluhan Dinas Pertanian Kabupaten Serang, hasil panen meningkat dari sebelumnya 6.2 ton menjadi 7.8 ton per hektar.

Kepala Desa Kebonratu turut hadir memotong batang padi pertama dan menjanjikan bantuan mesin traktor tangan tambahan pada alokasi tahun 2026.`,
    kategori: 'Ekonomi',
    gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    penulis: 'Tim Ekonomi Desa',
    tanggal: '28 Januari 2026',
    dibaca: 289,
    unggulan: true
  },
  {
    id: 'b3',
    judul: 'Pelatihan Sertifikasi Halal dan Kemasan Digital Bagi Pengrajin Emping Melinjo Kebonratu',
    slug: 'pelatihan-sertifikasi-halal-umkm-emping',
    ringkasan: 'Sebanyak 35 pelaku UMKM olahan melinjo mengikuti workshop sertifikasi halal gratis bekerja sama dengan Halal Center Banten.',
    konten: `Pemerintah Desa Kebonratu memfasilitasi pendampingan sertifikasi Halal dan desain kemasan modern bagi 35 pengrajin Emping Melinjo di Dusun Babakan Jaya.

Melalui pelatihan ini, produk emping khas Kebonratu kini dikemas dalam aluminium foil tahan udara dengan barcode QR dan merek kolektif "Kebonratu Gold". Produk ini disiapkan untuk menembus supermarket modern di Serang, Cilegon, hingga Jabodetabek.`,
    kategori: 'Pembangunan',
    gambar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    penulis: 'Kaur Ekbang',
    tanggal: '10 Februari 2026',
    dibaca: 215
  },
  {
    id: 'b4',
    judul: 'Kegiatan Posyandu Integrasi Layanan Primer (ILP) Balita dan Lansia Dusun Kebonratu I',
    slug: 'posyandu-ilp-balita-lansia-kebonratu-i',
    ringkasan: 'Kader PKK dan Posyandu Desa Kebonratu secara rutin menggelar penimbangan balita, pemberian makanan tambahan (PMT), dan cek kesehatan gratis.',
    konten: `Kader Posyandu Mawar Dusun Kebonratu I melayani lebih dari 120 balita dan 45 lansia dalam program Integrasi Layanan Primer (ILP) bersama bidan desa dan tim Puskesmas Lebakwangi.

Program pencegahan stunting menjadi prioritas utama dengan penyaluran PMT bergizi seimbang berbahan baku telur ayam kampung dan olahan ikan lokal.`,
    kategori: 'Kemasyarakatan',
    gambar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    penulis: 'Kader PKK',
    tanggal: '18 Februari 2026',
    dibaca: 178
  }
];

export const INITIAL_AGENDA: Agenda[] = [
  {
    id: 'a1',
    judul: 'Gotong Royong Bersih Saluran Irigasi Sambut Musim Tanam II',
    tanggal: '2026-03-08',
    waktu: '07.00 - 11.00 WIB',
    lokasi: 'Saluran Irigasi Blok Karangtengah',
    penyelenggara: 'Pemerintah Desa & Gabungan Kelompok Tani',
    keterangan: 'Diimbau kepada seluruh warga dan petani membawa alat kerja bakti cangkul dan sabit.',
    status: 'Mendatang'
  },
  {
    id: 'a2',
    judul: 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap I 2026',
    tanggal: '2026-03-12',
    waktu: '08.30 - 14.00 WIB',
    lokasi: 'Balai Desa Kebonratu',
    penyelenggara: 'Kasi Kesejahteraan Desa Kebonratu',
    keterangan: 'Penerima KPM wajib membawa KTP asli, KK, dan Surat Undangan resmi.',
    status: 'Mendatang'
  },
  {
    id: 'a3',
    judul: 'Turnamen Sepakbola Karang Taruna Cup "Kebonratu Bersatu"',
    tanggal: '2026-03-20',
    waktu: '15.30 - 18.00 WIB',
    lokasi: 'Lapangan Sepakbola Kebonratu',
    penyelenggara: 'Karang Taruna Karya Kebonratu',
    keterangan: 'Diikuti oleh 8 tim antar-RT se-Desa Kebonratu mempererat silaturahmi pemuda.',
    status: 'Mendatang'
  }
];

export const INITIAL_PENGUMUMAN: Pengumuman[] = [
  {
    id: 'p1',
    judul: 'Jadwal Batas Akhir Pembayaran PBB-P2 Tahun 2026 dan Layanan Mobil Keliling Bapenda',
    isi: 'Diberitahukan kepada seluruh wajib pajak Desa Kebonratu bahwa Mobil Pelayanan Keliling Pembayaran PBB-P2 akan hadir di Kantor Desa pada Selasa, 10 Maret 2026. Manfaatkan kemudahan tanpa denda!',
    tanggal: '25 Februari 2026',
    prioritas: 'Penting'
  },
  {
    id: 'p2',
    judul: 'Pendaftaran Program Bantuan Sertifikat Tanah Gratis (PTSL) Tahap II Desa Kebonratu',
    isi: 'Pemerintah Desa Kebonratu membuka pendaftaran kelengkapan berkas PTSL bagi warga pemilik tanah yang belum bersertifikat. Persyaratan: Fotokopi KTP, KK, SPPT PBB, dan surat alas hak tanah.',
    tanggal: '20 Februari 2026',
    prioritas: 'Mendesak'
  },
  {
    id: 'p3',
    judul: 'Himbauan Kewaspadaan Cuaca Ekstrem dan Kebersihan Lingkungan RT/RW',
    isi: 'Berdasarkan rilis BMKG Serang, diimbau kepada para Ketua RT/RW untuk menggiatkan siskamling dan pembersihan saluran air guna mengantisipasi genangan air.',
    tanggal: '12 Februari 2026',
    prioritas: 'Normal'
  }
];

// Struktur organisasi diisi oleh admin melalui dashboard.
export const INITIAL_PERANGKAT: PerangkatDesa[] = [
  { id: 'pd1', nama: 'A. Guruh Tajul Arasy', jabatan: 'Kepala Desa', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd2', nama: 'Nasrullah', jabatan: 'Sekretaris Desa', nipd: '3510 19981226 01', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd3', nama: 'Mohamad Idris', jabatan: 'Kepala Urusan Tata Usaha dan Umum', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd4', nama: 'Rudi Hartono', jabatan: 'Kepala Urusan Keuangan', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd5', nama: 'Elis Novianti', jabatan: 'Kepala Urusan Perencanaan', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd6', nama: 'Amaryadi', jabatan: 'Kepala Seksi Pemerintahan', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd7', nama: 'Madamin', jabatan: 'Kepala Seksi Kesejahteraan', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' },
  { id: 'pd8', nama: 'Samani', jabatan: 'Kepala Seksi Pelayanan', nipd: '', pendidikan: '-', foto: KADES_IMAGE, telepon: '', kategori: 'Pemerintah Desa' }
];

export const INITIAL_GALERI: GaleriItem[] = [
  {
    id: 'g1',
    judul: 'Suasana Sawah Hijau dan Alam Asri Kebonratu',
    tipe: 'foto',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    kategori: 'Keindahan Alam',
    album: 'Pesona Alam Kebonratu',
    tanggal: '10 Januari 2026',
    deskripsi: 'Hamparan sawah terbentang di Dusun Karangtengah Kebonratu Serang.'
  },
  {
    id: 'g2',
    judul: 'Kantor Balai Desa Kebonratu Tampak Depan',
    tipe: 'foto',
    url: KANTOR_IMAGE,
    kategori: 'Kegiatan Desa',
    album: 'Infrastruktur Publik',
    tanggal: '05 Januari 2026',
    deskripsi: 'Gedung pelayanan warga dan ruang sekretariat desa.'
  },
  {
    id: 'g3',
    judul: 'Proses Pembuatan Emping Melinjo Super Kebonratu',
    tipe: 'foto',
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    kategori: 'Budaya & Tradisi',
    album: 'Sentra UMKM Melinjo',
    tanggal: '12 Februari 2026',
    deskripsi: 'Pengrajin melinjo menumbuk secara tradisional menghasilkan emping renyah khas Serang.'
  },
  {
    id: 'g4',
    judul: 'Pembangunan Jalan Rabat Beton Dusun Cilaku',
    tipe: 'foto',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    kategori: 'Pembangunan',
    album: 'Realisasi Pembangunan APBDes',
    tanggal: '20 Januari 2026',
    deskripsi: 'Hasil kerja bakti dan rabat beton jalan lingkungan.'
  },
  {
    id: 'g5',
    judul: 'Pentas Seni Budaya Pencak Silat Khas Banten',
    tipe: 'foto',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    kategori: 'Budaya & Tradisi',
    album: 'Festival Seni Kebonratu',
    tanggal: '17 Agustus 2025',
    deskripsi: 'Penampilan pesilat muda Karang Taruna Kebonratu.'
  },
  {
    id: 'g6',
    judul: 'Profil Video Singkat Desa Kebonratu 2026',
    tipe: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed
    kategori: 'Kegiatan Desa',
    album: 'Video Profil',
    tanggal: '01 Februari 2026',
    deskripsi: 'Video dokumenter perkembangan dan keindahan Desa Kebonratu.'
  }
];

export const INITIAL_POTENSI: PotensiItem[] = [
  {
    id: 'pot1',
    nama: 'Emping Melinjo "Kebonratu Gold"',
    kategori: 'UMKM',
    deskripsi: 'Emping melinjo asli tanpa campuran bahan pengawet, diproduksi secara tradisional oleh warga Babakan Jaya. Tersedia rasa original gurih dan manis pedas.',
    gambar: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    lokasi: 'Dusun Babakan Jaya, RT 02/03',
    pemilik: 'Ibu Hj. Aminah',
    kontakWA: '081289001234',
    hargaRange: 'Rp 45.000 - Rp 75.000 / kg'
  },
  {
    id: 'pot2',
    nama: 'Bebek Bakar & Telur Asin khas Kebonratu',
    kategori: 'UMKM',
    deskripsi: 'Olahan daging bebek empuk dengan bumbu rempah khas Serang dan produksi telur asin masir bernutrisi tinggi dari peternakan lokal.',
    gambar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    lokasi: 'Dusun Kebonratu I, RT 04/01',
    pemilik: 'H. Mastur',
    kontakWA: '081398765432',
    hargaRange: 'Rp 25.000 - Rp 35.000 / porsi'
  },
  {
    id: 'pot3',
    nama: 'Lumbung Padi Ciherang & Irigasi Desa',
    kategori: 'Pertanian',
    deskripsi: 'Kawasan persawahan produktif seluas 180 hektar yang memasok kebutuhan beras berkualitas tinggi untuk wilayah Serang Utara dan sekitarnya.',
    gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    lokasi: 'Dusun Karangtengah & Cilaku',
    pemilik: 'Gabungan Kelompok Tani (Gapoktan) Kebonratu',
    hargaRange: 'Hasil Panen > 1.200 Ton / Tahun'
  },
  {
    id: 'pot4',
    nama: 'Wisata Edukasi Sawah & Saung Kuliner Desa',
    kategori: 'Wisata',
    deskripsi: 'Destinasi wisata keluarga dengan saung bambu di tengah hamparan sawah, jalur sepeda santai, tempat pemancingan ikan, dan spot foto instagramable.',
    gambar: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    lokasi: 'Dusun Kebonratu II (Cilaku)',
    pemilik: 'BUMDes Kebonratu Sejahtera',
    kontakWA: '081289001234',
    hargaRange: 'Tiket Masuk: Gratis / Parkir Rp 5.000'
  },
  {
    id: 'pot5',
    nama: 'Peternakan Kambing PE & Bebek Petelur',
    kategori: 'Peternakan',
    deskripsi: 'Budi daya peternakan kambing peranakan etawa dan bebek petelur skala menengah yang dikelola secara modern dan ramah lingkungan.',
    gambar: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    lokasi: 'Dusun Karangtengah',
    pemilik: 'Koperasi Ternak Mandiri',
    kontakWA: '087812349988',
    hargaRange: 'Suplai Susu & Telur Harian'
  }
];

export const INITIAL_UMKM = [
  {
    id: 'umkm-1',
    namaUsaha: 'Susu Kedelai Wong Kebon Asyik',
    namaProduk: 'Susu Kedelai Wong Kebon Asyik',
    foto: 'https://images.unsplash.com/photo-1598511722098-4d049b7f5f2f?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Susu kedelai murni tanpa bahan pengawet, diproduksi secara higienis dan sehat.',
    keunggulan: ['100% kedelai murni', 'Tanpa bahan pengawet', 'Baik untuk kesehatan', 'Dikemas higienis'],
    lokasi: 'Dusun Babakan Jaya, Desa Kebonratu',
    kontakWA: '6281289001234',
    kemasan: ['Botol 250 ml', 'Botol 500 ml', '1 Liter']
  },
  {
    id: 'umkm-2',
    namaUsaha: 'Telur Asin Mulki',
    namaProduk: 'Telur Asin Mulki',
    foto: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Telur asin berkualitas dengan tekstur lembut dan rasa gurih, diproduksi dari peternakan lokal.',
    keunggulan: ['Rasa gurih khas', 'Dibuat secara higienis', 'Bahan baku lokal berkualitas'],
    lokasi: 'Dusun Kebonratu I, Desa Kebonratu',
    kontakWA: '6281398765432',
    kemasan: ['Paket 6 butir', 'Paket 12 butir']
  }
];

export const INITIAL_BUMDES: { id: string; nama: string; jenisUsaha: string; deskripsi: string; alamat?: string; kontak?: string; pemilik?: string; gambar?: string }[] = [
  {
    id: 'bum-1',
    nama: 'BUMDes Kebonratu Sejahtera',
    jenisUsaha: 'Pengelolaan Wisata & UMKM',
    deskripsi: 'Mengelola destinasi wisata edukasi, saung kuliner, serta pendampingan UMKM lokal (emping melinjo).',
    alamat: 'Dusun Kebonratu II',
    kontak: '081289001234',
    pemilik: 'Pengurus BUMDes Kebonratu',
    gambar: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_SURAT: SuratRequest[] = [
  {
    id: 'KR-2026-8942',
    nik: '3604121508880001',
    namaLengkap: 'Budi Santoso',
    noHp: '081234567890',
    rt: '02',
    rw: '01',
    dusun: 'Dusun Kebonratu I',
    jenisSurat: 'Surat Keterangan Domisili',
    keperluan: 'Kelengkapan administrasi lamaran pekerjaan di Cilegon',
    tanggalPengajuan: '2026-02-25',
    status: 'Selesai',
    catatanPetugas: 'Surat telah ditandatangani secara digital oleh Kepala Desa.',
    tanggalSelesai: '2026-02-26'
  },
  {
    id: 'KR-2026-9104',
    nik: '3604122003920004',
    namaLengkap: 'Siti Rahmawati',
    noHp: '085712345678',
    rt: '01',
    rw: '03',
    dusun: 'Dusun Babakan Jaya',
    jenisSurat: 'Surat Keterangan Usaha (SKU)',
    keperluan: 'Pengajuan kredit KUR modal usaha Emping Melinjo di Bank BRI',
    tanggalPengajuan: '2026-02-28',
    status: 'Diproses',
    catatanPetugas: 'Dokumen sedang dalam pemeriksaan Kasi Pemerintahan.'
  }
];

export const INITIAL_PENDUDUK: PendudukItem[] = [
  {
    id: 'pend1',
    nik: '3604121508880001',
    nama: 'Budi Santoso',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Serang',
    tanggalLahir: '1988-08-15',
    dusun: 'Dusun Kebonratu I',
    rt: '02',
    rw: '01',
    agama: 'Islam',
    pendidikan: 'SMA / Sederajat',
    pekerjaan: 'Wiraswasta',
    statusPernikahan: 'Menikah',
    bantuanSosial: ['BLT Dana Desa']
  },
  {
    id: 'pend2',
    nik: '3604122003920004',
    nama: 'Siti Rahmawati',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Serang',
    tanggalLahir: '1992-03-20',
    dusun: 'Dusun Babakan Jaya',
    rt: '01',
    rw: '03',
    agama: 'Islam',
    pendidikan: 'D3 / Diploma',
    pekerjaan: 'Pedagang / UMKM',
    statusPernikahan: 'Menikah',
    bantuanSosial: ['BPNT']
  },
  {
    id: 'pend3',
    nik: '3604120101750002',
    nama: 'H. Suparman',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Serang',
    tanggalLahir: '1975-01-01',
    dusun: 'Dusun Karangtengah',
    rt: '03',
    rw: '02',
    agama: 'Islam',
    pendidikan: 'S1 / Sarjana',
    pekerjaan: 'Petani / Pekebun',
    statusPernikahan: 'Menikah',
    bantuanSosial: []
  },
  {
    id: 'pend4',
    nik: '3604121010010005',
    nama: 'Ahmad Faisal',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Serang',
    tanggalLahir: '2001-10-10',
    dusun: 'Dusun Kebonratu II',
    rt: '01',
    rw: '04',
    agama: 'Islam',
    pendidikan: 'SMA / Sederajat',
    pekerjaan: 'Karyawan Swasta',
    statusPernikahan: 'Belum Menikah',
    bantuanSosial: []
  },
  {
    id: 'pend5',
    nik: '3604120505680003',
    nama: 'Hj. Maryam',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Serang',
    tanggalLahir: '1968-05-05',
    dusun: 'Dusun Kebonratu I',
    rt: '01',
    rw: '01',
    agama: 'Islam',
    pendidikan: 'SMP / Sederajat',
    pekerjaan: 'Ibu Rumah Tangga',
    statusPernikahan: 'Cerai Mati',
    bantuanSosial: ['PKH', 'BLT Dana Desa']
  }
];

export const INITIAL_APBDES: APBDesItem[] = [
  // Pendapatan 2026
  { id: 'apb1', tahun: 2026, kategori: 'Pendapatan', subKategori: 'Dana Desa (APBN)', anggaran: 980000000, realisasi: 490000000 },
  { id: 'apb2', tahun: 2026, kategori: 'Pendapatan', subKategori: 'Alokasi Dana Desa (ADD Serang)', anggaran: 520000000, realisasi: 260000000 },
  { id: 'apb3', tahun: 2026, kategori: 'Pendapatan', subKategori: 'Bagi Hasil Pajak & Retribusi', anggaran: 65000000, realisasi: 32500000 },
  { id: 'apb4', tahun: 2026, kategori: 'Pendapatan', subKategori: 'Pendapatan Asli Desa (PADes)', anggaran: 45000000, realisasi: 28000000 },
  { id: 'apb5', tahun: 2026, kategori: 'Pendapatan', subKategori: 'Bantuan Keuangan Provinsi Banten', anggaran: 100000000, realisasi: 100000000 },

  // Belanja 2026
  { id: 'apb6', tahun: 2026, kategori: 'Belanja', subKategori: 'Penyelenggaraan Pemerintahan Desa', anggaran: 540000000, realisasi: 270000000 },
  { id: 'apb7', tahun: 2026, kategori: 'Belanja', subKategori: 'Pelaksanaan Pembangunan Desa', anggaran: 710000000, realisasi: 380000000 },
  { id: 'apb8', tahun: 2026, kategori: 'Belanja', subKategori: 'Pembinaan Kemasyarakatan', anggaran: 180000000, realisasi: 95000000 },
  { id: 'apb9', tahun: 2026, kategori: 'Belanja', subKategori: 'Pemberdayaan Masyarakat (UMKM/Tani)', anggaran: 220000000, realisasi: 110000000 },
  { id: 'apb10', tahun: 2026, kategori: 'Belanja', subKategori: 'Penanggulangan Bencana & Darurat', anggaran: 60000000, realisasi: 15000000 }
];

// Ringkasan matriks program pada Dokumen Perubahan RPJM Desa Kebonratu 2022-2029.
// Nilai berikut adalah prakiraan biaya program dalam dokumen, bukan laporan kas atau LPJ APBDes.
export const PROGRAM_RPJM_TERLAKSANA = [
  { program: 'Penyelenggaraan Posyandu', bidang: 'Kesehatan', biaya: 720000000, status: 'Terlaksananya penyelenggaraan Posyandu' },
  { program: 'Penyuluhan dan pelatihan bidang kesehatan', bidang: 'Kesehatan', biaya: 40000000, status: 'Terlaksananya penyuluhan dan pelatihan kesehatan' },
  { program: 'Pemeliharaan jalan desa', bidang: 'Pekerjaan umum', biaya: 50000000, status: 'Terlaksananya pemeliharaan jalan desa' },
  { program: 'Pemeliharaan jalan lingkungan / gang', bidang: 'Pekerjaan umum', biaya: 800000000, status: 'Terlaksananya pemeliharaan jalan lingkungan' },
  { program: 'Pembangunan / rehabilitasi jalan desa', bidang: 'Pekerjaan umum', biaya: 1500000000, status: 'Terlaksananya pembangunan dan rehabilitasi jalan desa' },
  { program: 'Peningkatan / pengerasan jalan lingkungan', bidang: 'Pekerjaan umum', biaya: 1000000000, status: 'Terlaksananya peningkatan jalan lingkungan' },
  { program: 'Rehabilitasi prasarana jalan dan drainase', bidang: 'Pekerjaan umum', biaya: 1000000000, status: 'Terlaksananya rehabilitasi prasarana jalan desa' },
  { program: 'Pemeliharaan sanitasi lingkungan', bidang: 'Pekerjaan umum', biaya: 160000000, status: 'Terlaksananya pemeliharaan sanitasi' },
  { program: 'Pembangunan / peningkatan saluran irigasi', bidang: 'Pertanian', biaya: 500000000, status: 'Terlaksananya pembangunan saluran irigasi' },
  { program: 'Penyelenggaraan festival kesenian dan keagamaan', bidang: 'Kemasyarakatan', biaya: 80000000, status: 'Terlaksananya festival kesenian dan keagamaan' },
  { program: 'Pembentukan BUM Desa', bidang: 'Pemberdayaan ekonomi', biaya: 200000000, status: 'Terlaksananya pembentukan BUM Desa' },
  { program: 'Pengadaan teknologi tepat guna untuk pengembangan pertanian', bidang: 'Pemberdayaan ekonomi', biaya: 25000000, status: 'Terlaksananya pengadaan teknologi tepat guna' }
];

export const DEMO_STATS = {
  gender: [
    { name: 'Laki-laki', value: 2148, color: '#16a34a' },
    { name: 'Perempuan', value: 2384, color: '#0284c7' }
  ],
  pendidikan: [
    { name: 'SD / MI', value: 754 },
    { name: 'SLTP / MTs', value: 795 },
    { name: 'SLTA / MA', value: 556 },
    { name: 'S1 / Diploma', value: 116 },
    { name: 'Putus Sekolah', value: 376 },
    { name: 'Buta Huruf', value: 32 }
  ],
  pekerjaan: [
    { name: 'Petani', value: 547 },
    { name: 'Pedagang', value: 218 },
    { name: 'PNS', value: 54 },
    { name: 'Tukang', value: 56 }
  ],
  agama: [
    { name: 'Islam', value: 4532 }
  ],
  saranaPendidikan: [
    { name: 'TK / PAUD', value: 4 },
    { name: 'SD / MI', value: 1 },
    { name: 'SLTA / MA', value: 1 }
  ],
  tempatIbadah: [
    { name: 'Masjid', value: 4 },
    { name: 'Mushola', value: 10 }
  ]
};
