import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { PROFIL_DESA_DATA } from '../../data/initialData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building2,
  CheckCircle2,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const KontakView: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: 'Aspirasi / Pengaduan Warga',
    pesan: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.pesan) {
      addToast('error', 'Mohon lengkapi Nama dan Pesan Pengaduan Anda');
      return;
    }
    if (!supabase) {
      addToast('error', 'Sistem pengaduan belum terhubung ke database.');
      return;
    }
    const { error } = await supabase.from('pengaduan').insert(formData);
    if (error) {
      addToast('error', `Pesan gagal dikirim: ${error.message}`);
      return;
    }
    setSubmitted(true);
    addToast('success', 'Pesan Anda telah berhasil terkirim ke Sekertariat Desa Kebonratu');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner High Density Style */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Pusat Pelayanan & Pengaduan Publik
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Hubungi Kantor Pemerintah Desa Kebonratu
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            Silakan ajukan pertanyaan, saran, aspirasi, maupun pengaduan seputar pelayanan desa. Petugas Sekretariat siap membantu Anda pada jam kerja.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Informational Cards & Direct Links (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Building2 className="w-5 h-5 text-emerald-600" />
              Alamat & Sekretariat Kantor Desa
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Alamat Lengkap</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    {PROFIL_DESA_DATA.alamat}, Kode Pos {PROFIL_DESA_DATA.kodePos}, {PROFIL_DESA_DATA.kecamatan}, {PROFIL_DESA_DATA.kabupaten}, {PROFIL_DESA_DATA.provinsi}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Telepon Sekretariat</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">{PROFIL_DESA_DATA.telepon}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Resmi</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">{PROFIL_DESA_DATA.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Jam Operasional Pelayanan</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                    Senin - Jumat : 08.00 - 15.00 WIB
                  </p>
                  <p className="text-[11px] text-slate-400">Sabtu, Minggu & Hari Libur Nasional : Tutup</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/62${PROFIL_DESA_DATA.whatsapp.substring(1)}?text=${encodeURIComponent('Halo Admin Desa Kebonratu, saya ingin bertanya seputar...')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Langsung WhatsApp Layanan Desa</span>
              </a>
            </div>
          </div>

          {/* Interactive Simulated Map */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Peta Lokasi Balai Desa Kebonratu
            </h3>
            <div className="relative h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <iframe
                title="Google Maps Desa Kebonratu"
                src="https://www.google.com/maps?q=-6.0946006,106.2610404&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/p7CwXCZCh7H5jsth8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>
        </div>

        {/* Form Pengaduan / Kontak (Col 7) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                Formulir Aspirasi & Pengaduan Warga
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Kirimkan masukan atau pertanyaan langsung ke sistem Sekretariat Desa Kebonratu
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Pesan Anda Berhasil Terkirim!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Terima kasih atas aspirasi dan partisipasi Anda. Tim administrasi Desa Kebonratu akan menindaklanjuti pesan Anda secepatnya.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nama: '',
                      email: '',
                      telepon: '',
                      subjek: 'Aspirasi / Pengaduan Warga',
                      pesan: ''
                    });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nomor Handphone / WA
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 08123456789"
                      value={formData.telepon}
                      onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Kategori Pesan
                    </label>
                    <select
                      value={formData.subjek}
                      onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    >
                      <option value="Aspirasi / Pengaduan Warga">Aspirasi / Pengaduan Warga</option>
                      <option value="Informasi Bantuan Sosial">Informasi Bantuan Sosial</option>
                      <option value="Permohonan Informasi Publik">Permohonan Informasi Publik</option>
                      <option value="Kerjasama & Kerajinan UMKM">Kerjasama & UMKM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Isi Pesan / Pengaduan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tuliskan isi pesan atau pengaduan secara lengkap dan jelas..."
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kerahasiaan data pengirim dijamin sesuai ketentuan keterbukaan informasi publik.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Pengaduan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
