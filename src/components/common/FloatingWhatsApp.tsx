import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { PROFIL_DESA_DATA } from '../../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber = PROFIL_DESA_DATA.whatsapp;

  const handleOpenWA = (customMessage?: string) => {
    const text = customMessage || 'Halo Layanan Desa Kebonratu, saya ingin bertanya mengenai...';
    window.open(`https://wa.me/62${waNumber.substring(1)}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start">
      {isOpen && (
        <div className="mb-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-emerald-100 dark:border-emerald-800/40 p-4 animate-scale-up text-slate-800 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                KR
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pelayanan Desa Kebonratu</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">● Online Jam Kerja</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
            Sampurasun / Assalamu'alaikum Warga Kebonratu. Ada yang bisa kami bantu terkait pelayanan administrasi, bantuan sosial, atau informasi desa?
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleOpenWA('Halo, saya ingin menanyakan syarat Bantuan Sosial.')}
              className="w-full text-left text-xs bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-slate-700 dark:text-slate-200 font-medium"
            >
              🤝 Info Bantuan Sosial & Program Desa
            </button>
            <button
              onClick={() => handleOpenWA()}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Buka WhatsApp Sekarang
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hubungi via WhatsApp"
        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl hover:shadow-emerald-600/40 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="hidden group-hover:inline-block text-xs font-semibold pr-1">
          WhatsApp Desa
        </span>
      </button>
    </div>
  );
};
