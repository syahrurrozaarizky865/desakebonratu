import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GaleriItem } from '../../types';
import { Camera, Video, Folder, X, Play } from 'lucide-react';

export const GaleriView: React.FC = () => {
  const { galeriList } = useApp();
  const [filterType, setFilterType] = useState<'semua' | 'foto' | 'video'>('semua');
  const [activeModalItem, setActiveModalItem] = useState<GaleriItem | null>(null);

  const filtered = galeriList.filter((g) => {
    if (filterType === 'semua') return true;
    return g.tipe === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Dokumentasi Desa
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Galeri Foto & Video Desa Kebonratu
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kumpulan foto kegiatan sosial, pembangunan infrastruktur, dan lanskap alam Banten
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'semua', label: 'Semua Media', icon: Folder },
          { id: 'foto', label: 'Galeri Foto', icon: Camera },
          { id: 'video', label: 'Galeri Video', icon: Video }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = filterType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              {item.tipe === 'video' && !item.url.includes('youtube.com/embed') ? (
                <video src={item.url} className="w-full h-full object-cover" muted preload="metadata" />
              ) : (
                <img src={item.url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

              <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                {item.kategori}
              </span>

              {item.tipe === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 space-y-1">
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                Album: {item.album} • {item.tanggal}
              </p>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                {item.judul}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.deskripsi}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-2 bg-black flex justify-center items-center min-h-[300px]">
              {activeModalItem.tipe === 'video' && activeModalItem.url.includes('youtube.com/embed') ? (
                <iframe
                  title={activeModalItem.judul}
                  src={activeModalItem.url}
                  className="w-full aspect-video rounded-xl"
                  allowFullScreen
                />
              ) : activeModalItem.tipe === 'video' ? (
                <video src={activeModalItem.url} controls className="max-h-[70vh] w-full rounded-xl" preload="metadata" />
              ) : (
                <img
                  src={activeModalItem.url}
                  alt={activeModalItem.judul}
                  className="max-h-[70vh] w-auto object-contain rounded-xl"
                />
              )}
            </div>

            <div className="p-6 space-y-2 text-slate-800 dark:text-slate-100">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {activeModalItem.kategori} • Album {activeModalItem.album}
              </span>
              <h3 className="text-xl font-bold">{activeModalItem.judul}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{activeModalItem.deskripsi}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
