import React, { useState } from 'react';
import { RotateCcw, Plus, Trash2, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

interface AccountEntry {
  id: string;
  name: string;
  category: 'Aset' | 'Liabilitas' | 'Ekuitas' | 'Pendapatan' | 'Beban' | 'Prive';
  debit: number;
  credit: number;
  normalSide: 'Debit' | 'Kredit';
}

const INITIAL_ACCOUNTS: AccountEntry[] = [
  { id: '1', name: 'Kas & Setara Kas', category: 'Aset', debit: 45000000, credit: 0, normalSide: 'Debit' },
  { id: '2', name: 'Piutang Usaha', category: 'Aset', debit: 20000000, credit: 0, normalSide: 'Debit' },
  { id: '3', name: 'Perlengkapan Kantor', category: 'Aset', debit: 5000000, credit: 0, normalSide: 'Debit' },
  { id: '4', name: 'Peralatan & Komputer', category: 'Aset', debit: 50000000, credit: 0, normalSide: 'Debit' },
  { id: '5', name: 'Utang Usaha / Dagang', category: 'Liabilitas', debit: 0, credit: 15000000, normalSide: 'Kredit' },
  { id: '6', name: 'Utang Bank Jangka Panjang', category: 'Liabilitas', debit: 0, credit: 25000000, normalSide: 'Kredit' },
  { id: '7', name: 'Modal Saham Pemilik', category: 'Ekuitas', debit: 0, credit: 60000000, normalSide: 'Kredit' },
  { id: '8', name: 'Pendapatan Jasa Konsultasi', category: 'Pendapatan', debit: 0, credit: 40000000, normalSide: 'Kredit' },
  { id: '9', name: 'Beban Gaji Karyawan', category: 'Beban', debit: 12000000, credit: 0, normalSide: 'Debit' },
  { id: '10', name: 'Beban Sewa Kantor', category: 'Beban', debit: 8000000, credit: 0, normalSide: 'Debit' },
];

export const TrialBalanceGenerator: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountEntry[]>(INITIAL_ACCOUNTS);
  const [newAccountName, setNewAccountName] = useState<string>('');
  const [newAccountCategory, setNewAccountCategory] = useState<AccountEntry['category']>('Beban');
  const [newAccountAmount, setNewAccountAmount] = useState<number>(0);
  const [newAccountSide, setNewAccountSide] = useState<'Debit' | 'Kredit'>('Debit');

  const totalDebit = accounts.reduce((sum, acc) => sum + (Number(acc.debit) || 0), 0);
  const totalCredit = accounts.reduce((sum, acc) => sum + (Number(acc.credit) || 0), 0);
  const difference = Math.abs(totalDebit - totalCredit);
  const isBalanced = difference === 0;

  // Calculate Income Statement elements
  const totalRevenue = accounts
    .filter((a) => a.category === 'Pendapatan')
    .reduce((sum, a) => sum + (a.credit - a.debit), 0);
  const totalExpenses = accounts
    .filter((a) => a.category === 'Beban')
    .reduce((sum, a) => sum + (a.debit - a.credit), 0);
  const netIncome = totalRevenue - totalExpenses;

  const handleUpdateAmount = (id: string, side: 'debit' | 'credit', val: number) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          return {
            ...acc,
            [side]: Math.max(0, val),
          };
        }
        return acc;
      })
    );
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName.trim()) return;

    const newAcc: AccountEntry = {
      id: Date.now().toString(),
      name: newAccountName.trim(),
      category: newAccountCategory,
      debit: newAccountSide === 'Debit' ? newAccountAmount : 0,
      credit: newAccountSide === 'Kredit' ? newAccountAmount : 0,
      normalSide: newAccountSide,
    };

    setAccounts([...accounts, newAcc]);
    setNewAccountName('');
    setNewAccountAmount(0);
  };

  const handleReset = () => {
    setAccounts(INITIAL_ACCOUNTS);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Akuntansi Keuangan</span>
            <span aria-hidden="true">·</span>
            <span>Verifikasi Keseimbangan Pembukuan</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Generator & Verifikator Neraca Saldo (Trial Balance)</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Susun dan uji keseimbangan debit/kredit buku besar serta ekstrak otomatis Laporan Laba Rugi periode berjalan.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Buku Besar</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Balance Status Banner */}
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isBalanced
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/80 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-3">
            {isBalanced ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
            )}
            <div>
              <span className="font-bold text-sm block">
                {isBalanced ? 'Status: SEIMBANG SEMPURNA (BALANCED)' : 'Status: BELUM SEIMBANG (UNBALANCED)'}
              </span>
              <span className="text-xs text-slate-600">
                {isBalanced
                  ? 'Total Debit dan Total Kredit telah memenuhi prinsip dasar double-entry bookkeeping.'
                  : `Terdapat selisih pembukuan sebesar ${formatRupiah(difference)}. Harap periksa kembali saldo akun.`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
            <div className="p-2 bg-white rounded border border-slate-200">
              <span className="text-slate-500 block text-2xs uppercase">Total Debit</span>
              <span className="font-bold text-slate-900">{formatRupiah(totalDebit)}</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <span className="text-slate-500 block text-2xs uppercase">Total Kredit</span>
              <span className="font-bold text-slate-900">{formatRupiah(totalCredit)}</span>
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Nama Akun Buku Besar</th>
                <th className="py-2.5 px-4">Golongan</th>
                <th className="py-2.5 px-4">Saldo Normal</th>
                <th className="py-2.5 px-4 font-mono text-right">Debit (Rp)</th>
                <th className="py-2.5 px-4 font-mono text-right">Kredit (Rp)</th>
                <th className="py-2.5 px-3 text-center w-12">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-medium text-slate-900">
                    {acc.name}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    <span className="text-2xs text-slate-500 uppercase">{acc.category}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {acc.normalSide}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <input
                      type="number"
                      step="1000000"
                      value={acc.debit || ''}
                      onChange={(e) => handleUpdateAmount(acc.id, 'debit', Number(e.target.value))}
                      placeholder="0"
                      className="w-32 text-right px-2 py-1 font-mono text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <input
                      type="number"
                      step="1000000"
                      value={acc.credit || ''}
                      onChange={(e) => handleUpdateAmount(acc.id, 'credit', Number(e.target.value))}
                      placeholder="0"
                      className="w-32 text-right px-2 py-1 font-mono text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleRemoveAccount(acc.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Hapus Akun"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                <td colSpan={3} className="py-3 px-4 text-right uppercase">
                  Jumlah Total Neraca Saldo:
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-900 tabular-nums">
                  {formatRupiah(totalDebit)}
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-900 tabular-nums">
                  {formatRupiah(totalCredit)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Account Inline Form */}
        <form onSubmit={handleAddAccount} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-xs font-semibold text-slate-700 block mb-2">Tambah Akun Baru ke Neraca Saldo</span>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Nama akun (cth: Piutang Karyawan)"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              className="sm:col-span-2 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <select
              value={newAccountCategory}
              onChange={(e) => setNewAccountCategory(e.target.value as AccountEntry['category'])}
              className="px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="Aset">Aset</option>
              <option value="Liabilitas">Liabilitas</option>
              <option value="Ekuitas">Ekuitas</option>
              <option value="Pendapatan">Pendapatan</option>
              <option value="Beban">Beban</option>
            </select>
            <div className="flex gap-2">
              <select
                value={newAccountSide}
                onChange={(e) => setNewAccountSide(e.target.value as 'Debit' | 'Kredit')}
                className="w-20 px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="Debit">Debit</option>
                <option value="Kredit">Kredit</option>
              </select>
              <input
                type="number"
                placeholder="Jumlah (Rp)"
                value={newAccountAmount || ''}
                onChange={(e) => setNewAccountAmount(Number(e.target.value))}
                className="w-full px-2 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>
        </form>

        {/* Auto Generated Income Statement Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span>Pratinjau Otomatis: Laporan Laba Rugi Periode Berjalan</span>
            </span>
            <span className="text-slate-500 font-mono">Ekstrak Akun Nominal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded border border-slate-200">
              <span className="text-2xs uppercase text-slate-500 block font-semibold">Total Pendapatan Usaha</span>
              <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
                {formatRupiah(totalRevenue)}
              </span>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <span className="text-2xs uppercase text-slate-500 block font-semibold">Total Beban Operasional</span>
              <span className="text-base font-bold font-mono text-rose-700 tabular-nums">
                {formatRupiah(totalExpenses)}
              </span>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <span className="text-2xs uppercase text-slate-500 block font-semibold">Laba (Rugi) Bersih Operasi</span>
              <span className={`text-base font-bold font-mono tabular-nums ${netIncome >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                {formatRupiah(netIncome)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
