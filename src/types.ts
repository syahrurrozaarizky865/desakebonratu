export type Role = 'guest' | 'operator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export type PageId = 
  | 'beranda'
  | 'profil'
  | 'bumdesa-umkm'
  | 'pemerintahan'
  | 'data-desa'
  | 'berita'
  | 'galeri'
  | 'potensi'
  | 'transparansi'
  | 'kontak'
  | 'admin';

export interface Berita {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  kategori: 'Pemerintahan' | 'Pembangunan' | 'Kemasyarakatan' | 'Ekonomi' | 'Pengumuman';
  gambar: string;
  penulis: string;
  tanggal: string;
  dibaca: number;
  unggulan?: boolean;
}

export interface Agenda {
  id: string;
  judul: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  penyelenggara: string;
  keterangan: string;
  status: 'Mendatang' | 'Berlangsung' | 'Selesai';
}

export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  prioritas: 'Normal' | 'Penting' | 'Mendesak';
  fileUrl?: string;
}

export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  nipd?: string;
  pendidikan: string;
  foto: string;
  telepon: string;
  kategori: 'Pemerintah Desa' | 'BPD' | 'LPM' | 'Karang Taruna' | 'PKK';
}

export interface SambutanKepalaDesa {
  id: string;
  nama: string;
  jabatan: string;
  periode: string;
  foto: string;
  judul: string;
  salam: string;
  isiPertama: string;
  isiKedua: string;
  visi: string;
}

export interface HeroSlideConfig {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  tipe: 'foto' | 'video';
  url: string;
  kategori: 'Kegiatan Desa' | 'Pembangunan' | 'Budaya & Tradisi' | 'Keindahan Alam';
  album: string;
  tanggal: string;
  deskripsi: string;
}

export interface PotensiItem {
  id: string;
  nama: string;
  kategori: 'Pertanian' | 'UMKM' | 'Wisata' | 'Peternakan';
  deskripsi: string;
  gambar: string;
  lokasi: string;
  pemilik?: string;
  kontakWA?: string;
  hargaRange?: string;
}

export interface BumdesItem {
  id: string;
  nama: string;
  jenis_usaha: string;
  deskripsi: string;
  alamat: string;
  kontak: string;
  pemilik: string;
  gambar: string;
  latitude?: string | null;
  longitude?: string | null;
}

export interface SuratRequest {
  id: string; // Tracking Code e.g. KR-2026-8942
  nik: string;
  namaLengkap: string;
  noHp: string;
  rt: string;
  rw: string;
  dusun: string;
  jenisSurat: string;
  keperluan: string;
  tanggalPengajuan: string;
  status: 'Menunggu Verifikasi' | 'Diproses' | 'Disetujui' | 'Ditolak' | 'Selesai';
  dokumenSyarat?: string;
  catatanPetugas?: string;
  tanggalSelesai?: string;
}

export interface PendudukItem {
  id: string;
  nik: string;
  nama: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  dusun: string;
  rt: string;
  rw: string;
  agama: string;
  pendidikan: string;
  pekerjaan: string;
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Cerai Hidup' | 'Cerai Mati';
  bantuanSosial?: string[];
}

export interface APBDesItem {
  id: string;
  tahun: number;
  kategori: 'Pendapatan' | 'Belanja' | 'Pembiayaan';
  subKategori: string;
  anggaran: number;
  realisasi: number;
}

export interface RPJMItem {
  id: string;
  program: string;
  bidang: string;
  biaya: number;
  status: string;
}

export interface RKPDesItem {
  id: string;
  tahun: number;
  kegiatan: string;
  bidang: string;
  anggaran: number;
  status: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
