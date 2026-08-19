import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PerangkatDesa } from '../../types';
import { Shield, UserCheck, HeartHandshake, Sparkles, Users, Award } from 'lucide-react';

export const PemerintahanView: React.FC = () => {
  const { perangkatList } = useApp();
  const [kategoriFilter, setKategoriFilter] = useState<PerangkatDesa['kategori'] | 'Semua'>('Semua');

  const filteredPerangkat =
    kategoriFilter === 'Semua'
      ? perangkatList
      : perangkatList.filter((p) => p.kategori === kategoriFilter);

  const categories: Array<{ id: PerangkatDesa['kategori'] | 'Semua'; label: string; icon: any }> = [
    { id: 'Semua', label: 'Semua Lembaga', icon: Users },
    { id: 'Pemerintah Desa', label: 'Pemerintah Desa', icon: Shield },
    { id: 'BPD', label: 'BPD (Permusyawaratan)', icon: Award },
    { id: 'LPM', label: 'LPM (Pemberdayaan)', icon: HeartHandshake },
    { id: 'Karang Taruna', label: 'Karang Taruna', icon: Sparkles },
    { id: 'PKK', label: 'PKK Desa', icon: UserCheck }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Struktur Kemasyarakatan & Lembaga
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Pemerintahan & Lembaga Desa Kebonratu
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Sinergi Pemerintah Desa, Badan Permusyawaratan Desa (BPD), Lembaga Pemberdayaan Masyarakat (LPM), Karang Taruna, dan Tim Penggerak PKK demi memajukan Desa Kebonratu.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = kategoriFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setKategoriFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Perangkat & Pengurus Lembaga */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPerangkat.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col items-center text-center group"
          >
            <div className="relative">
              <img
                src={item.foto}
                alt={item.nama}
                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500/30 group-hover:border-emerald-500 transition-colors shadow-lg"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                {item.kategori}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{item.nama}</h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {item.jabatan}
              </p>
            </div>

            <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 text-left">
              {item.nipd && <p>🆔 <strong>NIPD/NIP:</strong> {item.nipd}</p>}
              <p>🎓 <strong>Pendidikan:</strong> {item.pendidikan}</p>
              <p>📞 <strong>Kontak Resmi:</strong> {item.telepon}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
