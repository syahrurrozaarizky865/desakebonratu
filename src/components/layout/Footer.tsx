import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Users
} from 'lucide-react';
import { PROFIL_DESA_DATA } from '../../data/initialData';
import logoDesa from '../../assets/images/logo.png';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  const handleNav = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Profil Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-24 w-24 shrink-0">
                <img
                  src={logoDesa}
                  alt="Logo Pemerintah Desa Kebonratu"
                  className="h-full w-full scale-150 object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">DESA KEBONRATU</h3>
                <p className="text-xs text-emerald-400 font-medium">Kecamatan Lebakwangi • Serang</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Portal Website Resmi Pemerintah Desa Kebonratu. Mewujudkan transparansi informasi publik, kemudahan pelayanan mandiri, serta pemberdayaan ekonomi masyarakat desa Banten.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sistem Terintegrasi Pemkab Serang</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'profil' as PageId, label: 'Profil & Sejarah Desa' },
                { id: 'pemerintahan' as PageId, label: 'Struktur Pemerintahan & BPD' },
                { id: 'data-desa' as PageId, label: 'Infografis & Statistik Penduduk' },
                { id: 'potensi' as PageId, label: 'Sentra UMKM & Potensi Desa' },
                { id: 'transparansi' as PageId, label: 'Transparansi APBDes' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kontak & Pelayanan */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              Kontak Kantor Desa
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{PROFIL_DESA_DATA.alamat}, Kode Pos {PROFIL_DESA_DATA.kodePos}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{PROFIL_DESA_DATA.telepon}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{PROFIL_DESA_DATA.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Senin - Jumat: 08:00 - 15:00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Counter Pengunjung & Tautan Luar */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              Statistik Kunjungan
            </h4>

            <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span className="text-slate-400">Hari Ini:</span>
                <span className="text-emerald-400 font-bold">148 Kunjungan</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span className="text-slate-400">Bulan Ini:</span>
                <span className="text-white font-bold">3,892 Kunjungan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Pengunjung:</span>
                <span className="text-sky-400 font-extrabold">28,410 Hits</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://serangkab.go.id"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
              >
                <span>Portal Resmi Kab. Serang</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pemerintah Desa Kebonratu. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('kontak')} className="hover:text-slate-300 transition-colors">
              Pusat Bantuan
            </button>
            <span>•</span>
            <button onClick={() => handleNav('transparansi')} className="hover:text-slate-300 transition-colors">
              Keterbukaan Informasi
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
