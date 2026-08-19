import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PotensiItem } from '../../types';
import { ShoppingBag, MapPin, MessageCircle, Wheat, Compass, ShieldCheck } from 'lucide-react';

export const PotensiView: React.FC = () => {
  const { potensiList } = useApp();
  const [activeCategory, setActiveCategory] = useState<PotensiItem['kategori'] | 'Semua'>('Semua');

  const filtered =
    activeCategory === 'Semua'
      ? potensiList
      : potensiList.filter((p) => p.kategori === activeCategory);

  const categories: Array<{ id: PotensiItem['kategori'] | 'Semua'; label: string }> = [
    { id: 'Semua', label: 'Semua Potensi' },
    { id: 'UMKM', label: 'UMKM & Kerajinan' },
    { id: 'Pertanian', label: 'Pertanian & Sawah' },
    { id: 'Wisata', label: 'Wisata & Kuliner' },
    { id: 'Peternakan', label: 'Peternakan' }
  ];

  const handleOpenWA = (waNumber?: string, productTitle?: string) => {
    const num = waNumber || '081289001234';
    const msg = `Halo, saya tertarik dengan produk/potensi ${productTitle} di Desa Kebonratu. Boleh minta informasi lebih lanjut?`;
    window.open(`https://wa.me/62${num.substring(1)}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-3">
        <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Pemberdayaan Ekonomi Lokal
        </span>
        <h1 className="text-3xl font-black">Potensi & Produk Unggulan Desa</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          Sentra industri olahan Emping Melinjo "Kebonratu Gold", ketahanan pangan beras Ciherang organik, peternakan lokal, serta saung wisata keluarga Banten.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid Potensi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  {item.kategori}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                  {item.nama}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.deskripsi}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.lokasi}</span>
                  </p>

                  {item.pemilik && (
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      👤 Pemilik / Pengelola: {item.pemilik}
                    </p>
                  )}

                  {item.hargaRange && (
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                      🏷️ Info Harga / Kapasitas: {item.hargaRange}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => handleOpenWA(item.kontakWA, item.nama)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Pengelola Via WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
