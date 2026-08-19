import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { Home, ChevronRight } from 'lucide-react';

const PAGE_LABELS: Record<PageId, string> = {
  beranda: 'Beranda',
  profil: 'Profil Desa',
  pemerintahan: 'Pemerintahan',
  'data-desa': 'Data & Statistik Desa',
  berita: 'Berita & Informasi',
  galeri: 'Galeri Foto & Video',
  potensi: 'Potensi & UMKM Desa',
  'bumdesa-umkm': 'BUMDesa & UMKM',
  transparansi: 'Transparansi APBDes',
  kontak: 'Kontak & Pengaduan',
  admin: 'Dashboard Operator'
};

export const Breadcrumb: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  if (activePage === 'beranda') return null;

  return (
    <div className="bg-emerald-50/80 dark:bg-slate-900/80 border-b border-emerald-100 dark:border-slate-800 py-3 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActivePage('beranda')}
          className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </button>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
          {PAGE_LABELS[activePage] || activePage}
        </span>
      </div>
    </div>
  );
};
