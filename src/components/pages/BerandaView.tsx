import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  HERO_IMAGE,
  KANTOR_IMAGE,
  KANTOR_DESA_MAP_EMBED_URL,
  KANTOR_DESA_MAP_URL,
  PROFIL_DESA_DATA
} from '../../data/initialData';
import {
  Users,
  MapPin,
  Building2,
  Maximize2,
  Calendar,
  Megaphone,
  ArrowRight,
  FileText,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Berita } from '../../types';

export const BerandaView: React.FC = () => {
  const {
    setActivePage,
    beritaList,
    agendaList,
    pengumumanList,
    potensiList,
    galeriList,
    setSelectedBerita,
    sambutan,
    heroSettings
  } = useApp();

  const safeHero = heroSettings ?? {
    badge: 'PEMERINTAH DESA KEBONRATU',
    title: 'Kabar dan layanan warga Desa Kebonratu',
    subtitle: 'Informasi kegiatan, pengumuman, serta layanan administrasi desa.',
    image: HERO_IMAGE,
    buttonText: 'Berita terbaru'
  };
  // Old deployments stored a development-only `/src/...` asset path in the
  // browser. Ignore it so returning visitors receive the bundled production
  // image after deployment.
  const heroImage = safeHero.image?.startsWith('/src/') ? HERO_IMAGE : (safeHero.image || HERO_IMAGE);

  const handleOpenBerita = (berita: Berita) => {
    setSelectedBerita(berita);
    setActivePage('berita');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Informasi utama */}
      <section className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white sm:min-h-[660px]">
        <img src={heroImage} alt="Pemandangan Desa Kebonratu" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/50" />

        <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-end px-5 pb-12 sm:min-h-[660px] sm:px-8 sm:pb-16 lg:grid-cols-12">
          <div className="border-l-2 border-emerald-300 pl-5 lg:col-span-7 lg:pr-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">{safeHero.badge}</p>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-xl">
            {safeHero.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-100 max-w-xl font-normal leading-relaxed">
            {safeHero.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('berita')}
              className="px-4 py-2.5 rounded-md bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>{safeHero.buttonText}</span>
            </button>
          </div></div>
          <div className="hidden lg:col-span-5">
            <img src={KANTOR_IMAGE} alt="Kantor Desa Kebonratu" className="aspect-[16/10] w-full rounded-lg object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-800" />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Kantor Desa Kebonratu, Kecamatan Lebakwangi, Kabupaten Serang.</p>
          </div>
        </div>

        {/* Bottom Floating Stats Pill (as seen in screenshot reference) */}
        <div className="hidden">
          <div className="bg-emerald-500/90 dark:bg-emerald-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm">
              KR
            </div>
            <div>
              <p className="font-bold text-xs">Kunjungan Hari Ini</p>
              <p className="text-[11px] text-emerald-100">148 Warga & Pengunjung</p>
            </div>
          </div>
        </div>

        {/* Bottom Floating Pengaduan Pill (as seen in screenshot reference) */}
        <div className="hidden">
          <button
            onClick={() => setActivePage('kontak')}
            className="bg-rose-500/90 hover:bg-rose-600 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl shadow-xl border border-rose-400/40 flex items-center gap-2 text-xs font-bold transition-all"
          >
            <span>💬 Layanan Pengaduan Warga</span>
          </button>
        </div>
      </section>

      {pengumumanList.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6" aria-label="Pengumuman Desa">
          <div className="overflow-hidden rounded-2xl border border-amber-300 bg-amber-50 shadow-md dark:border-amber-800 dark:bg-amber-950/40">
            <div className="flex items-stretch">
              <div className="flex shrink-0 items-center gap-2 bg-amber-500 px-4 py-3 text-xs font-black uppercase tracking-wide text-white sm:px-5">
                <Megaphone className="h-4 w-4" />
                <span>Pengumuman</span>
              </div>
              <div className="min-w-0 flex-1 overflow-hidden px-4 py-3">
                <div className="flex w-max min-w-full animate-announcement items-center gap-10">
                  {[...pengumumanList, ...pengumumanList].map((p, index) => (
                    <div key={`${p.id}-${index}`} className="flex shrink-0 items-center gap-3 text-xs">
                      <span className="rounded-md bg-amber-200 px-2 py-1 font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-100">{p.prioritas}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{p.judul}</span>
                      <span className="max-w-[260px] truncate text-slate-500 dark:text-slate-300">{p.isi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. SAMBUTAN KEPALA DESA & VISI MISI */}
      {sambutan.nama && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-100 dark:border-slate-800 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Foto Kades */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-100 dark:border-emerald-900/40 aspect-[4/5]">
                <img
                  src={sambutan.foto}
                  alt={sambutan.nama}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{sambutan.nama}</h3>
                  <p className="text-xs text-emerald-300 font-medium">{sambutan.jabatan} ({sambutan.periode})</p>
                </div>
              </div>
            </div>

            {/* Teks Sambutan */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Sambutan Kepala Desa</p>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                "{sambutan.judul}"
              </h2>

              <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
                <p>
                  <em>{sambutan.salam}</em>
                </p>
                <p>
                  {sambutan.isiPertama}
                </p>
                <p>
                  {sambutan.isiKedua}
                </p>
              </div>

              {/* Visi Ringkas */}
              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1">
                <p className="font-extrabold text-emerald-900 dark:text-emerald-300">
                  VISI DESA KEBONRATU:
                </p>
                <p className="text-slate-700 dark:text-slate-200 italic font-medium">
                  "{sambutan.visi}"
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActivePage('profil')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  <span>Baca Selengkapnya Profil & Struktur Organisasi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* PETA DESA KEBONRATU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Lokasi</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">Peta Kantor Desa Kebonratu</h2>
            </div>
            <a
              href={KANTOR_DESA_MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            >
              <MapPin className="h-4 w-4" />
              Buka di Google Maps
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700">
              <iframe
                title="Peta Kantor Desa Kebonratu"
                src={KANTOR_DESA_MAP_EMBED_URL}
                className="h-[420px] w-full border-0 sm:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Alamat Kantor</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{PROFIL_DESA_DATA.alamat}</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {PROFIL_DESA_DATA.kecamatan}, {PROFIL_DESA_DATA.kabupaten}, {PROFIL_DESA_DATA.provinsi}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Jam Layanan</p>
                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Senin - Jumat</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">07.30 - 16.00 WIB</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Kontak</p>
                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{PROFIL_DESA_DATA.telepon}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">{PROFIL_DESA_DATA.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTIK SINGKAT WILAYAH & PENDUDUK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Desa Kebonratu Dalam Angka
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gambaran singkat mengenai kependudukan dan demografi wilayah Desa Kebonratu tahun 2026
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center group hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {PROFIL_DESA_DATA.jumlahPenduduk.toLocaleString('id-ID')}
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Jumlah Penduduk (Jiwa)</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center group hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {PROFIL_DESA_DATA.jumlahDusun} Dusun
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Wilayah Dusun & Kampung</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center group hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {PROFIL_DESA_DATA.jumlahRT} RT / {PROFIL_DESA_DATA.jumlahRW} RW
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Rukun Tetangga & Warga</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center group hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Maximize2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {PROFIL_DESA_DATA.luasWilayah} Km²
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Luas Wilayah Desa</p>
          </div>
        </div>
      </section>

      {/* 4. BERITA TERBARU & AGENDA & PENGUMUMAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Berita Utama (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Berita & Kabar Desa Terbaru
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Informasi kegiatan, pembangunan, dan berita resmi warga
                </p>
              </div>
              <button
                onClick={() => setActivePage('berita')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {beritaList.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenBerita(item)}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                      {item.kategori}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-500" /> {item.tanggal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-400" /> {item.dibaca}x dibaca
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {item.judul}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                        {item.ringkasan}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-600">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda & Pengumuman (Col 4 Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box Agenda Kegiatan */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Agenda Desa
                </h3>
              </div>

              <div className="space-y-3">
                {agendaList.map((a) => (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      📅 {a.tanggal} • {a.waktu}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{a.judul}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      📍 {a.lokasi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POTENSI & UMKM HIGHLIGHT */}
      <section className="bg-gradient-to-b from-emerald-900 to-teal-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                Produk Unggulan & Ekonomi Desa
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Potensi Lokal & Sentra UMKM Kebonratu
              </h2>
            </div>
            <button
              onClick={() => setActivePage('potensi')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg"
            >
              <span>Lihat Semua Produk & Wisata</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {potensiList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 rounded-2xl overflow-hidden border border-emerald-800/60 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item.kategori}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white">{item.nama}</h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {item.deskripsi}
                    </p>
                    <p className="text-xs text-emerald-400 font-semibold pt-1">
                      📍 {item.lokasi}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setActivePage('potensi')}
                    className="w-full py-2 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Detail & Kontak Pemilik
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALERI PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Galeri Foto & Video Desa
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dokumentasi keindahan alam, kegiatan masyarakat, dan hasil pembangunan
            </p>
          </div>
          <button
            onClick={() => setActivePage('galeri')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Lihat Galeri Lengkap <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeriList.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePage('galeri')}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-md"
            >
              <img
                src={item.url}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  {item.kategori}
                </span>
                <h4 className="text-xs font-bold line-clamp-1">{item.judul}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
