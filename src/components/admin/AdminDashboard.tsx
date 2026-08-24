import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { DEMO_STATS, PROFIL_DESA_DATA } from '../../data/initialData';
import {
  Berita,
  Agenda,
  Pengumuman,
  PendudukItem,
  PotensiItem,
  APBDesItem,
  RPJMItem,
  GaleriItem,
  PerangkatDesa
} from '../../types';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Megaphone,
  Users,
  Store,
  DollarSign,
  Image,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  XCircle,
  ShieldAlert,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sliders,
  X,
  Upload,
  ClipboardList
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'hero'
  | 'berita'
  | 'agenda'
  | 'pengumuman'
  | 'penduduk'
  | 'potensi'
  | 'bumdes'
  | 'apbdes'
  | 'rpjm'
  | 'galeri'
  | 'perangkat'
  | 'sambutan';

type EditorType = 'berita' | 'agenda' | 'pengumuman' | 'penduduk' | 'potensi' | 'bumdes' | 'apbdes' | 'rpjm' | 'perangkat' | 'sambutan';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    logout,
    beritaList,
    addBerita,
    updateBerita,
    deleteBerita,
    agendaList,
    addAgenda,
    updateAgenda,
    deleteAgenda,
    pengumumanList,
    addPengumuman,
    updatePengumuman,
    deletePengumuman,
    pendudukList,
    addPenduduk,
    updatePenduduk,
    deletePenduduk,
    potensiList,
    addPotensi,
    updatePotensi,
    deletePotensi,
    bumdesList,
    addBumdes,
    updateBumdes,
    deleteBumdes,
    apbdesList,
    addAPBDes,
    updateAPBDes,
    deleteAPBDes,
    rpjmList,
    addRPJM,
    updateRPJM,
    deleteRPJM,
    perangkatList,
    addPerangkat,
    updatePerangkat,
    deletePerangkat,
    sambutan,
    updateSambutan,
    galeriList,
    addGaleri,
    updateGaleri,
    deleteGaleri,
    heroSettings,
    updateHeroSettings,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [showBeritaModal, setShowBeritaModal] = useState(false);
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);

  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<Agenda | null>(null);

  const [showPengumumanModal, setShowPengumumanModal] = useState(false);
  const [editingPengumuman, setEditingPengumuman] = useState<Pengumuman | null>(null);

  const [showPendudukModal, setShowPendudukModal] = useState(false);
  const [editingPenduduk, setEditingPenduduk] = useState<PendudukItem | null>(null);

  const [showPotensiModal, setShowPotensiModal] = useState(false);
  const [editingPotensi, setEditingPotensi] = useState<PotensiItem | null>(null);

  const [showAPBDesModal, setShowAPBDesModal] = useState(false);
  const [editingAPBDes, setEditingAPBDes] = useState<APBDesItem | null>(null);

  const [showGaleriModal, setShowGaleriModal] = useState(false);
  const [galeriFile, setGaleriFile] = useState<File | null>(null);
  const [galeriPreview, setGaleriPreview] = useState('');
  const [editingGaleri, setEditingGaleri] = useState<GaleriItem | null>(null);
  const [galeriForm, setGaleriForm] = useState({
    judul: '',
    kategori: 'Kegiatan Desa' as GaleriItem['kategori'],
    album: 'Dokumentasi Desa',
    deskripsi: ''
  });
  const [editor, setEditor] = useState<{ type: EditorType; id?: string; data: Record<string, string> } | null>(null);
  const [editorFile, setEditorFile] = useState<File | null>(null);
  const [editorPreview, setEditorPreview] = useState('');
  const [isSavingEditor, setIsSavingEditor] = useState(false);
  const [heroForm, setHeroForm] = useState(heroSettings);

  React.useEffect(() => {
    setHeroForm(heroSettings);
  }, [heroSettings]);

  const jumlahLakiLaki = DEMO_STATS.gender.find((item) => item.name === 'Laki-laki')?.value ?? 0;
  const jumlahPerempuan = DEMO_STATS.gender.find((item) => item.name === 'Perempuan')?.value ?? 0;

  const openEditor = (type: EditorType, item?: Record<string, unknown>) => {
    const defaults: Record<EditorType, Record<string, string>> = {
      berita: { judul: '', ringkasan: '', konten: '', kategori: 'Pemerintahan', gambar: '', penulis: user.name },
      agenda: { judul: '', tanggal: '', waktu: '', lokasi: '', penyelenggara: '', keterangan: '', status: 'Mendatang' },
      pengumuman: { judul: '', isi: '', prioritas: 'Normal' },
      penduduk: { nik: '', nama: '', jenisKelamin: 'Laki-laki', tempatLahir: '', tanggalLahir: '', dusun: '', rt: '', rw: '', agama: 'Islam', pendidikan: '', pekerjaan: '', statusPernikahan: 'Belum Menikah' },
      potensi: { nama: '', kategori: 'UMKM', deskripsi: '', gambar: '', lokasi: '', pemilik: '', kontakWA: '', hargaRange: '' },
      bumdes: { nama: '', jenis_usaha: '', deskripsi: '', alamat: '', kontak: '', pemilik: '', gambar: '', latitude: '', longitude: '' },
      apbdes: { tahun: String(new Date().getFullYear()), kategori: 'Belanja', subKategori: '', anggaran: '0', realisasi: '0' },
      rpjm: { program: '', bidang: '', biaya: '0', status: '' },
      perangkat: { nama: '', jabatan: '', nipd: '', pendidikan: '', foto: '', telepon: '', kategori: 'Pemerintah Desa' },
      sambutan: { nama: '', jabatan: '', periode: '', foto: '', judul: '', salam: '', isiPertama: '', isiKedua: '', visi: '' }
    };
    const data = { ...defaults[type] };
    Object.entries(item ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'id' && key !== 'bantuanSosial') data[key] = String(value);
    });
    setEditor({ type, id: typeof item?.id === 'string' ? item.id : undefined, data });
    setEditorFile(null);
    setEditorPreview(type === 'berita' || type === 'potensi' || type === 'bumdes' ? data.gambar || '' : type === 'perangkat' || type === 'sambutan' ? data.foto || '' : '');
  };

  const updateEditor = (key: string, value: string) => {
    setEditor((current) => current ? { ...current, data: { ...current.data, [key]: value } } : current);
  };

  const handleEditorFileChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast('error', 'Pilih file gambar berformat JPG, PNG, atau WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      addToast('error', 'Ukuran foto maksimal 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const photo = String(reader.result);
      setEditorFile(file);
      setEditorPreview(photo);
      updateEditor(editor?.type === 'perangkat' || editor?.type === 'sambutan' ? 'foto' : 'gambar', photo);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Foto tidak dapat disimpan.');
      return null;
    }
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    // Avoid crypto.randomUUID because it is unavailable in some embedded browsers.
    const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const path = `${new Date().getFullYear()}/${uniqueId}.${extension}`;
    const { error } = await supabase.storage.from('desa-media').upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      addToast('error', `Unggah foto gagal: ${error.message}`);
      return null;
    }
    return supabase.storage.from('desa-media').getPublicUrl(path).data.publicUrl;
  };

  const saveEditor = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editor || isSavingEditor) return;
    const { type, id, data } = editor;
    const imageField = type === 'perangkat' || type === 'sambutan' ? 'foto' : 'gambar';
    const needsImage = type === 'berita' || type === 'potensi' || type === 'bumdes' || type === 'perangkat' || type === 'sambutan';
    if (needsImage && !data[imageField]) {
      addToast('error', 'Pilih foto terlebih dahulu sebelum menyimpan data.');
      return;
    }

    setIsSavingEditor(true);
    try {
      let savedData = data;
      if (editorFile && needsImage) {
        const uploadedUrl = await uploadImage(editorFile);
        // Keep saving the written content when the media bucket is unavailable.
        // The image is optional in the published record, while the article data is not.
        savedData = { ...data, [imageField]: uploadedUrl ?? '' };
        if (!uploadedUrl) addToast('info', 'Foto belum dapat diunggah. Data berita tetap disimpan tanpa foto.');
      }
      if (type === 'berita') {
        const item = { judul: savedData.judul, slug: `berita-${Date.now()}-${savedData.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`, ringkasan: savedData.ringkasan, konten: savedData.konten, kategori: savedData.kategori as Berita['kategori'], gambar: savedData.gambar, penulis: savedData.penulis, tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) };
        id ? updateBerita({ ...item, id, dibaca: beritaList.find((entry) => entry.id === id)?.dibaca ?? 0 }) : addBerita(item);
      }
      if (type === 'agenda') {
      const item = { ...data, status: data.status as Agenda['status'] };
      id ? updateAgenda({ ...item, id }) : addAgenda(item);
    }
      if (type === 'pengumuman') {
      const item = { judul: data.judul, isi: data.isi, tanggal: new Date().toLocaleDateString('id-ID'), prioritas: data.prioritas as Pengumuman['prioritas'] };
      id ? updatePengumuman({ ...item, id }) : addPengumuman(item);
    }
      if (type === 'penduduk') {
      const item = { ...data, jenisKelamin: data.jenisKelamin as PendudukItem['jenisKelamin'], statusPernikahan: data.statusPernikahan as PendudukItem['statusPernikahan'], bantuanSosial: [] };
      id ? updatePenduduk({ ...item, id }) : addPenduduk(item);
    }
      if (type === 'potensi') {
      const item = { ...savedData, kategori: savedData.kategori as PotensiItem['kategori'] };
      id ? updatePotensi({ ...item, id }) : addPotensi(item);
    }
      if (type === 'bumdes') {
      const coordinates = data.latitude && data.longitude ? { latitude: data.latitude, longitude: data.longitude } : {};
      const item = { nama: data.nama, jenis_usaha: data.jenis_usaha, deskripsi: data.deskripsi, alamat: data.alamat, kontak: data.kontak, pemilik: data.pemilik, gambar: savedData.gambar, ...coordinates };
      const isSaved = id ? await updateBumdes({ ...item, id }) : await addBumdes(item);
      if (!isSaved) return;
    }
      if (type === 'apbdes') {
      const item = { tahun: Number(data.tahun), kategori: data.kategori as APBDesItem['kategori'], subKategori: data.subKategori, anggaran: Number(data.anggaran), realisasi: Number(data.realisasi) };
      id ? updateAPBDes({ ...item, id }) : addAPBDes(item);
    }
      if (type === 'rpjm') {
      const item = { program: data.program, bidang: data.bidang, biaya: Number(data.biaya), status: data.status };
      id ? updateRPJM({ ...item, id }) : addRPJM(item);
    }
      if (type === 'perangkat') {
      const item = { nama: savedData.nama, jabatan: savedData.jabatan, nipd: savedData.nipd, pendidikan: savedData.pendidikan, foto: savedData.foto, telepon: savedData.telepon, kategori: savedData.kategori as PerangkatDesa['kategori'] };
      id ? updatePerangkat({ ...item, id }) : addPerangkat(item);
    }
      if (type === 'sambutan') {
      updateSambutan({ id: 'utama', nama: savedData.nama, jabatan: savedData.jabatan, periode: savedData.periode, foto: savedData.foto, judul: savedData.judul, salam: savedData.salam, isiPertama: savedData.isiPertama, isiKedua: savedData.isiKedua, visi: savedData.visi });
    }
      setEditor(null);
    } finally {
      setIsSavingEditor(false);
    }
  };

  const openGaleriModal = () => {
    setEditingGaleri(null);
    setGaleriFile(null);
    setGaleriPreview('');
    setGaleriForm({ judul: '', kategori: 'Kegiatan Desa', album: 'Dokumentasi Desa', deskripsi: '' });
    setShowGaleriModal(true);
  };

  const openGaleriEditor = (item: GaleriItem) => {
    setEditingGaleri(item);
    setGaleriFile(null);
    setGaleriPreview(item.url);
    setGaleriForm({ judul: item.judul, kategori: item.kategori, album: item.album, deskripsi: item.deskripsi });
    setShowGaleriModal(true);
  };

  const handleGaleriFileChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast('error', 'Pilih file gambar berformat JPG, PNG, atau WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      addToast('error', 'Ukuran foto maksimal 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setGaleriFile(file);
      setGaleriPreview(String(reader.result));
      if (!galeriForm.judul) {
        setGaleriForm((current) => ({ ...current, judul: file.name.replace(/\.[^/.]+$/, '') }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGaleriSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!galeriPreview) {
      addToast('error', 'Pilih foto yang akan diunggah terlebih dahulu.');
      return;
    }
    if (!galeriForm.judul.trim() || !galeriForm.album.trim() || !galeriForm.deskripsi.trim()) {
      addToast('error', 'Lengkapi judul, album, dan deskripsi foto.');
      return;
    }
    const uploadedUrl = galeriFile ? await uploadImage(galeriFile) : galeriPreview;
    if (!uploadedUrl) return;
    const item = {
      judul: galeriForm.judul.trim(),
      tipe: 'foto',
      url: uploadedUrl,
      kategori: galeriForm.kategori,
      album: galeriForm.album.trim(),
      tanggal: new Date().toLocaleDateString('id-ID'),
      deskripsi: galeriForm.deskripsi.trim()
    };
    editingGaleri ? updateGaleri({ ...item, id: editingGaleri.id }) : addGaleri(item);
    setShowGaleriModal(false);
  };

  const handleHeroFileChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast('error', 'Pilih file gambar berformat JPG, PNG, atau WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      addToast('error', 'Ukuran foto maksimal 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setHeroForm((current) => ({ ...current, image: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const saveHeroSettings = (event: React.FormEvent) => {
    event.preventDefault();
    if (!heroForm.badge.trim() || !heroForm.title.trim() || !heroForm.subtitle.trim() || !heroForm.buttonText.trim()) {
      addToast('error', 'Semua field hero harus diisi sebelum disimpan.');
      return;
    }
    updateHeroSettings({ ...heroForm, badge: heroForm.badge.trim(), title: heroForm.title.trim(), subtitle: heroForm.subtitle.trim(), buttonText: heroForm.buttonText.trim() });
    addToast('success', 'Slide utama berhasil diperbarui.');
  };

  // Pagination helper
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!user || user.role === 'guest') {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-rose-200 dark:border-rose-900/50 text-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Akses Dibatasi</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Anda harus login sebagai Operator Desa untuk mengakses Dashboard Operator.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 lg:py-10">
      {/* Main Admin Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[224px_minmax(0,1fr)] gap-10">
        {/* Sidebar Nav Tabs (Col 3) */}
        <div className="space-y-2">
          <div className="lg:sticky lg:top-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
              Menu Utama
            </p>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-100 text-emerald-800 shadow-none'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-5 pb-2">Manajemen Konten</p>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hero'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Slide Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('berita')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'berita'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Berita & Artikel ({beritaList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('agenda')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'agenda'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agenda Desa ({agendaList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pengumuman')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pengumuman'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Pengumuman ({pengumumanList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('penduduk')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'penduduk'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Kependudukan Desa ({pendudukList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('perangkat')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'perangkat'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Struktur Desa ({perangkatList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sambutan')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sambutan'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Edit className="w-4 h-4" />
              <span>Sambutan Kepala Desa</span>
            </button>

            <button
              onClick={() => setActiveTab('potensi')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'potensi'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Potensi & UMKM ({potensiList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('apbdes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'apbdes'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Data APBDes ({apbdesList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rpjm')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rpjm'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Program RPJM Desa ({rpjmList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bumdes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'bumdes' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Store className="w-4 h-4" />
              <span>BUMDes ({bumdesList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('galeri')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'galeri'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Galeri Foto & Video ({galeriList.length})</span>
            </button>

            <button onClick={logout} className="mt-5 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30">
              <LogOut className="w-4 h-4" />
              <span>Keluar Dashboard</span>
            </button>
          </div>
        </div>

        {/* Main Workspace Area (Col 9) */}
        <div className="space-y-6">
          {/* TAB OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-2 border-l-4 border-emerald-500 pl-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Pusat Kendali Desa Kebonratu</p><h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">Halo, {user.name}</h1><p className="mt-2 text-sm text-slate-500">Pantau kabar, potensi, dan kegiatan desa dari satu tempat.</p></div><span className="text-xs font-semibold text-slate-400">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>

              <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><Newspaper className="h-7 w-7 text-emerald-700" /><h3 className="mt-3 text-3xl font-black text-emerald-900">{beritaList.length}</h3><p className="mt-1 text-xs font-bold uppercase text-emerald-700">Total Berita</p></div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><Calendar className="h-7 w-7 text-amber-700" /><h3 className="mt-3 text-3xl font-black text-amber-900">{agendaList.length}</h3><p className="mt-1 text-xs font-bold uppercase text-amber-700">Agenda Desa</p></div>
                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5"><Store className="h-7 w-7 text-violet-700" /><h3 className="mt-3 text-3xl font-black text-violet-900">{potensiList.filter((item) => item.kategori === 'UMKM').length}</h3><p className="mt-1 text-xs font-bold uppercase text-violet-700">UMKM Terdaftar</p></div>
                <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5"><Store className="h-7 w-7 text-teal-700" /><h3 className="mt-3 text-3xl font-black text-teal-900">{bumdesList.length}</h3><p className="mt-1 text-xs font-bold uppercase text-teal-700">BUMDes Aktif</p></div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5"><Image className="h-7 w-7 text-rose-700" /><h3 className="mt-3 text-3xl font-black text-rose-900">{galeriList.length}</h3><p className="mt-1 text-xs font-bold uppercase text-rose-700">Album Galeri</p></div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5"><h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-900"><Plus className="h-5 w-5" /> Aksi Cepat</h2><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><button onClick={() => { setActiveTab('berita'); openEditor('berita'); }} className="rounded-xl border border-emerald-200 bg-white p-4 text-xs font-bold text-slate-700 hover:border-emerald-400"><Newspaper className="mx-auto mb-2 h-5 w-5 text-emerald-700" />Tambah Berita</button><button onClick={() => { setActiveTab('agenda'); openEditor('agenda'); }} className="rounded-xl border border-amber-200 bg-white p-4 text-xs font-bold text-slate-700 hover:border-amber-400"><Calendar className="mx-auto mb-2 h-5 w-5 text-amber-700" />Tambah Agenda</button><button onClick={() => { setActiveTab('bumdes'); openEditor('bumdes'); }} className="rounded-xl border border-violet-200 bg-white p-4 text-xs font-bold text-slate-700 hover:border-violet-400"><Store className="mx-auto mb-2 h-5 w-5 text-violet-700" />Tambah BUMDes</button><button onClick={() => { setActiveTab('galeri'); openGaleriModal(); }} className="rounded-xl border border-rose-200 bg-white p-4 text-xs font-bold text-slate-700 hover:border-rose-400"><Image className="mx-auto mb-2 h-5 w-5 text-rose-700" />Tambah Album</button></div></div>

              <div className="grid gap-6 xl:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><h2 className="text-sm font-black uppercase text-slate-800 dark:text-white">Berita Terbaru</h2><button onClick={() => setActiveTab('berita')} className="text-xs font-bold text-emerald-700">Lihat semua</button></div><div className="mt-4 space-y-2">{beritaList.slice(0, 3).map((item) => <button key={item.id} onClick={() => setActiveTab('berita')} className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 text-left text-xs font-semibold text-slate-700 hover:border-emerald-200 dark:border-slate-800 dark:text-slate-200"><span className="truncate">{item.judul}</span><span className="shrink-0 rounded-md bg-emerald-100 px-2 py-1 text-[10px] text-emerald-700">{item.kategori}</span></button>)}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><h2 className="text-sm font-black uppercase text-slate-800 dark:text-white">Agenda Mendatang</h2><button onClick={() => setActiveTab('agenda')} className="text-xs font-bold text-amber-700">Lihat semua</button></div><div className="mt-4 space-y-2">{agendaList.slice(0, 3).map((item) => <button key={item.id} onClick={() => setActiveTab('agenda')} className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 text-left text-xs font-semibold text-slate-700 hover:border-amber-200 dark:border-slate-800 dark:text-slate-200"><span className="truncate">{item.judul}</span><span className="shrink-0 text-[10px] text-slate-400">{item.tanggal}</span></button>)}</div></div></div>

            </div>
          )}

          {activeTab === 'hero' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Slide Utama Beranda</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Ubah foto latar, label, judul, dan tombol hero yang tampil di halaman depan.</p>
              </div>

              <form onSubmit={saveHeroSettings} className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={heroForm.badge}
                    onChange={(event) => setHeroForm((current) => ({ ...current, badge: event.target.value }))}
                    placeholder="Label / badge"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                  />
                  <input
                    value={heroForm.buttonText}
                    onChange={(event) => setHeroForm((current) => ({ ...current, buttonText: event.target.value }))}
                    placeholder="Teks tombol"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <input
                  value={heroForm.title}
                  onChange={(event) => setHeroForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Judul utama"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                />

                <textarea
                  rows={3}
                  value={heroForm.subtitle}
                  onChange={(event) => setHeroForm((current) => ({ ...current, subtitle: event.target.value }))}
                  placeholder="Subjudul / keterangan"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                />

                <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
                  {heroForm.image ? (
                    <img src={heroForm.image} alt="Pratinjau hero" className="mx-auto max-h-60 rounded-xl object-cover" />
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2 h-7 w-7 text-emerald-600" />
                      <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto hero</p>
                    </>
                  )}
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleHeroFileChange(event.target.files?.[0])} />
                </label>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setHeroForm(heroSettings)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    Simpan Slide
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB BERITA */}
          {activeTab === 'berita' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Daftar Berita Desa</h3>
                <button
                  onClick={() => openEditor('berita')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Berita Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {beritaList.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img src={b.gambar} alt={b.judul} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">{b.kategori}</span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{b.judul}</h4>
                        <p className="text-[11px] text-slate-400">
                          {b.tanggal} • Oleh {b.penulis}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditor('berita', b)}
                        className="p-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBerita(b.id)}
                        className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB AGENDA */}
          {activeTab === 'agenda' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Kelola Agenda Desa</h3>
                <button
                  onClick={() => openEditor('agenda')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Agenda Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {agendaList.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between items-center gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {a.tanggal} • {a.waktu}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{a.judul}</h4>
                      <p className="text-[11px] text-slate-400">📍 {a.lokasi}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <button onClick={() => openEditor('agenda', a)} className="p-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAgenda(a.id)}
                      className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB PENGUMUMAN */}
          {activeTab === 'pengumuman' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Kelola Pengumuman Resmi</h3>
                <button
                  onClick={() => openEditor('pengumuman')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Pengumuman</span>
                </button>
              </div>

              <div className="space-y-3">
                {pengumumanList.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between items-center gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        {p.prioritas} • {p.tanggal}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{p.judul}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{p.isi}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <button onClick={() => openEditor('pengumuman', p)} className="p-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePengumuman(p.id)}
                      className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB DATA PENDUDUK */}
          {activeTab === 'penduduk' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Kependudukan Desa Kebonratu</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Ringkasan resmi RPJM Desa 2022-2029, dengan data warga operasional yang dapat dikelola di bawah.</p>
                </div>
                <button
                  onClick={() => openEditor('penduduk')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Data Warga</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30"><p className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">Total penduduk</p><p className="mt-1 text-xl font-black text-emerald-900 dark:text-emerald-100">{PROFIL_DESA_DATA.jumlahPenduduk.toLocaleString('id-ID')}</p></div>
                <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-950/30"><p className="text-[10px] font-bold uppercase text-sky-700 dark:text-sky-300">Laki-laki</p><p className="mt-1 text-xl font-black text-sky-900 dark:text-sky-100">{jumlahLakiLaki.toLocaleString('id-ID')}</p></div>
                <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-950/30"><p className="text-[10px] font-bold uppercase text-violet-700 dark:text-violet-300">Perempuan</p><p className="mt-1 text-xl font-black text-violet-900 dark:text-violet-100">{jumlahPerempuan.toLocaleString('id-ID')}</p></div>
                <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30"><p className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300">Kepala keluarga</p><p className="mt-1 text-xl font-black text-amber-900 dark:text-amber-100">{PROFIL_DESA_DATA.jumlahKK.toLocaleString('id-ID')}</p></div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">Statistik di atas mengacu pada RPJM Desa Kebonratu 2022-2029 halaman 13. Jumlah baris tabel berikut adalah data operasional, bukan total statistik desa.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">NIK & Nama</th>
                      <th className="p-3">Dusun / RT / RW</th>
                      <th className="p-3">Pekerjaan</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {pendudukList.map((p) => (
                      <tr key={p.id}>
                        <td className="p-3 font-semibold">
                          <div>{p.nama}</div>
                          <div className="text-[10px] text-slate-400 font-mono">NIK: {p.nik}</div>
                        </td>
                        <td className="p-3">
                          {p.dusun} (RT {p.rt}/RW {p.rw})
                        </td>
                        <td className="p-3">{p.pekerjaan}</td>
                        <td className="p-3">
                          <div className="flex gap-1">
                          <button onClick={() => openEditor('penduduk', p)} className="p-1.5 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deletePenduduk(p.id)}
                            className="p-1.5 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB POTENSI */}
          {activeTab === 'potensi' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Kelola Potensi & UMKM Desa</h3>
                <button
                  onClick={() => openEditor('potensi')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Potensi UMKM</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {potensiList.map((pot) => (
                  <div
                    key={pot.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{pot.nama}</h4>
                      <div className="flex gap-1">
                      <button onClick={() => openEditor('potensi', pot)} className="p-1 text-sky-600 hover:text-sky-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePotensi(pot.id)}
                        className="p-1 text-rose-600 hover:text-rose-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{pot.deskripsi}</p>
                    <div className="text-[10px] font-bold text-emerald-600">📍 {pot.lokasi}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB APBDES */}
          {activeTab === 'apbdes' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Master Data APBDes Transparansi</h3>
                <button
                  onClick={() => openEditor('apbdes')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pos APBDes</span>
                </button>
              </div>

              <div className="space-y-2">
                {apbdesList.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-12 text-center dark:border-emerald-900 dark:bg-emerald-950/20">
                    <DollarSign className="mx-auto h-9 w-9 text-emerald-600" />
                    <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">Belum ada pos APBDes</p>
                    <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-slate-500">Mulailah dengan memasukkan pos pendapatan, belanja, atau pembiayaan agar warga dapat melihat transparansi anggaran desa.</p>
                    <button onClick={() => openEditor('apbdes')} className="mt-4 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"><Plus className="mr-1 inline h-4 w-4" />Tambah pos pertama</button>
                  </div>
                )}
                {apbdesList.map((apb) => (
                  <div
                    key={apb.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs"
                  >
                    <div>
                      <span className="font-bold text-emerald-600">{apb.kategori} ({apb.tahun})</span>
                      <h4 className="font-bold text-slate-900 dark:text-white">{apb.subKategori}</h4>
                      <p className="text-[11px] text-slate-500">
                        Anggaran: Rp {apb.anggaran.toLocaleString('id-ID')} | Realisasi: Rp {apb.realisasi.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex gap-1">
                    <button onClick={() => openEditor('apbdes', apb)} className="p-2 text-sky-600 hover:text-sky-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAPBDes(apb.id)}
                      className="p-2 text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rpjm' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Program Prioritas RPJM Desa</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Kelola program yang tampil pada halaman Transparansi APBDes.</p>
                </div>
                <button onClick={() => openEditor('rpjm')} className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Program</span>
                </button>
              </div>

              <div className="space-y-2">
                {rpjmList.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-12 text-center dark:border-emerald-900 dark:bg-emerald-950/20">
                    <ClipboardList className="mx-auto h-9 w-9 text-emerald-600" />
                    <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">Belum ada program RPJM</p>
                    <button onClick={() => openEditor('rpjm')} className="mt-4 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"><Plus className="mr-1 inline h-4 w-4" />Tambah program pertama</button>
                  </div>
                )}
                {rpjmList.map((program) => (
                  <div key={program.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs dark:border-slate-700 dark:bg-slate-800/60">
                    <div>
                      <span className="font-bold text-emerald-600">{program.bidang}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white">{program.program}</h4>
                      <p className="text-[11px] text-slate-500">Rp {program.biaya.toLocaleString('id-ID')} · {program.status}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button onClick={() => openEditor('rpjm', program)} aria-label={`Ubah ${program.program}`} className="p-2 text-sky-600 hover:text-sky-800"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => deleteRPJM(program.id)} aria-label={`Hapus ${program.program}`} className="p-2 text-rose-600 hover:text-rose-800"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bumdes' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center gap-3">
                <div><h3 className="text-base font-bold text-slate-900 dark:text-white">Kelola BUMDes Desa</h3><p className="mt-1 text-xs text-slate-500">Data ini tampil pada halaman BUMDesa & UMKM.</p></div>
                <button onClick={() => openEditor('bumdes')} className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"><Plus className="w-4 h-4" /><span>Tambah BUMDes</span></button>
              </div>
              {bumdesList.length === 0 && <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center text-sm text-slate-500">Belum ada data BUMDes.</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bumdesList.map((bumdes) => (
                  <div key={bumdes.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {bumdes.gambar && <img src={bumdes.gambar} alt={bumdes.nama} className="w-full h-32 object-cover" />}
                    <div className="p-4 space-y-2"><div className="flex justify-between items-start gap-2"><div><h4 className="text-sm font-bold text-slate-900 dark:text-white">{bumdes.nama}</h4><p className="text-[11px] text-emerald-700">{bumdes.jenis_usaha}</p></div><div className="flex gap-1"><button onClick={() => openEditor('bumdes', bumdes)} className="p-1 text-sky-600"><Edit className="w-4 h-4" /></button><button onClick={() => deleteBumdes(bumdes.id)} className="p-1 text-rose-600"><Trash2 className="w-4 h-4" /></button></div></div><p className="text-xs text-slate-500 line-clamp-2">{bumdes.deskripsi}</p><p className="text-[11px] text-slate-500">{bumdes.alamat} · {bumdes.kontak}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB GALERI */}
          {activeTab === 'sambutan' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div><h3 className="text-base font-bold text-slate-900 dark:text-white">Sambutan Kepala Desa</h3><p className="mt-1 text-xs text-slate-500">Foto dan teks ini tampil di beranda website.</p></div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center"><img src={sambutan.foto} alt={sambutan.nama} className="h-24 w-20 rounded-xl object-cover" /><div><p className="font-bold text-slate-900 dark:text-white">{sambutan.nama}</p><p className="text-sm text-slate-500">{sambutan.jabatan}</p><button onClick={() => openEditor('sambutan', sambutan)} className="mt-3 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700">Ubah sambutan</button></div></div>
            </div>
          )}

          {activeTab === 'galeri' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Master Galeri Foto & Video</h3>
                <button
                  onClick={openGaleriModal}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Foto / Media</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galeriList.map((g) => (
                  <div
                    key={g.id}
                    className="relative aspect-video rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-800"
                  >
                    <img src={g.url} alt={g.judul} className="w-full h-full object-cover" />
                    <button
                      onClick={() => openGaleriEditor(g)}
                      aria-label={`Edit ${g.judul}`}
                      className="absolute top-2 left-2 p-1.5 bg-sky-600 text-white rounded-lg opacity-90 hover:opacity-100"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteGaleri(g.id)}
                      className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-90 hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-slate-950/80 text-white text-[10px] truncate">
                      {g.judul}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'perangkat' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex flex-wrap justify-between gap-3 items-center">
                <div><h3 className="text-base font-bold text-slate-900 dark:text-white">Struktur & Perangkat Desa</h3><p className="mt-1 text-xs text-slate-500">Kelola anggota yang tampil pada halaman profil dan pemerintahan.</p></div>
                <button onClick={() => openEditor('perangkat')} className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-700"><Plus className="w-4 h-4" />Tambah anggota</button>
              </div>
              <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-b border-slate-200 text-slate-500 dark:border-slate-700"><tr><th className="pb-3 font-semibold">Nama</th><th className="pb-3 font-semibold">Jabatan</th><th className="pb-3 font-semibold">Kategori</th><th className="pb-3 text-right font-semibold">Aksi</th></tr></thead><tbody>{perangkatList.map((item) => <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800"><td className="py-3 font-bold text-slate-900 dark:text-white">{item.nama}</td><td className="py-3 text-slate-600 dark:text-slate-300">{item.jabatan}</td><td className="py-3 text-slate-500">{item.kategori}</td><td className="py-3"><div className="flex justify-end gap-2"><button onClick={() => openEditor('perangkat', item)} aria-label={`Ubah ${item.nama}`} className="rounded-lg bg-sky-600 p-1.5 text-white hover:bg-sky-700"><Edit className="h-3.5 w-3.5" /></button><button onClick={() => deletePerangkat(item.id)} aria-label={`Hapus ${item.nama}`} className="rounded-lg bg-rose-600 p-1.5 text-white hover:bg-rose-700"><Trash2 className="h-3.5 w-3.5" /></button></div></td></tr>)}</tbody></table></div>
            </div>
          )}

          {showGaleriModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <form onSubmit={handleGaleriSubmit} className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingGaleri ? 'Ubah Foto Galeri' : 'Unggah Foto Galeri'}</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Foto yang dipilih akan menjadi foto galeri, bukan gambar contoh.</p>
                  </div>
                  <button type="button" onClick={() => setShowGaleriModal(false)} aria-label="Tutup" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-5 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
                  {galeriPreview ? (
                    <img src={galeriPreview} alt="Pratinjau foto yang dipilih" className="mx-auto max-h-48 rounded-xl object-contain" />
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2 h-7 w-7 text-emerald-600" />
                      <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto dari perangkat</p>
                      <p className="mt-1 text-[11px] text-slate-500">JPG, PNG, atau WebP. Maksimal 2 MB.</p>
                    </>
                  )}
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleGaleriFileChange(event.target.files?.[0])} />
                </label>
                {galeriFile && <p className="text-xs text-slate-500">File: {galeriFile.name}</p>}

                <input required value={galeriForm.judul} onChange={(event) => setGaleriForm({ ...galeriForm, judul: event.target.value })} placeholder="Judul foto" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                <div className="grid grid-cols-2 gap-3">
                  <input required value={galeriForm.album} onChange={(event) => setGaleriForm({ ...galeriForm, album: event.target.value })} placeholder="Nama album" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <select value={galeriForm.kategori} onChange={(event) => setGaleriForm({ ...galeriForm, kategori: event.target.value as GaleriItem['kategori'] })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800">
                    <option>Kegiatan Desa</option><option>Pembangunan</option><option>Budaya & Tradisi</option><option>Keindahan Alam</option>
                  </select>
                </div>
                <textarea required rows={3} value={galeriForm.deskripsi} onChange={(event) => setGaleriForm({ ...galeriForm, deskripsi: event.target.value })} placeholder="Deskripsi singkat foto" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                <div className="flex justify-end gap-3 pt-1">
                  <button type="button" onClick={() => setShowGaleriModal(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Batal</button>
                  <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700">{editingGaleri ? 'Simpan Perubahan' : 'Simpan Foto'}</button>
                </div>
              </form>
            </div>
          )}

          {editor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <form noValidate onSubmit={saveEditor} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editor.id ? 'Ubah' : 'Tambah'} {({ berita: 'Berita', agenda: 'Agenda', pengumuman: 'Pengumuman', penduduk: 'Data Warga', potensi: 'Potensi / UMKM', bumdes: 'BUMDes', apbdes: 'Pos APBDes', rpjm: 'Program RPJM Desa', perangkat: 'Anggota Struktur Desa', sambutan: 'Sambutan Kepala Desa' } as Record<EditorType, string>)[editor.type]}</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Lengkapi data asli sebelum disimpan.</p>
                  </div>
                  <button type="button" onClick={() => setEditor(null)} aria-label="Tutup" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-5 w-5" /></button>
                </div>

                {editor.type === 'berita' && <>
                  <input required value={editor.data.judul} onChange={(e) => updateEditor('judul', e.target.value)} placeholder="Judul berita" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <div className="grid grid-cols-2 gap-3"><select value={editor.data.kategori} onChange={(e) => updateEditor('kategori', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Pemerintahan</option><option>Pembangunan</option><option>Kemasyarakatan</option><option>Ekonomi</option><option>Pengumuman</option></select><input required value={editor.data.penulis} onChange={(e) => updateEditor('penulis', e.target.value)} placeholder="Penulis" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
                  <label className="block cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
                    {editorPreview ? <img src={editorPreview} alt="Pratinjau foto berita" className="mx-auto max-h-40 rounded-lg object-contain" /> : <><Upload className="mx-auto mb-1 h-6 w-6 text-emerald-600" /><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto berita</p><p className="mt-1 text-[11px] text-slate-500">JPG, PNG, atau WebP. Maksimal 2 MB.</p></>}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleEditorFileChange(event.target.files?.[0])} />
                  </label>
                  {editorFile && <p className="text-xs text-slate-500">File: {editorFile.name}</p>}
                  <textarea required rows={2} value={editor.data.ringkasan} onChange={(e) => updateEditor('ringkasan', e.target.value)} placeholder="Ringkasan berita" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <textarea required rows={6} value={editor.data.konten} onChange={(e) => updateEditor('konten', e.target.value)} placeholder="Isi berita" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                </>}

                {editor.type === 'agenda' && <>
                  <input required value={editor.data.judul} onChange={(e) => updateEditor('judul', e.target.value)} placeholder="Judul agenda" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <div className="grid grid-cols-3 gap-3"><input required type="date" value={editor.data.tanggal} onChange={(e) => updateEditor('tanggal', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.waktu} onChange={(e) => updateEditor('waktu', e.target.value)} placeholder="Waktu" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><select value={editor.data.status} onChange={(e) => updateEditor('status', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Mendatang</option><option>Berlangsung</option><option>Selesai</option></select></div>
                  <input required value={editor.data.lokasi} onChange={(e) => updateEditor('lokasi', e.target.value)} placeholder="Lokasi" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.penyelenggara} onChange={(e) => updateEditor('penyelenggara', e.target.value)} placeholder="Penyelenggara" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><textarea required rows={3} value={editor.data.keterangan} onChange={(e) => updateEditor('keterangan', e.target.value)} placeholder="Keterangan" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                </>}

                {editor.type === 'pengumuman' && <><input required value={editor.data.judul} onChange={(e) => updateEditor('judul', e.target.value)} placeholder="Judul pengumuman" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><select value={editor.data.prioritas} onChange={(e) => updateEditor('prioritas', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Normal</option><option>Penting</option><option>Mendesak</option></select><textarea required rows={5} value={editor.data.isi} onChange={(e) => updateEditor('isi', e.target.value)} placeholder="Isi pengumuman" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></>}

                {editor.type === 'sambutan' && <>
                  <input required value={editor.data.nama} onChange={(e) => updateEditor('nama', e.target.value)} placeholder="Nama kepala desa" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <div className="grid grid-cols-2 gap-3"><input required value={editor.data.jabatan} onChange={(e) => updateEditor('jabatan', e.target.value)} placeholder="Jabatan" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.periode} onChange={(e) => updateEditor('periode', e.target.value)} placeholder="Periode" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
                  <label className="block cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
                    {editorPreview ? <img src={editorPreview} alt="Pratinjau foto sambutan" className="mx-auto max-h-40 rounded-lg object-contain" /> : <><Upload className="mx-auto mb-1 h-6 w-6 text-emerald-600" /><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto sambutan</p><p className="mt-1 text-[11px] text-slate-500">JPG, PNG, atau WebP. Maksimal 2 MB.</p></>}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleEditorFileChange(event.target.files?.[0])} />
                  </label>
                  {editorFile && <p className="text-xs text-slate-500">File: {editorFile.name}</p>}
                  <input required value={editor.data.judul} onChange={(e) => updateEditor('judul', e.target.value)} placeholder="Judul sambutan" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <textarea required rows={2} value={editor.data.salam} onChange={(e) => updateEditor('salam', e.target.value)} placeholder="Salam pembuka" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <textarea required rows={3} value={editor.data.isiPertama} onChange={(e) => updateEditor('isiPertama', e.target.value)} placeholder="Isi sambutan bagian 1" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <textarea rows={3} value={editor.data.isiKedua} onChange={(e) => updateEditor('isiKedua', e.target.value)} placeholder="Isi sambutan bagian 2" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <textarea required rows={2} value={editor.data.visi} onChange={(e) => updateEditor('visi', e.target.value)} placeholder="Visi desa" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                </>}

                {editor.type === 'penduduk' && <><div className="grid grid-cols-2 gap-3"><input required value={editor.data.nik} onChange={(e) => updateEditor('nik', e.target.value)} placeholder="NIK" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.nama} onChange={(e) => updateEditor('nama', e.target.value)} placeholder="Nama lengkap" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><div className="grid grid-cols-3 gap-3"><select value={editor.data.jenisKelamin} onChange={(e) => updateEditor('jenisKelamin', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Laki-laki</option><option>Perempuan</option></select><input required value={editor.data.tempatLahir} onChange={(e) => updateEditor('tempatLahir', e.target.value)} placeholder="Tempat lahir" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required type="date" value={editor.data.tanggalLahir} onChange={(e) => updateEditor('tanggalLahir', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><div className="grid grid-cols-3 gap-3"><input required value={editor.data.dusun} onChange={(e) => updateEditor('dusun', e.target.value)} placeholder="Dusun" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.rt} onChange={(e) => updateEditor('rt', e.target.value)} placeholder="RT" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.rw} onChange={(e) => updateEditor('rw', e.target.value)} placeholder="RW" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><div className="grid grid-cols-2 gap-3"><input required value={editor.data.pendidikan} onChange={(e) => updateEditor('pendidikan', e.target.value)} placeholder="Pendidikan" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.pekerjaan} onChange={(e) => updateEditor('pekerjaan', e.target.value)} placeholder="Pekerjaan" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div></>}

                {editor.type === 'potensi' && <><input required value={editor.data.nama} onChange={(e) => updateEditor('nama', e.target.value)} placeholder="Nama potensi atau UMKM" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><div className="grid grid-cols-2 gap-3"><select value={editor.data.kategori} onChange={(e) => updateEditor('kategori', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>UMKM</option><option>Pertanian</option><option>Wisata</option><option>Peternakan</option></select><input required value={editor.data.lokasi} onChange={(e) => updateEditor('lokasi', e.target.value)} placeholder="Lokasi" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><div className="grid grid-cols-2 gap-3"><input value={editor.data.pemilik} onChange={(e) => updateEditor('pemilik', e.target.value)} placeholder="Pemilik / pengelola" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input value={editor.data.kontakWA} onChange={(e) => updateEditor('kontakWA', e.target.value)} placeholder="Nomor WhatsApp" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><input value={editor.data.hargaRange} onChange={(e) => updateEditor('hargaRange', e.target.value)} placeholder="Harga / kapasitas / info usaha" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><label className="block cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">{editorPreview ? <img src={editorPreview} alt="Pratinjau foto potensi" className="mx-auto max-h-36 rounded-lg object-contain" /> : <><Upload className="mx-auto mb-1 h-6 w-6 text-emerald-600" /><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto potensi / UMKM</p><p className="mt-1 text-[11px] text-slate-500">JPG, PNG, atau WebP. Maksimal 2 MB.</p></>}<input required={!editor.data.gambar} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleEditorFileChange(event.target.files?.[0])} /></label>{editorFile && <p className="text-xs text-slate-500">File: {editorFile.name}</p>}<textarea required rows={3} value={editor.data.deskripsi} onChange={(e) => updateEditor('deskripsi', e.target.value)} placeholder="Deskripsi" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></>}

                {editor.type === 'bumdes' && <>
                  <input required value={editor.data.nama} onChange={(e) => updateEditor('nama', e.target.value)} placeholder="Nama produk atau unit usaha BUMDesa" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  <div className="grid grid-cols-2 gap-3"><input required value={editor.data.jenis_usaha} onChange={(e) => updateEditor('jenis_usaha', e.target.value)} placeholder="Jenis usaha / kategori" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.alamat} onChange={(e) => updateEditor('alamat', e.target.value)} placeholder="Lokasi" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
                  <div className="grid grid-cols-2 gap-3"><input required value={editor.data.pemilik} onChange={(e) => updateEditor('pemilik', e.target.value)} placeholder="Pemilik / pengelola" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.kontak} onChange={(e) => updateEditor('kontak', e.target.value)} placeholder="Nomor WhatsApp" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
                  <div className="grid grid-cols-2 gap-3"><input type="number" step="any" value={editor.data.latitude} onChange={(e) => updateEditor('latitude', e.target.value)} placeholder="Latitude GPS (opsional)" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input type="number" step="any" value={editor.data.longitude} onChange={(e) => updateEditor('longitude', e.target.value)} placeholder="Longitude GPS (opsional)" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>
                  <label className="block cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">{editorPreview ? <img src={editorPreview} alt="Pratinjau foto BUMDesa" className="mx-auto max-h-36 rounded-lg object-contain" /> : <><Upload className="mx-auto mb-1 h-6 w-6 text-emerald-600" /><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto BUMDesa</p><p className="mt-1 text-[11px] text-slate-500">JPG, PNG, atau WebP. Maksimal 2 MB.</p></>}<input required={!editor.data.gambar} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleEditorFileChange(event.target.files?.[0])} /></label>
                  {editorFile && <p className="text-xs text-slate-500">File: {editorFile.name}</p>}
                  <textarea required rows={3} value={editor.data.deskripsi} onChange={(e) => updateEditor('deskripsi', e.target.value)} placeholder="Deskripsi produk atau unit usaha" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" />
                </>}

                {editor.type === 'apbdes' && <div className="grid grid-cols-2 gap-3"><input required type="number" value={editor.data.tahun} onChange={(e) => updateEditor('tahun', e.target.value)} placeholder="Tahun" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><select value={editor.data.kategori} onChange={(e) => updateEditor('kategori', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Pendapatan</option><option>Belanja</option><option>Pembiayaan</option></select><input required value={editor.data.subKategori} onChange={(e) => updateEditor('subKategori', e.target.value)} placeholder="Uraian pos APBDes" className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required min="0" type="number" value={editor.data.anggaran} onChange={(e) => updateEditor('anggaran', e.target.value)} placeholder="Anggaran" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required min="0" type="number" value={editor.data.realisasi} onChange={(e) => updateEditor('realisasi', e.target.value)} placeholder="Realisasi" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>}

                {editor.type === 'rpjm' && <div className="space-y-3"><input required value={editor.data.program} onChange={(e) => updateEditor('program', e.target.value)} placeholder="Nama program RPJM" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><div className="grid grid-cols-2 gap-3"><input required value={editor.data.bidang} onChange={(e) => updateEditor('bidang', e.target.value)} placeholder="Bidang" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required min="0" type="number" value={editor.data.biaya} onChange={(e) => updateEditor('biaya', e.target.value)} placeholder="Prakiraan biaya" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><textarea required rows={3} value={editor.data.status} onChange={(e) => updateEditor('status', e.target.value)} placeholder="Status atau target pelaksanaan" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div>}

                {editor.type === 'perangkat' && <><div className="grid grid-cols-2 gap-3"><input required value={editor.data.nama} onChange={(e) => updateEditor('nama', e.target.value)} placeholder="Nama lengkap" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.jabatan} onChange={(e) => updateEditor('jabatan', e.target.value)} placeholder="Jabatan" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><div className="grid grid-cols-2 gap-3"><select value={editor.data.kategori} onChange={(e) => updateEditor('kategori', e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Pemerintah Desa</option><option>BPD</option><option>LPM</option><option>Karang Taruna</option><option>PKK</option></select><input value={editor.data.telepon} onChange={(e) => updateEditor('telepon', e.target.value)} placeholder="Nomor telepon" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /></div><input value={editor.data.nipd} onChange={(e) => updateEditor('nipd', e.target.value)} placeholder="NIPD / NIK (opsional)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><input required value={editor.data.pendidikan} onChange={(e) => updateEditor('pendidikan', e.target.value)} placeholder="Pendidikan terakhir" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800" /><label className="block cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950/30">{editorPreview ? <img src={editorPreview} alt="Pratinjau foto perangkat" className="mx-auto max-h-36 rounded-lg object-contain" /> : <><Upload className="mx-auto mb-1 h-6 w-6 text-emerald-600" /><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Pilih foto anggota</p><p className="mt-1 text-[11px] text-slate-500">JPG, PNG, atau WebP. Maksimal 2 MB.</p></>}<input required={!editor.data.foto} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleEditorFileChange(event.target.files?.[0])} /></label></>}

                <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setEditor(null)} disabled={isSavingEditor} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300">Batal</button><button type="submit" disabled={isSavingEditor} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">{isSavingEditor ? 'Menyimpan...' : 'Simpan Data'}</button></div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
