import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import {
  Search,
  Moon,
  Sun,
  UserCheck,
  LogOut,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  SlidersHorizontal,
} from 'lucide-react';
import { PROFIL_DESA_DATA } from '../../data/initialData';
import logoDesa from '../../assets/images/logo.png';
import logoKebonratuGo from '../../assets/images/kebonratu-go-logo.jpeg';

interface NavbarProps {
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const {
    activePage,
    setActivePage,
    darkMode,
    toggleDarkMode,
    user,
    logout,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isHome = activePage === 'beranda';

  useEffect(() => {
    const updateNavbar = () => setHasScrolled(window.scrollY > 80);
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Desa' },
    { id: 'bumdesa-umkm', label: 'BUMDesa & UMKM' },
    { id: 'pemerintahan', label: 'Pemerintahan' },
    { id: 'data-desa', label: 'Data & Infografis' },
    { id: 'berita', label: 'Berita' },
    { id: 'potensi', label: 'Potensi & UMKM' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'transparansi', label: 'Transparansi APBDes' },
    { id: 'kontak', label: 'Kontak' }
  ];

  // On wide screens every page is visible.  The compact menu is retained for
  // laptops where showing all links would make the header wrap.
  const primaryNavItems = navItems.slice(0, 6);
  const moreNavItems = navItems.slice(6);

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setMoreMenuOpen(false);
  };

  return (
    <header className={`z-40 transition-colors duration-300 ${isHome ? `fixed inset-x-0 top-0 text-white ${hasScrolled ? 'bg-emerald-800 shadow-md' : 'bg-transparent'}` : 'sticky top-0 bg-white/95 dark:bg-slate-900/95 border-b border-emerald-100 dark:border-slate-800 shadow-sm'}`}>
      {/* Top Bar Informasi */}
      <div className="hidden" aria-hidden="true">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              📍 {PROFIL_DESA_DATA.nama}, {PROFIL_DESA_DATA.kecamatan}, Serang, Banten
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-200">
              <PhoneCall className="w-3 h-3" /> Jam Pelayanan: Senin - Jumat (07.30 - 16.00 WIB)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={() => handleNavClick('admin')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Dashboard Operator
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('beranda')}
          className="flex shrink-0 items-center gap-3 text-left focus:outline-none group"
        >
          <div className="hidden h-[76px] w-[292px] overflow-hidden sm:block">
            <img src={logoKebonratuGo} alt="KEBONRATU GO — Platform Digital Desa Kebonratu" className="relative left-[-84px] top-[-108px] w-[461px] max-w-none transition-transform group-hover:scale-[1.02]" />
          </div>
          <div className="h-12 w-12 overflow-hidden transition-transform group-hover:scale-105 sm:hidden">
            <img src={logoDesa} alt="Logo Desa Kebonratu" className="h-full w-full scale-150 object-contain" />
          </div>
          <div className="hidden">
            <div className="flex items-center gap-1.5">
              <h1 className={`whitespace-nowrap font-extrabold text-lg leading-tight tracking-tight ${isHome ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                DESA KEBONRATU
              </h1>
            </div>
            <p className={`text-[11px] font-medium ${isHome ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
              Kec. Lebakwangi • Kab. Serang • Banten
            </p>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden 2xl:flex flex-1 items-center justify-center gap-0.5" aria-label="Navigasi utama">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap px-2 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                  isActive
                    ? (isHome ? 'border-b-2 border-white text-white' : 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30')
                    : (isHome ? 'text-white/90 hover:text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400')
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <nav className="hidden lg:flex 2xl:hidden items-center gap-1" aria-label="Navigasi utama">
          {primaryNavItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? (isHome ? 'border-b-2 border-white text-white' : 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30')
                    : (isHome ? 'text-white/90 hover:text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400')
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              aria-expanded={moreMenuOpen}
              className={`flex items-center gap-1 whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                moreNavItems.some((item) => activePage === item.id)
                  ? (isHome ? 'text-white border-b-2 border-white' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400')
                  : (isHome ? 'text-white/90 hover:text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400')
              }`}
            >
              Lainnya
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in">
                {moreNavItems.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Quick Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
            <input
              type="text"
              placeholder="Cari berita / layanan..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'berita' && e.target.value.trim().length > 0) {
                  setActivePage('berita');
                }
              }}
              className={`pl-8 pr-3 py-1.5 text-xs border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 w-36 lg:w-44 focus:w-56 transition-all ${isHome ? 'bg-white/15 border-white/30 text-white placeholder:text-white/70' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white'}`}
            />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            aria-pressed={darkMode}
            title={darkMode ? 'Mode terang' : 'Mode gelap'}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Status / Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1 pl-2.5 pr-2 rounded-full bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 hover:border-emerald-500 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline">
                  Operator
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-scale-up">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>

                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                    Dashboard Kelola
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Keluar Akun
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              aria-label="Login Operator"
              className="flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 dark:bg-emerald-600 sm:px-3 sm:py-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Login Operator</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-h-[calc(100vh-72px)] overflow-y-auto bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-4 space-y-3 shadow-lg animate-fade-in">
          <p className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Menu Navigasi</p>
          <div className="mb-3 pt-1">
            <input
              type="text"
              placeholder="Cari informasi desa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'berita' && e.target.value.trim().length > 0) {
                  setActivePage('berita');
                }
              }}
              className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
