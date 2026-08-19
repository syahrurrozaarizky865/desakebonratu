import React, { useState } from 'react';
import { DEMO_STATS, PROFIL_DESA_DATA } from '../../data/initialData';
import {
  PieChart as PieIcon,
  BarChart3,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export const DataDesaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gender' | 'usia' | 'pendidikan' | 'pekerjaan' | 'bansos'>('gender');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-3">
        <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Transparansi Data & Infografis
        </span>
        <h1 className="text-3xl font-black">Data Kependudukan Desa Kebonratu</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          Statistik resmi demografi kependudukan, mata pencaharian, tingkat pendidikan, dan penyaluran bantuan sosial bagi masyarakat Desa Kebonratu.
        </p>

        {/* Total Badge */}
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            👥 Total Jiwa: <span className="text-emerald-300 text-sm font-black">{PROFIL_DESA_DATA.jumlahPenduduk.toLocaleString('id-ID')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            🏠 Total Kepala Keluarga (KK): <span className="text-emerald-300 text-sm font-black">{PROFIL_DESA_DATA.jumlahKK.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {/* Navigation Switcher */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'gender', label: 'Jenis Kelamin', icon: Users },
          { id: 'usia', label: 'Kelompok Usia', icon: TrendingUp },
          { id: 'pendidikan', label: 'Tingkat Pendidikan', icon: GraduationCap },
          { id: 'pekerjaan', label: 'Mata Pencaharian', icon: Briefcase },
          { id: 'bansos', label: 'Bantuan Sosial', icon: Heart }
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
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fade-in">
        {/* 1. GENDER PIE CHART */}
        {activeTab === 'gender' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Statistik Jenis Kelamin
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Perbandingan populasi Laki-laki dan Perempuan di Desa Kebonratu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DEMO_STATS.gender}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    >
                      {DEMO_STATS.gender.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-5 space-y-4">
                {DEMO_STATS.gender.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: g.color }}
                      />
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                        {g.name}
                      </span>
                    </div>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      {g.value.toLocaleString('id-ID')} Jiwa
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. KELOMPOK USIA */}
        {activeTab === 'usia' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Statistik Kelompok Usia Penduduk
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sebaran demografi berdasarkan rentang umur anak, remaja, produktif, dan lansia
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_STATS.usia} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#16a34a" radius={[10, 10, 0, 0]} name="Jumlah Jiwa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 3. TINGKAT PENDIDIKAN */}
        {activeTab === 'pendidikan' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Statistik Tingkat Pendidikan Terakhir
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tingkat kelulusan sarana pendidikan formal warga Desa Kebonratu
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_STATS.pendidikan} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0284c7" radius={[10, 10, 0, 0]} name="Jumlah Warga" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. MATA PENCAHARIAN */}
        {activeTab === 'pekerjaan' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Statistik Mata Pencaharian Utama
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sebaran profesi masyarakat (didominasi sektor pertanian dan UMKM)
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_STATS.pekerjaan} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0d9488" radius={[10, 10, 0, 0]} name="Jumlah Pekerja" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 5. BANTUAN SOSIAL */}
        {activeTab === 'bansos' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Statistik Penerima Bantuan Sosial
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jumlah Keluarga Penerima Manfaat (KPM) program PKH, BPNT, dan BLT Dana Desa
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_STATS.bansos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#eab308" radius={[10, 10, 0, 0]} name="Jumlah KPM" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
