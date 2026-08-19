import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Berita } from '../../types';
import {
  Search,
  Calendar,
  Eye,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const BeritaView: React.FC = () => {
  const {
    beritaList,
    searchQuery,
    setSearchQuery,
    selectedBerita,
    setSelectedBerita,
    addToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const categories = ['Semua', 'Pemerintahan', 'Pembangunan', 'Kemasyarakatan', 'Ekonomi', 'Pengumuman'];

  // Filter berita
  const filtered = beritaList.filter((b) => {
    const matchCategory = selectedCategory === 'Semua' || b.kategori === selectedCategory;
    const matchQuery =
      searchQuery.trim() === '' ||
      b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.konten.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Tautan berita berhasil disalin ke papan klip');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. DETAIL BERITA MODAL / FULLVIEW */}
      {selectedBerita ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl mx-auto space-y-6 animate-fade-in">
          <button
            onClick={() => setSelectedBerita(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </button>

          <div className="space-y-3">
            <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full inline-block">
              {selectedBerita.kategori}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {selectedBerita.judul}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-y border-slate-100 dark:border-slate-800 py-3">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-600" /> {selectedBerita.penulis}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {selectedBerita.tanggal}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" /> {selectedBerita.dibaca}x dibaca
              </span>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  title="Bagikan Tautan"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
            <img
              src={selectedBerita.gambar}
              alt={selectedBerita.judul}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 text-slate-700 dark:text-slate-200 whitespace-pre-line font-medium">
            {selectedBerita.konten}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">Pemerintah Desa Kebonratu © 2026</span>
            <button
              onClick={() => setSelectedBerita(null)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
            >
              Tutup Berita
            </button>
          </div>
        </div>
      ) : (
        /* 2. LISTING BERITA */
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Kabar Terbaru
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Berita & Pengumuman Desa Kebonratu
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dapatkan berita kegiatan pemerintahan, pembangunan, dan aktivitas sosial warga Desa Kebonratu
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari kata kunci berita desa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white"
                />
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <X className="w-4 h-4" /> Reset
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex overflow-x-auto gap-2 pt-1 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Berita Grid */}
          {paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedBerita(item)}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        {item.kategori}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-500" /> {item.tanggal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-400" /> {item.dibaca}x
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {item.judul}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {item.ringkasan}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-2 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <p className="font-bold text-base">Tidak ada berita yang ditemukan</p>
              <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau kategori filter Anda.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-emerald-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-emerald-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
