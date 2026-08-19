import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { Lock, Mail, ShieldAlert, UserCheck, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, resetPassword } = useApp();
  const [email, setEmail] = useState('dkebonratu@gmail.com');
  const [password, setPassword] = useState('kebonratu123');
  const [selectedRole, setSelectedRole] = useState<Role>('operator');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password, selectedRole);
    setIsSubmitting(false);
    if (success) onClose();
  };

  const handleQuickPreset = (roleType: Role) => {
    setSelectedRole(roleType);
    if (roleType === 'admin') {
      setEmail('dkebonratu@gmail.com');
      setPassword('kebonratu123');
      return;
    }
    setEmail('operator@kebonratu.desa');
    setPassword('kebonratu123');
  };

  const handlePasswordReset = async () => {
    if (email) await resetPassword(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Lock className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Portal Administrasi Desa</h3>
              <p className="text-xs text-emerald-200">Desa Kebonratu • Kec. Lebakwangi</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-slate-800 dark:text-slate-100">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <UserCheck className="mr-1.5 inline h-4 w-4" />
            Masuk sebagai Operator Desa
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Email Pengguna
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 p-3 rounded-xl text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            💡 <strong>Preset Demo:</strong> Klik tombol role di atas untuk mengisi kredensial siap pakai. Bebas digunakan untuk simulasi dashboard admin.
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all"
            >
              {isSubmitting ? 'Memproses...' : 'Masuk Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
