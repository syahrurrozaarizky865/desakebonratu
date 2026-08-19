
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_IMAGE } from '../../data/initialData';
import { PotensiItem } from '../../types';
import { MapPin, Phone, X } from 'lucide-react';

export const BUMDesaUMKMView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bumdesa' | 'umkm'>('bumdesa');
  const [selectedUmkm, setSelectedUmkm] = useState<PotensiItem | null>(null);
  const { potensiList, bumdesList } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img src={HERO_IMAGE} alt="BUMDesa & UMKM" className="w-full h-44 sm:h-56 object-cover brightness-75" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h1 className="text-white text-2xl sm:text-3xl font-extrabold">BUMDesa & UMKM</h1>
                <p className="text-white/90 text-sm mt-1">Produk unggulan masyarakat Desa Kebonratu — utamakan foto produk sebagai etalase.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('bumdesa')} className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === 'bumdesa' ? 'bg-emerald-700 text-white' : 'bg-white/90 text-emerald-700'}`}>BUMDesa</button>
                <button onClick={() => setActiveTab('umkm')} className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === 'umkm' ? 'bg-emerald-700 text-white' : 'bg-white/90 text-emerald-700'}`}>UMKM Desa</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-6">
          {/* BUMDesa Tab */}
          {activeTab === 'bumdesa' && (
            <div className="space-y-6">
              {bumdesList.length === 0 ? <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-12 text-center text-sm text-slate-500">Belum ada data BUMDes yang dipublikasikan.</div> : bumdesList.map((bumdes) => {
                const locationUrl = `https://www.google.com/maps/search/?api=1&query=${bumdes.latitude},${bumdes.longitude}`;
                return <div key={bumdes.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md"><div className="flex flex-col md:flex-row items-center gap-4">{bumdes.gambar && <img src={bumdes.gambar} alt={bumdes.nama} className="w-full md:w-1/3 h-44 object-cover rounded-lg shadow" />}<div className="flex-1"><h3 className="text-2xl font-extrabold text-emerald-800">{bumdes.nama}</h3><p className="text-xs font-bold uppercase tracking-wide text-emerald-600 mt-1">{bumdes.jenis_usaha}</p><p className="text-sm text-slate-600 mt-2">{bumdes.deskripsi}</p><p className="mt-3 text-sm text-slate-500"><MapPin className="mr-1 inline h-4 w-4 text-emerald-600" />{bumdes.alamat}</p><div className="mt-4 flex flex-wrap items-center gap-3"><a href={locationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"><MapPin className="h-4 w-4" />Lihat Lokasi GPS</a>{bumdes.kontak && <a href={`tel:${bumdes.kontak}`} className="inline-flex items-center gap-2 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold"><Phone className="h-4 w-4" />{bumdes.kontak}</a>}</div></div></div></div>;
              })}

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
                <h4 className="font-bold text-lg text-emerald-800">UMKM Desa Kebonratu</h4>
                <p className="text-sm text-slate-600 mt-1">Aneka produk lokal berkualitas dari pelaku UMKM Desa Kebonratu.</p>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {potensiList.filter(p => p.kategori === 'UMKM').map((u) => (
                    <div key={u.id} onClick={() => setSelectedUmkm(u)} className="cursor-pointer rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                      <img src={(u as any).gambar || (u as any).foto || ''} alt={(u as any).nama || (u as any).namaProduk || ''} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h5 className="font-bold text-emerald-800">{(u as any).nama || (u as any).namaProduk}</h5>
                        <p className="text-xs text-slate-600 mt-1">{(u as any).deskripsi}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4"/>{(u as any).lokasi}</div>
                          <a onClick={(event) => event.stopPropagation()} href={`https://wa.me/${(u as any).kontakWA}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(((u as any).nama || (u as any).namaProduk) || '')}`} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-3 py-2 rounded-md text-xs font-semibold">Pesan via WhatsApp</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* UMKM Tab */}
          {activeTab === 'umkm' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {potensiList.filter(p => p.kategori === 'UMKM').map((u) => (
                  <div key={u.id} onClick={() => setSelectedUmkm(u)} className="cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <img src={(u as any).gambar || (u as any).foto || ''} alt={(u as any).nama || (u as any).namaProduk || ''} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <h5 className="font-bold text-emerald-800">{(u as any).nama || (u as any).namaProduk}</h5>
                      <p className="text-sm text-slate-600 mt-1">{(u as any).deskripsi}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4"/>{(u as any).lokasi}</div>
                        <a onClick={(event) => event.stopPropagation()} href={`https://wa.me/${(u as any).kontakWA}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(((u as any).nama || (u as any).namaProduk) || '')}`} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-3 py-2 rounded-md text-xs font-semibold">Pesan via WhatsApp</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
          </div>

      {selectedUmkm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={() => setSelectedUmkm(null)}>
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
            <div className="relative">{selectedUmkm.gambar && <img src={selectedUmkm.gambar} alt={selectedUmkm.nama} className="h-56 w-full object-cover" />}<button onClick={() => setSelectedUmkm(null)} aria-label="Tutup detail UMKM" className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white"><X className="h-5 w-5" /></button></div>
            <div className="space-y-3 p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Detail UMKM Desa</p><h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedUmkm.nama}</h2><p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{selectedUmkm.deskripsi}</p><div className="space-y-2 text-sm text-slate-600 dark:text-slate-300"><p><MapPin className="mr-2 inline h-4 w-4 text-emerald-600" />{selectedUmkm.lokasi}</p>{selectedUmkm.pemilik && <p>Pengelola: <strong>{selectedUmkm.pemilik}</strong></p>}{selectedUmkm.hargaRange && <p>Info usaha: <strong>{selectedUmkm.hargaRange}</strong></p>}</div>{selectedUmkm.kontakWA && <a href={`https://wa.me/${selectedUmkm.kontakWA}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedUmkm.nama)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">Pesan via WhatsApp</a>}</div>
          </div>
        </div>
      )}
    </div>
  );
};
