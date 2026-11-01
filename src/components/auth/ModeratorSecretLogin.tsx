import React, { useState } from 'react';
import { Shield, AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { storageService } from '../../services/storage';
import { User } from '../../types/database';

interface ModeratorSecretLoginProps {
  onSuccess: (user: User) => void;
  onCancel: () => void;
}

export const ModeratorSecretLogin: React.FC<ModeratorSecretLoginProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    const res = storageService.loginModerator(username, password);
    setIsLoading(false);

    if (res.success && res.user) {
      onSuccess(res.user);
    } else {
      // SECURITY RULE: Never leak default credentials in error message or UI
      setErrorMsg('Username atau Password salah.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        {/* Top Restricted Badge */}
        <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white space-y-2 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 dark:bg-slate-900 text-sky-400 text-2xs font-mono font-bold tracking-wider uppercase border border-slate-700 dark:border-slate-800">
              <Lock className="w-3 h-3" />
              <span>Akses Khusus Pengelola</span>
            </div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5 pt-2">
            <img
              src="/OIKONOMIA.png"
              alt="Logo"
              className="w-7 h-7 rounded object-contain bg-white p-0.5"
            />
            <span>Login Moderator</span>
          </h1>
          <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
            Halaman masuk terisolasi untuk mengelola konten dan kurikulum Oikonomia.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Username
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Masukkan username moderator"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 disabled:opacity-50 rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-sky-400 dark:text-sky-200" />
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-2xs text-slate-400 dark:text-slate-500">
              Hak akses diperiksa secara ketat oleh sistem keamanan.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
