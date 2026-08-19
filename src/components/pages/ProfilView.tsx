import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROFIL_DESA_DATA, KANTOR_IMAGE, KADES_IMAGE } from '../../data/initialData';
import {
  History,
  Compass,
  Target,
  Users,
  Award,
  Phone,
  GraduationCap,
  Building,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export const ProfilView: React.FC = () => {
  const { perangkatList } = useApp();
  const [activeTab, setActiveTab] = useState<'sejarah' | 'visi-misi' | 'geografis' | 'perangkat'>('sejarah');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-900 text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={KANTOR_IMAGE}
            alt="Kantor Desa Kebonratu"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Mengenal Lebih Dekat
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Profil Resmi Desa Kebonratu
          </h1>
          <p className="text-sm text-emerald-100 leading-relaxed font-medium">
            Kecamatan Lebak Wangi, Kabupaten Serang, Provinsi Banten. Mengenal nilai sejarah, batas wilayah, visi misi pembangunan, serta struktur pemerintahan desa.
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'sejarah', label: 'Sejarah & Asal Usul', icon: History },
          { id: 'visi-misi', label: 'Visi & Misi', icon: Target },
          { id: 'geografis', label: 'Letak & Batas Wilayah', icon: Compass },
          { id: 'perangkat', label: 'Struktur & Perangkat Desa', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Sejarah */}
      {activeTab === 'sejarah' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Sejarah & Asal Usul Desa Kebonratu
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Warisan budaya dan sejarah berdirinya pemukiman di Lebakwangi
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 text-slate-700 dark:text-slate-300">
            {PROFIL_DESA_DATA.sejarah.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-2">
                🌾 Kebun dan Kerajaan
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sesuai Dokumen Perubahan RPJM Desa 2022-2029, Kebonratu dahulu merupakan area perkebunan yang dimiliki seorang ratu dari Kerajaan Banten.
              </p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-950/40 p-5 rounded-2xl border border-teal-200 dark:border-teal-800/60">
              <h4 className="font-bold text-sm text-teal-900 dark:text-teal-300 mb-2">
                🤝 Kerukunan & Gotong Royong
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Hingga kini, tradisi gotong royong warga dalam membangun sarana ibadah, jalan kampung, dan pengairan persawahan tetap dipertahankan secara utuh.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Visi Misi */}
      {activeTab === 'visi-misi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Arah Pembangunan Desa
            </span>
            <h2 className="text-2xl font-black">VISI DESA KEBONRATU</h2>
            <blockquote className="text-base sm:text-lg font-medium italic text-emerald-100 border-l-4 border-emerald-400 pl-4 py-1">
              "{PROFIL_DESA_DATA.visi}"
            </blockquote>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              MISI STRATEGIS DESA KEBONRATU
            </h3>

            <div className="space-y-3 pt-2">
              {PROFIL_DESA_DATA.misi.map((misiText, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 font-medium pt-0.5 leading-relaxed">
                    {misiText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Geografis */}
      {activeTab === 'geografis' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Letak Geografis & Batas Wilayah
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peta administratif dan pembagian dusun Desa Kebonratu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Batas Administrasi Wilayah
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                    Batas Utara
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {PROFIL_DESA_DATA.batasWilayah.utara}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                  <p className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase">
                    Batas Selatan
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {PROFIL_DESA_DATA.batasWilayah.selatan}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                  <p className="text-[10px] font-bold text-sky-800 dark:text-sky-400 uppercase">
                    Batas Timur
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {PROFIL_DESA_DATA.batasWilayah.timur}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <p className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase">
                    Batas Barat
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {PROFIL_DESA_DATA.batasWilayah.barat}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Daftar Wilayah Dusun & Kampung:
                </h4>
                <div className="space-y-2">
                  {PROFIL_DESA_DATA.dusunList.map((dusun, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{dusun}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Google Map Placeholder */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col justify-between min-h-[300px]">
              <div className="p-4 bg-slate-900 text-white flex justify-between items-center text-xs">
                <span className="font-bold">📍 Peta Lokasi Kantor Desa Kebonratu</span>
                <span className="text-emerald-400 text-[11px]">Serang, Banten</span>
              </div>
              <iframe
                title="Google Maps Kebonratu"
                src="https://www.google.com/maps?q=-6.0946006,106.2610404&z=15&output=embed"
                className="w-full h-full min-h-[250px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Perangkat Desa */}
      {activeTab === 'perangkat' && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Pemerintah & Perangkat Desa Kebonratu
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jajaran aparat desa yang siap memberikan pelayanan cepat dan melayani warga sepenuh hati
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {perangkatList
              .filter((p) => p.kategori === 'Pemerintah Desa')
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all space-y-3 p-5 flex flex-col items-center text-center"
                >
                  <img
                    src={p.foto}
                    alt={p.nama}
                    className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500/30 shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{p.nama}</h3>
                    <span className="inline-block mt-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                      {p.jabatan}
                    </span>
                  </div>

                  <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-1 text-left">
                    {p.nipd && <p>🆔 NIPD: {p.nipd}</p>}
                    <p>🎓 Pendidikan: {p.pendidikan}</p>
                    <p>📞 Kontak: {p.telepon}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
