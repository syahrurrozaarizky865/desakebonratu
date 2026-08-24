import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageId,
  Role,
  User,
  Berita,
  Agenda,
  Pengumuman,
  PerangkatDesa,
  GaleriItem,
  PotensiItem,
  SuratRequest,
  PendudukItem,
  APBDesItem,
  RPJMItem,
  RKPDesItem,
  BumdesItem,
  SambutanKepalaDesa,
  HeroSlideConfig,
  ToastMessage
} from '../types';
import { HERO_IMAGE, PROGRAM_RPJM_TERLAKSANA } from '../data/initialData';
import { supabase } from '../lib/supabase';

// Production starts empty: all published content comes from Supabase.
const EMPTY_SAMBUTAN: SambutanKepalaDesa = {
  id: 'utama', nama: '', jabatan: '', periode: '', foto: '', judul: '', salam: '', isiPertama: '', isiKedua: '', visi: ''
};

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  role: Role;
  user: User | null;
  login: (email: string, password: string, role: Role) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Data State
  beritaList: Berita[];
  agendaList: Agenda[];
  pengumumanList: Pengumuman[];
  perangkatList: PerangkatDesa[];
  galeriList: GaleriItem[];
  potensiList: PotensiItem[];
  bumdesList: BumdesItem[];
  suratList: SuratRequest[];
  pendudukList: PendudukItem[];
  apbdesList: APBDesItem[];
  rpjmList: RPJMItem[];
  rkpdesList: RKPDesItem[];
  sambutan: SambutanKepalaDesa;
  heroSettings: HeroSlideConfig;

  // Selected item modal state helpers
  selectedBerita: Berita | null;
  setSelectedBerita: (b: Berita | null) => void;

  // CRUD handlers
  addBerita: (b: Omit<Berita, 'id' | 'dibaca'>) => void;
  updateBerita: (b: Berita) => void;
  deleteBerita: (id: string) => void;

  addAgenda: (a: Omit<Agenda, 'id'>) => void;
  updateAgenda: (a: Agenda) => void;
  deleteAgenda: (id: string) => void;

  addPengumuman: (p: Omit<Pengumuman, 'id'>) => void;
  updatePengumuman: (p: Pengumuman) => void;
  deletePengumuman: (id: string) => void;

  addGaleri: (g: Omit<GaleriItem, 'id'>) => void;
  updateGaleri: (g: GaleriItem) => void;
  deleteGaleri: (id: string) => void;

  addPotensi: (p: Omit<PotensiItem, 'id'>) => void;
  updatePotensi: (p: PotensiItem) => void;
  deletePotensi: (id: string) => void;

  addBumdes: (item: Omit<BumdesItem, 'id'>) => Promise<boolean>;
  updateBumdes: (item: BumdesItem) => Promise<boolean>;
  deleteBumdes: (id: string) => Promise<boolean>;

  addPenduduk: (p: Omit<PendudukItem, 'id'>) => void;
  updatePenduduk: (p: PendudukItem) => void;
  deletePenduduk: (id: string) => void;

  addAPBDes: (a: Omit<APBDesItem, 'id'>) => void;
  updateAPBDes: (a: APBDesItem) => void;
  deleteAPBDes: (id: string) => void;
  addRPJM: (item: Omit<RPJMItem, 'id'>) => Promise<boolean>;
  updateRPJM: (item: RPJMItem) => Promise<boolean>;
  deleteRPJM: (id: string) => Promise<boolean>;
  addRKPDes: (item: Omit<RKPDesItem, 'id'>) => void;
  updateRKPDes: (item: RKPDesItem) => void;
  deleteRKPDes: (id: string) => void;

  addPerangkat: (p: Omit<PerangkatDesa, 'id'>) => void;
  updatePerangkat: (p: PerangkatDesa) => void;
  deletePerangkat: (id: string) => void;
  updateSambutan: (s: SambutanKepalaDesa) => void;
  updateHeroSettings: (settings: HeroSlideConfig) => void;

  // Surat requests
  createSuratRequest: (req: Omit<SuratRequest, 'id' | 'status' | 'tanggalPengajuan'>) => Promise<string>;
  updateSuratStatus: (id: string, status: SuratRequest['status'], catatan?: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_HERO_SETTINGS: HeroSlideConfig = {
  badge: 'KEBONRATU GO — PLATFORM DIGITAL DESA',
  title: 'Informasi desa, layanan warga, dan produk lokal dalam satu platform',
  subtitle: 'Menghubungkan Profil Desa, BUMDesa, UMKM, katalog produk lokal, berita kegiatan, dan layanan informasi Desa Kebonratu.',
  image: HERO_IMAGE,
  buttonText: 'Berita terbaru'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageId>('beranda');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [role, setRole] = useState<Role>('guest');
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);

  // Lists
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([]);
  const [perangkatList, setPerangkatList] = useState<PerangkatDesa[]>([]);
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([]);
  const [potensiList, setPotensiList] = useState<PotensiItem[]>([]);
  const [bumdesList, setBumdesList] = useState<BumdesItem[]>([]);
  const [suratList, setSuratList] = useState<SuratRequest[]>([]);
  const [pendudukList, setPendudukList] = useState<PendudukItem[]>([]);
  const [apbdesList, setApbdesList] = useState<APBDesItem[]>([]);
  const [rpjmList, setRpjmList] = useState<RPJMItem[]>(() => supabase ? [] : PROGRAM_RPJM_TERLAKSANA);
  const [rkpdesList, setRkpdesList] = useState<RKPDesItem[]>([]);
  const [sambutan, setSambutan] = useState<SambutanKepalaDesa>(EMPTY_SAMBUTAN);
  const [heroSettings, setHeroSettings] = useState<HeroSlideConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_HERO_SETTINGS;
    try {
      const saved = window.localStorage.getItem('kebonratu-hero-settings');
      if (!saved) return DEFAULT_HERO_SETTINGS;
      const parsed = JSON.parse(saved) as HeroSlideConfig;
      // Upgrade the old factory copy while preserving administrator-made edits.
      if (parsed.badge === 'PEMERINTAH DESA KEBONRATU' && parsed.title === 'Kabar dan layanan warga Desa Kebonratu') {
        return { ...DEFAULT_HERO_SETTINGS, image: parsed.image || HERO_IMAGE };
      }
      return { ...DEFAULT_HERO_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_HERO_SETTINGS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('kebonratu-hero-settings', JSON.stringify(heroSettings));
    }
  }, [heroSettings]);

  const setActivePage = (page: PageId) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = async (email: string, password: string, userRole: Role) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        addToast('error', error?.message || 'Login gagal.');
        return false;
      }
      const { data: profile } = await supabase.from('profiles').select('name, role, avatar').eq('id', data.user.id).maybeSingle();
      const databaseRole = profile?.role === 'admin' ? 'admin' : 'operator';
      setRole(databaseRole);
      setUser({ id: data.user.id, name: profile?.name || data.user.email?.split('@')[0] || 'Petugas Desa', email: data.user.email || email, role: databaseRole, avatar: profile?.avatar || undefined });
      const { data: suratData } = await supabase.from('surat_requests').select('*');
      if (suratData) setSuratList(suratData);
      if (databaseRole === 'admin') {
        const { data: pendudukData } = await supabase.from('penduduk').select('*');
        if (pendudukData) setPendudukList(pendudukData);
      }
      addToast('success', 'Berhasil masuk ke dashboard');
      return true;
    }
    setRole(userRole);
    setUser({
      id: 'u-admin-1',
      name: userRole === 'admin' ? 'Administrator Desa' : 'Operator Layanan Desa',
      email,
      role: userRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
    addToast('success', `Berhasil login sebagai ${userRole === 'admin' ? 'Administrator' : 'Operator'}`);
    return true;
  };

  const logout = () => {
    void supabase?.auth.signOut();
    setRole('guest');
    setUser(null);
    if (activePage === 'admin') {
      setActivePage('beranda');
    }
    addToast('info', 'Anda telah keluar dari akun');
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung.');
      return false;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    if (error) {
      addToast('error', error.message);
      return false;
    }
    addToast('success', 'Tautan pengaturan ulang kata sandi telah dikirim ke email Anda.');
    return true;
  };

  useEffect(() => {
    if (!supabase) return;
    const load = async () => {
      const tables: Array<[string, React.Dispatch<React.SetStateAction<any[]>>]> = [
        ['berita', setBeritaList], ['agenda', setAgendaList], ['pengumuman', setPengumumanList],
        ['perangkat_desa', setPerangkatList], ['galeri', setGaleriList], ['potensi', setPotensiList], ['bumdes', setBumdesList],
        ['surat_requests', setSuratList], ['penduduk', setPendudukList], ['apbdes', setApbdesList], ['rpjm_program', setRpjmList], ['rkpdes_kegiatan', setRkpdesList]
      ];
      await Promise.all(tables.map(async ([table, setData]) => {
        const { data, error } = await supabase.from(table).select('*');
        if (!error) setData(data ?? []);
      }));
      const { data: sambutanData } = await supabase.from('sambutan_kepala_desa').select('*').eq('id', 'utama').maybeSingle();
      if (sambutanData) setSambutan(sambutanData as SambutanKepalaDesa);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase.from('profiles').select('name, role, avatar').eq('id', session.user.id).maybeSingle();
        const databaseRole = profile?.role === 'admin' ? 'admin' : 'operator';
        setRole(databaseRole);
        setUser({ id: session.user.id, name: profile?.name || 'Petugas Desa', email: session.user.email || '', role: databaseRole, avatar: profile?.avatar || undefined });
      }
    };
    void load();

    // Updates data shown on every open browser without requiring a refresh.
    const channel = supabase
      .channel('desa-kebonratu-data')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'berita' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agenda' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pengumuman' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'perangkat_desa' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'galeri' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'potensi' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bumdes' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'surat_requests' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'penduduk' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'apbdes' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rpjm_program' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rkpdes_kegiatan' }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sambutan_kepala_desa' }, () => void load())
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const reportDatabaseError = (error: { message: string } | null) => {
    if (error) addToast('error', `Database: ${error.message}`);
  };

  // CRUD Handlers
  const addBerita = (item: Omit<Berita, 'id' | 'dibaca'>) => {
    const newB: Berita = {
      ...item,
      id: 'b-' + Date.now(),
      dibaca: 1
    };
    setBeritaList([newB, ...beritaList]);
    if (supabase) void supabase.from('berita').insert(newB).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Berita berhasil diterbitkan');
  };

  const updateBerita = (item: Berita) => {
    setBeritaList(beritaList.map((b) => (b.id === item.id ? item : b)));
    if (supabase) void supabase.from('berita').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Berita berhasil diperbarui');
  };

  const deleteBerita = (id: string) => {
    setBeritaList(beritaList.filter((b) => b.id !== id));
    if (supabase) void supabase.from('berita').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Berita berhasil dihapus');
  };

  const addAgenda = (item: Omit<Agenda, 'id'>) => {
    const newA: Agenda = { ...item, id: 'a-' + Date.now() };
    setAgendaList([newA, ...agendaList]);
    if (supabase) void supabase.from('agenda').insert(newA).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Agenda berhasil ditambahkan');
  };

  const updateAgenda = (item: Agenda) => {
    setAgendaList(agendaList.map((a) => (a.id === item.id ? item : a)));
    if (supabase) void supabase.from('agenda').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Agenda berhasil diperbarui');
  };

  const deleteAgenda = (id: string) => {
    setAgendaList(agendaList.filter((a) => a.id !== id));
    if (supabase) void supabase.from('agenda').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Agenda dihapus');
  };

  const addPengumuman = (item: Omit<Pengumuman, 'id'>) => {
    const newP: Pengumuman = { ...item, id: 'p-' + Date.now() };
    setPengumumanList([newP, ...pengumumanList]);
    if (supabase) void supabase.from('pengumuman').insert(newP).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Pengumuman berhasil dipublikasikan');
  };

  const updatePengumuman = (item: Pengumuman) => {
    setPengumumanList(pengumumanList.map((p) => (p.id === item.id ? item : p)));
    if (supabase) void supabase.from('pengumuman').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Pengumuman diperbarui');
  };

  const deletePengumuman = (id: string) => {
    setPengumumanList(pengumumanList.filter((p) => p.id !== id));
    if (supabase) void supabase.from('pengumuman').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Pengumuman dihapus');
  };

  const addGaleri = (item: Omit<GaleriItem, 'id'>) => {
    const newG: GaleriItem = { ...item, id: 'g-' + Date.now() };
    setGaleriList([newG, ...galeriList]);
    if (supabase) void supabase.from('galeri').insert(newG).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Media galeri ditambahkan');
  };

  const updateGaleri = (item: GaleriItem) => {
    setGaleriList(galeriList.map((g) => (g.id === item.id ? item : g)));
    if (supabase) void supabase.from('galeri').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Media galeri diperbarui');
  };

  const deleteGaleri = (id: string) => {
    setGaleriList(galeriList.filter((g) => g.id !== id));
    if (supabase) void supabase.from('galeri').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Item galeri dihapus');
  };

  const addPotensi = (item: Omit<PotensiItem, 'id'>) => {
    const newPot: PotensiItem = { ...item, id: 'pot-' + Date.now() };
    setPotensiList([newPot, ...potensiList]);
    if (supabase) void supabase.from('potensi').insert(newPot).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Data potensi desa berhasil disimpan');
  };

  const updatePotensi = (item: PotensiItem) => {
    setPotensiList(potensiList.map((p) => (p.id === item.id ? item : p)));
    if (supabase) void supabase.from('potensi').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Potensi desa diperbarui');
  };

  const deletePotensi = (id: string) => {
    setPotensiList(potensiList.filter((p) => p.id !== id));
    if (supabase) void supabase.from('potensi').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Potensi desa dihapus');
  };

  const addBumdes = async (item: Omit<BumdesItem, 'id'>) => {
    const newItem: BumdesItem = { ...item, id: 'bumdes-' + Date.now() };
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Data BUMDes tidak dapat disimpan.');
      return false;
    }
    const { error } = await supabase.from('bumdes').insert(newItem);
    if (error) {
      reportDatabaseError(error);
      return false;
    }
    setBumdesList((current) => [newItem, ...current]);
    addToast('success', 'Data BUMDes berhasil ditambahkan');
    return true;
  };

  const updateBumdes = async (item: BumdesItem) => {
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Perubahan BUMDes tidak dapat disimpan.');
      return false;
    }
    const { error } = await supabase.from('bumdes').update(item).eq('id', item.id);
    if (error) {
      reportDatabaseError(error);
      return false;
    }
    setBumdesList((current) => current.map((entry) => entry.id === item.id ? item : entry));
    addToast('success', 'Data BUMDes berhasil diperbarui');
    return true;
  };

  const deleteBumdes = async (id: string) => {
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Data BUMDes tidak dapat dihapus.');
      return false;
    }
    const { error } = await supabase.from('bumdes').delete().eq('id', id);
    if (error) {
      reportDatabaseError(error);
      return false;
    }
    setBumdesList((current) => current.filter((entry) => entry.id !== id));
    addToast('info', 'Data BUMDes berhasil dihapus');
    return true;
  };

  const addPenduduk = (item: Omit<PendudukItem, 'id'>) => {
    const newPend: PendudukItem = { ...item, id: 'pend-' + Date.now() };
    setPendudukList([newPend, ...pendudukList]);
    if (supabase) void supabase.from('penduduk').insert(newPend).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Data penduduk berhasil ditambahkan');
  };

  const updatePenduduk = (item: PendudukItem) => {
    setPendudukList(pendudukList.map((p) => (p.id === item.id ? item : p)));
    if (supabase) void supabase.from('penduduk').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Data penduduk diperbarui');
  };

  const deletePenduduk = (id: string) => {
    setPendudukList(pendudukList.filter((p) => p.id !== id));
    if (supabase) void supabase.from('penduduk').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Data penduduk dihapus');
  };

  const addAPBDes = (item: Omit<APBDesItem, 'id'>) => {
    const newApb: APBDesItem = { ...item, id: 'apb-' + Date.now() };
    setApbdesList([...apbdesList, newApb]);
    if (supabase) void supabase.from('apbdes').insert(newApb).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Item APBDes ditambahkan');
  };

  const updateAPBDes = (item: APBDesItem) => {
    setApbdesList(apbdesList.map((a) => (a.id === item.id ? item : a)));
    if (supabase) void supabase.from('apbdes').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Item APBDes diperbarui');
  };

  const deleteAPBDes = (id: string) => {
    setApbdesList(apbdesList.filter((a) => a.id !== id));
    if (supabase) void supabase.from('apbdes').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Item APBDes dihapus');
  };

  const addRPJM = async (item: Omit<RPJMItem, 'id'>) => {
    const newItem: RPJMItem = { ...item, id: 'rpjm-' + Date.now() };
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Program RPJM tidak dapat disimpan.');
      return false;
    }
    const { error } = await supabase.from('rpjm_program').insert(newItem);
    if (error) {
      reportDatabaseError(error);
      return false;
    }
    setRpjmList((current) => [...current, newItem]);
    addToast('success', 'Program RPJM ditambahkan');
    return true;
  };

  const updateRPJM = async (item: RPJMItem) => {
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Perubahan program RPJM tidak dapat disimpan.');
      return false;
    }
    const { error } = await supabase.from('rpjm_program').update(item).eq('id', item.id);
    if (error) {
      reportDatabaseError(error);
      return false;
    }
    setRpjmList((current) => current.map((entry) => entry.id === item.id ? item : entry));
    addToast('success', 'Program RPJM diperbarui');
    return true;
  };

  const deleteRPJM = async (id: string) => {
    if (!supabase) {
      addToast('error', 'Supabase belum terhubung. Program RPJM tidak dapat dihapus.');
      return false;
    }
    const { error } = await supabase.from('rpjm_program').delete().eq('id', id);
    if (error) {
      reportDatabaseError(error);
      return false;
    }
    setRpjmList((current) => current.filter((entry) => entry.id !== id));
    addToast('info', 'Program RPJM dihapus');
    return true;
  };

  const addRKPDes = (item: Omit<RKPDesItem, 'id'>) => {
    const newItem: RKPDesItem = { ...item, id: 'rkpdes-' + Date.now() };
    setRkpdesList((current) => [...current, newItem]);
    if (supabase) void supabase.from('rkpdes_kegiatan').insert(newItem).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Kegiatan RKPDes ditambahkan');
  };

  const updateRKPDes = (item: RKPDesItem) => {
    setRkpdesList((current) => current.map((entry) => entry.id === item.id ? item : entry));
    if (supabase) void supabase.from('rkpdes_kegiatan').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Kegiatan RKPDes diperbarui');
  };

  const deleteRKPDes = (id: string) => {
    setRkpdesList((current) => current.filter((entry) => entry.id !== id));
    if (supabase) void supabase.from('rkpdes_kegiatan').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Kegiatan RKPDes dihapus');
  };

  const addPerangkat = (item: Omit<PerangkatDesa, 'id'>) => {
    const newItem: PerangkatDesa = { ...item, id: `pd-${Date.now()}` };
    setPerangkatList([...perangkatList, newItem]);
    if (supabase) void supabase.from('perangkat_desa').insert(newItem).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Anggota struktur berhasil ditambahkan');
  };

  const updatePerangkat = (item: PerangkatDesa) => {
    setPerangkatList(perangkatList.map((entry) => entry.id === item.id ? item : entry));
    if (supabase) void supabase.from('perangkat_desa').update(item).eq('id', item.id).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Data struktur berhasil diperbarui');
  };

  const deletePerangkat = (id: string) => {
    setPerangkatList(perangkatList.filter((entry) => entry.id !== id));
    if (supabase) void supabase.from('perangkat_desa').delete().eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('info', 'Anggota struktur dihapus');
  };

  const updateSambutan = (item: SambutanKepalaDesa) => {
    setSambutan(item);
    if (supabase) void supabase.from('sambutan_kepala_desa').upsert(item).then(({ error }) => reportDatabaseError(error));
    addToast('success', 'Sambutan kepala desa berhasil diperbarui');
  };

  const updateHeroSettings = (item: HeroSlideConfig) => {
    setHeroSettings(item);
  };

  const createSuratRequest = async (req: Omit<SuratRequest, 'id' | 'status' | 'tanggalPengajuan'>) => {
    if (supabase) {
      const { data, error } = await supabase.rpc('create_surat_request', {
        p_nik: req.nik, p_nama_lengkap: req.namaLengkap, p_no_hp: req.noHp,
        p_rt: req.rt, p_rw: req.rw, p_dusun: req.dusun, p_jenis_surat: req.jenisSurat,
        p_keperluan: req.keperluan, p_dokumen_syarat: req.dokumenSyarat || null
      });
      if (error || !data) {
        reportDatabaseError(error);
        return '';
      }
      addToast('success', `Pengajuan surat berhasil dikirim! Kode Tracking: ${data}`);
      return data;
    }

    const trackingCode = `KR-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newReq: SuratRequest = {
      ...req,
      id: trackingCode,
      status: 'Menunggu Verifikasi',
      tanggalPengajuan: todayStr
    };

    setSuratList([newReq, ...suratList]);
    addToast('success', `Pengajuan surat berhasil dikirim! Kode Tracking: ${trackingCode}`);
    return trackingCode;
  };

  const updateSuratStatus = (id: string, status: SuratRequest['status'], catatan?: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setSuratList(
      suratList.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status,
            catatanPetugas: catatan || s.catatanPetugas,
            tanggalSelesai: status === 'Selesai' || status === 'Disetujui' ? todayStr : s.tanggalSelesai
          };
        }
        return s;
      })
    );
    if (supabase) void supabase.from('surat_requests').update({ status, catatanPetugas: catatan, tanggalSelesai: status === 'Selesai' || status === 'Disetujui' ? todayStr : undefined }).eq('id', id).then(({ error }) => reportDatabaseError(error));
    addToast('success', `Status surat #${id} diubah menjadi ${status}`);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        darkMode,
        toggleDarkMode,
        role,
        user,
        login,
        resetPassword,
        logout,
        searchQuery,
        setSearchQuery,
        beritaList,
        agendaList,
        pengumumanList,
        perangkatList,
        galeriList,
        potensiList,
        bumdesList,
        suratList,
        pendudukList,
        apbdesList,
        rpjmList,
        rkpdesList,
        sambutan,
        heroSettings,
        selectedBerita,
        setSelectedBerita,
        addBerita,
        updateBerita,
        deleteBerita,
        addAgenda,
        updateAgenda,
        deleteAgenda,
        addPengumuman,
        updatePengumuman,
        deletePengumuman,
        addGaleri,
        updateGaleri,
        deleteGaleri,
        addPotensi,
        updatePotensi,
        deletePotensi,
        addBumdes,
        updateBumdes,
        deleteBumdes,
        addPenduduk,
        updatePenduduk,
        deletePenduduk,
        addAPBDes,
        updateAPBDes,
        deleteAPBDes,
        addRPJM,
        updateRPJM,
        deleteRPJM,
        addRKPDes,
        updateRKPDes,
        deleteRKPDes,
        addPerangkat,
        updatePerangkat,
        deletePerangkat,
        updateSambutan,
        updateHeroSettings,
        createSuratRequest,
        updateSuratStatus,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
