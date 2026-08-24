import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  TrendingUp,
  PieChart as PieIcon,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Building
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const TransparansiView: React.FC = () => {
  const { apbdesList, rpjmList, rkpdesList } = useApp();
  const [selectedYear, setSelectedYear] = useState(2026);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const pendapatanItems = apbdesList.filter((a) => a.kategori === 'Pendapatan' && a.tahun === selectedYear);
  const belanjaItems = apbdesList.filter((a) => a.kategori === 'Belanja' && a.tahun === selectedYear);
  const rkpdesTahun = Array.from(new Set([2026, ...apbdesList.map((item) => item.tahun), ...rkpdesList.map((item) => item.tahun)])).sort((a, b) => b - a);
  const rkpdesItems = rkpdesList.filter((item) => item.tahun === selectedYear);

  const totalPendapatanAnggaran = pendapatanItems.reduce((acc, curr) => acc + curr.anggaran, 0);
  const totalPendapatanRealisasi = pendapatanItems.reduce((acc, curr) => acc + curr.realisasi, 0);

  const totalBelanjaAnggaran = belanjaItems.reduce((acc, curr) => acc + curr.anggaran, 0);
  const totalBelanjaRealisasi = belanjaItems.reduce((acc, curr) => acc + curr.realisasi, 0);

  const chartData = [
    {
      name: 'Pendapatan Desa',
      Anggaran: totalPendapatanAnggaran,
      Realisasi: totalPendapatanRealisasi
    },
    {
      name: 'Belanja Desa',
      Anggaran: totalBelanjaAnggaran,
      Realisasi: totalBelanjaRealisasi
    }
  ];

  const pieBelanjaData = belanjaItems.map((b) => ({
    name: b.subKategori,
    value: b.anggaran
  }));

  const COLORS = ['#16a34a', '#0284c7', '#0d9488', '#eab308', '#dc2626'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-3">
        <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Keterbukaan Informasi Publik
        </span>
        <h1 className="text-3xl font-black">Transparansi Anggaran APBDes</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          Laporan Anggaran Pendapatan dan Belanja Desa (APBDes) serta realisasi penggunaan Dana Desa (APBN) dan ADD Kabupaten Serang Tahun {selectedYear}.
        </p>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dokumen Perencanaan Desa</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Program prioritas RPJM Desa 2022-2029</h2>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Program berikut dicantumkan dari matriks Dokumen Perubahan RPJM Desa Kebonratu pada halaman 97-140 dengan status target pelaksanaan tercatat di dokumen.
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-medium leading-relaxed text-amber-800 dark:bg-amber-950/50 dark:text-amber-200 sm:max-w-xs">
            Nilai adalah prakiraan biaya program RPJM, bukan realisasi kas atau LPJ APBDes.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rpjmList.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{item.program}</p>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{item.bidang}</span>
              </div>
              <p className="mt-3 text-base font-black text-emerald-600 dark:text-emerald-400">{formatRupiah(item.biaya)}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.status}</p>
            </article>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500">Sumber: Dokumen Perubahan RPJM Desa Kebonratu Tahun 2022-2029, matriks halaman 97-140.</p>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Rencana Kerja Tahunan</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Kegiatan RKPDes Tahun {selectedYear}</h2>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">RKPDes adalah rencana kerja Pemerintah Desa untuk satu tahun, sebagai penjabaran program RPJMDes per periode.</p>
          </div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Tahun RKPDes<select value={selectedYear} onChange={(event) => setSelectedYear(Number(event.target.value))} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white">{rkpdesTahun.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
        </div>

        {rkpdesItems.length === 0 ? <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 px-5 py-8 text-center text-xs text-slate-500 dark:border-sky-900 dark:bg-sky-950/20">Belum ada kegiatan RKPDes untuk tahun {selectedYear}.</div> : <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">{rkpdesItems.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex items-start justify-between gap-3"><p className="text-xs font-bold text-slate-900 dark:text-white">{item.kegiatan}</p><span className="shrink-0 rounded-full bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">{item.bidang}</span></div><p className="mt-3 text-base font-black text-sky-600 dark:text-sky-400">{formatRupiah(item.anggaran)}</p><p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">Status: {item.status}</p></article>)}</div>}
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Anggaran Pendapatan</p>
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            {formatRupiah(totalPendapatanAnggaran)}
          </p>
          <p className="text-[10px] text-slate-400">Realisasi: {formatRupiah(totalPendapatanRealisasi)}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Anggaran Belanja</p>
          <p className="text-lg font-black text-sky-600 dark:text-sky-400">
            {formatRupiah(totalBelanjaAnggaran)}
          </p>
          <p className="text-[10px] text-slate-400">Realisasi: {formatRupiah(totalBelanjaRealisasi)}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Persentase Realisasi Belanja</p>
          <p className="text-lg font-black text-amber-600 dark:text-amber-400">
            {((totalBelanjaRealisasi / (totalBelanjaAnggaran || 1)) * 100).toFixed(1)}%
          </p>
          <p className="text-[10px] text-slate-400">Berlangsung Sesuai RKPDes</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Surplus / Pembiayaan</p>
          <p className="text-lg font-black text-teal-600 dark:text-teal-400">
            {formatRupiah(totalPendapatanAnggaran - totalBelanjaAnggaran)}
          </p>
          <p className="text-[10px] text-slate-400">Seimbang & Akuntabel</p>
        </div>
      </div>

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Grafik Anggaran VS Realisasi
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={10} tickFormatter={(value) => `Rp${value / 1000000}Jt`} />
                <Tooltip formatter={(value: any) => formatRupiah(Number(value))} />
                <Legend />
                <Bar dataKey="Anggaran" fill="#0284c7" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Realisasi" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-emerald-600" />
            Proporsi Alokasi Belanja Desa
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieBelanjaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieBelanjaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatRupiah(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rincian Table Pendapatan & Belanja */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Rincian Transparansi Pos Anggaran APBDes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <th className="p-3 rounded-l-xl">Kategori</th>
                <th className="p-3">Pos Sumber / Sektor</th>
                <th className="p-3">Anggaran (Rp)</th>
                <th className="p-3">Realisasi (Rp)</th>
                <th className="p-3 rounded-r-xl">% Realisasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {apbdesList.map((item) => {
                const pct = ((item.realisasi / (item.anggaran || 1)) * 100).toFixed(1);
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                      {item.kategori}
                    </td>
                    <td className="p-3 font-semibold">{item.subKategori}</td>
                    <td className="p-3">{formatRupiah(item.anggaran)}</td>
                    <td className="p-3">{formatRupiah(item.realisasi)}</td>
                    <td className="p-3 font-extrabold text-amber-600">{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
