import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Breadcrumb } from './components/layout/Breadcrumb';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { BackToTop } from './components/common/BackToTop';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginModal } from './components/admin/LoginModal';

// Views
import { BerandaView } from './components/pages/BerandaView';
import { ProfilView } from './components/pages/ProfilView';
import { PemerintahanView } from './components/pages/PemerintahanView';
import { DataDesaView } from './components/pages/DataDesaView';
import { BeritaView } from './components/pages/BeritaView';
import { GaleriView } from './components/pages/GaleriView';
import { PotensiView } from './components/pages/PotensiView';
import { BUMDesaUMKMView } from './components/pages/BUMDesaUMKMView';
import { TransparansiView } from './components/pages/TransparansiView';
import { KontakView } from './components/pages/KontakView';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { activePage } = useApp();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const pageMeta: Record<string, { title: string; description: string }> = {
      beranda: {
        title: 'KEBONRATU GO | Platform Digital Desa Kebonratu',
        description: 'KEBONRATU GO adalah platform digital Desa Kebonratu untuk informasi desa, BUMDesa, UMKM, produk lokal, berita, dan layanan warga.'
      },
      profil: {
        title: 'Profil Desa | KEBONRATU GO',
        description: 'Profil desa, sejarah, visi misi, dan informasi umum Desa Kebonratu.'
      },
      'bumdesa-umkm': {
        title: 'BUMDesa, UMKM & Katalog Produk | KEBONRATU GO',
        description: 'Informasi BUMDesa dan UMKM lokal Desa Kebonratu.'
      },
      pemerintahan: {
        title: 'Pemerintahan Desa | Desa Kebonratu',
        description: 'Struktur pemerintahan, perangkat desa, dan lembaga kemasyarakatan Desa Kebonratu.'
      },
      'data-desa': {
        title: 'Data Desa | Desa Kebonratu',
        description: 'Data demografi, APBDes, dan infografis statistik Desa Kebonratu.'
      },
      berita: {
        title: 'Berita Desa | Desa Kebonratu',
        description: 'Berita, kegiatan, dan informasi terkini dari Pemerintah Desa Kebonratu.'
      },
      galeri: {
        title: 'Galeri Desa | Desa Kebonratu',
        description: 'Galeri foto dan dokumentasi kegiatan Desa Kebonratu.'
      },
      potensi: {
        title: 'Potensi Desa | Desa Kebonratu',
        description: 'Potensi UMKM, wisata, pertanian, dan ekonomi lokal Desa Kebonratu.'
      },
      transparansi: {
        title: 'Transparansi APBDes | Desa Kebonratu',
        description: 'Transparansi anggaran, realisasi APBDes, dan data keuangan Desa Kebonratu.'
      },
      kontak: {
        title: 'Kontak & Pengaduan | Desa Kebonratu',
        description: 'Kontak resmi, lokasi, dan formulir pengaduan warga Desa Kebonratu.'
      },
      admin: {
        title: 'Dashboard Operator | Desa Kebonratu',
        description: 'Dashboard operator untuk mengelola konten, data warga, dan layanan Desa Kebonratu.'
      }
    };

    const meta = pageMeta[activePage] || pageMeta.beranda;
    document.title = meta.title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', meta.description);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar Header */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Dynamic View Container */}
      <main className="flex-1 w-full">
        {activePage === 'beranda' && <BerandaView />}
        {activePage === 'profil' && <ProfilView />}
        {activePage === 'pemerintahan' && <PemerintahanView />}
        {activePage === 'data-desa' && <DataDesaView />}
        {activePage === 'berita' && <BeritaView />}
        {activePage === 'galeri' && <GaleriView />}
        {activePage === 'potensi' && <PotensiView />}
        {activePage === 'bumdesa-umkm' && <BUMDesaUMKMView />}
        {activePage === 'transparansi' && <TransparansiView />}
        {activePage === 'kontak' && <KontakView />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <FloatingWhatsApp />
      <BackToTop />
      <ToastContainer />

      {/* Admin Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
