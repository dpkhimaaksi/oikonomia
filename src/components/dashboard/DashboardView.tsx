import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  FilePlus,
  MessageSquare,
  Inbox,
  Eye,
  Trash2,
  Edit,
  Upload,
  CheckCircle,
  Clock,
  FileText,
  FileSpreadsheet,
  AlertCircle,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import { storageService } from '../../services/storage';
import {
  MaterialNewsItem,
  ContentType,
  MateriCategory,
  Comment,
  Feedback,
  VisitorAnalytics,
  User,
  FileAttachment,
} from '../../types/database';

interface DashboardViewProps {
  currentUser: User;
  onViewContent: (content: MaterialNewsItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onViewContent,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'crud' | 'comments' | 'feedbacks'>('analytics');

  // State
  const [analytics, setAnalytics] = useState<VisitorAnalytics>(storageService.getAnalytics());
  const [contents, setContents] = useState<MaterialNewsItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // CRUD Form State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formType, setFormType] = useState<ContentType>('materi');
  const [formCategory, setFormCategory] = useState<MateriCategory>('akuntansi');
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [attachment, setAttachment] = useState<FileAttachment | undefined>(undefined);
  const [formSuccessMsg, setFormSuccessMsg] = useState('');

  const loadData = () => {
    setAnalytics(storageService.getAnalytics());
    setContents(storageService.getContents());
    setComments(storageService.getComments());
    setFeedbacks(storageService.getFeedbacks());
  };

  useEffect(() => {
    loadData();
  }, []);

  // File Upload Handler (PDF & XLSX)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowed.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.xlsx')) {
      alert('Format berkas tidak didukung! Harap unggah berkas PDF (.pdf) atau Excel (.xlsx).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({
        name: file.name,
        type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
        sizeBytes: file.size,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // Submit Content (Create or Update)
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim() || !formContent.trim()) {
      alert('Judul, ringkasan, dan konten wajib diisi!');
      return;
    }

    const slug = formTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    if (isEditing && editingId) {
      storageService.updateContent(editingId, {
        type: formType,
        category: formType === 'materi' ? formCategory : undefined,
        title: formTitle.trim(),
        slug,
        summary: formSummary.trim(),
        content: formContent.trim(),
        attachment,
      });
      setFormSuccessMsg('Konten berhasil diperbarui!');
    } else {
      storageService.createContent({
        authorId: currentUser.id,
        authorName: currentUser.fullName || currentUser.name || 'Moderator Oikonomia',
        type: formType,
        category: formType === 'materi' ? formCategory : undefined,
        title: formTitle.trim(),
        slug,
        summary: formSummary.trim(),
        content: formContent.trim(),
        attachment,
        isPublished: true,
      });
      setFormSuccessMsg('Konten baru berhasil diterbitkan!');
    }

    // Reset Form
    setIsEditing(false);
    setEditingId(null);
    setFormTitle('');
    setFormSummary('');
    setFormContent('');
    setAttachment(undefined);
    loadData();

    setTimeout(() => {
      setFormSuccessMsg('');
    }, 3000);
  };

  const handleStartEdit = (item: MaterialNewsItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormType(item.type);
    if (item.category) setFormCategory(item.category);
    setFormTitle(item.title);
    setFormSummary(item.summary);
    setFormContent(item.content);
    setAttachment(item.attachment);
    setActiveTab('crud');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteContent = (id: string, title: string) => {
    const ok = window.confirm(`Yakin ingin menghapus konten "${title}"? Seluruh komentar terkait juga akan dihapus.`);
    if (!ok) return;

    storageService.deleteContent(id);
    loadData();
  };

  const handleDeleteComment = (commentId: string) => {
    const ok = window.confirm('Yakin ingin menghapus komentar ini?');
    if (!ok) return;

    storageService.deleteComment(commentId, currentUser);
    loadData();
  };

  const handleUpdateFeedbackStatus = (id: string, status: Feedback['status']) => {
    storageService.updateFeedbackStatus(id, status);
    loadData();
  };

  const handleDeleteFeedback = (id: string) => {
    const ok = window.confirm('Hapus pesan masukan ini?');
    if (!ok) return;

    storageService.deleteFeedback(id);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-2xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Panel Pengelola Sistem · Akses Eksklusif Moderator
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dashboard Manajemen Oikonomia
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola materi, terbitkan berita, unggah berkas PDF/Excel, moderasi komentar publik, dan pantau analitik pengunjung.
            </p>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Statistik & Analitik</span>
          </button>

          <button
            onClick={() => setActiveTab('crud')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'crud'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span>Manajemen Konten & Berkas</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'comments'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Moderasi Komentar ({comments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'feedbacks'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Kotak Masukan ({feedbacks.length})</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: STATISTIK & ANALITIK */}
      {/* ==================================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors">
              <span className="text-2xs uppercase text-slate-400 dark:text-slate-500 font-semibold block">Total Pengunjung Unik</span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {analytics.totalVisitors}
              </div>
              <span className="text-2xs text-emerald-600 dark:text-emerald-400 font-medium">Berdasarkan sesi aktif</span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors">
              <span className="text-2xs uppercase text-slate-400 dark:text-slate-500 font-semibold block">Total Pembaca (Pageviews)</span>
              <div className="text-2xl font-bold font-mono text-sky-800 dark:text-sky-400 tabular-nums">
                {analytics.totalPageViews}
              </div>
              <span className="text-2xs text-slate-500 dark:text-slate-400">Kunjungan materi & berita</span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors">
              <span className="text-2xs uppercase text-slate-400 dark:text-slate-500 font-semibold block">Konten Diterbitkan</span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {contents.length}
              </div>
              <span className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                {contents.filter((c) => c.type === 'materi').length} Materi · {contents.filter((c) => c.type === 'berita').length} Berita
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors">
              <span className="text-2xs uppercase text-slate-400 dark:text-slate-500 font-semibold block">Interaksi Komunitas</span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {comments.length + feedbacks.length}
              </div>
              <span className="text-2xs text-slate-500 dark:text-slate-400">
                {comments.length} Komentar · {feedbacks.length} Masukan
              </span>
            </div>
          </div>

          {/* Daily & Top Articles Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Daily Views Bar */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                  <span>Tren Kunjungan Harian (7 Hari Terakhir)</span>
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {analytics.dailyViews.map((d) => {
                  const maxDaily = Math.max(1, ...analytics.dailyViews.map((x) => x.views));
                  const pct = Math.max(4, (d.views / maxDaily) * 100);

                  return (
                    <div key={d.date} className="space-y-1">
                      <div className="flex justify-between text-2xs text-slate-600 dark:text-slate-400">
                        <span className="font-mono text-slate-700 dark:text-slate-300">{d.date}</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                          {d.views} pembaca
                        </span>
                      </div>
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                        <div
                          className="h-full bg-sky-800 dark:bg-sky-500 rounded transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Viewed Articles */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>Konten Terbanyak Dibaca</span>
              </h3>

              {analytics.topArticles.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500">
                  Belum ada rekaman pembaca. Unggah konten baru dan buka artikel untuk memulai pelacakan.
                </div>
              ) : (
                <div className="space-y-3">
                  {analytics.topArticles.map((art, idx) => (
                    <div
                      key={art.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5 truncate">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {idx + 1}. {art.title}
                        </div>
                        <div className="text-2xs text-slate-500 dark:text-slate-400 uppercase">
                          {art.type}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-sky-800 dark:text-sky-400 text-sm tabular-nums shrink-0">
                        {art.views} views
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: MANAJEMEN KONTEN & BERKAS (CRUD) */}
      {/* ==================================================================== */}
      {activeTab === 'crud' && (
        <div className="space-y-8">
          {/* Creation / Edit Form Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isEditing ? 'Edit Konten Publikasi' : 'Form Tambah Konten Baru'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Terbitkan materi kurikulum atau berita terbaru lengkap dengan lampiran berkas PDF/Excel.
                </p>
              </div>

              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setFormTitle('');
                    setFormSummary('');
                    setFormContent('');
                    setAttachment(undefined);
                  }}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Batal Edit
                </button>
              )}
            </div>

            {formSuccessMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{formSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveContent} className="space-y-4">
              {/* Type and Category Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Jenis Publikasi
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as ContentType)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
                  >
                    <option value="materi">Materi Pelajaran</option>
                    <option value="berita">Berita & Pengumuman</option>
                  </select>
                </div>

                {formType === 'materi' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Kategori Modul
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as MateriCategory)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
                    >
                      <option value="akuntansi">Akuntansi</option>
                      <option value="mikro">Ekonomi Mikro</option>
                      <option value="makro">Ekonomi Makro</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul Materi / Berita
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pengantar Siklus Akuntansi & Jurnal Penyesuaian"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Ringkasan / Abstrak Singkat
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Tuliskan intisari 1-2 kalimat..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Konten Lengkap (Penjelasan, Rumus, Studi Kasus)
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Tulis materi pelajaran atau isi berita secara komprehensif..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
                />
              </div>

              {/* File Attachment Uploader (.pdf & .xlsx) */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Lampirkan Berkas Tambahan (Opsional)</span>
                  </label>
                  <span className="text-2xs text-slate-500 dark:text-slate-400 font-mono">Format: .pdf, .xlsx</span>
                </div>

                <input
                  type="file"
                  accept=".pdf, .xlsx, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-600 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 dark:file:bg-sky-600 file:text-white hover:file:bg-slate-800 dark:hover:file:bg-sky-500 cursor-pointer"
                />

                {attachment && (
                  <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      {attachment.name.endsWith('.xlsx') ? (
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0" />
                      )}
                      <span className="font-semibold text-slate-900 dark:text-white truncate">{attachment.name}</span>
                      <span className="text-2xs text-slate-400 dark:text-slate-500 font-mono">
                        ({(attachment.sizeBytes / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachment(undefined)}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:underline shrink-0 ml-2"
                    >
                      Hapus Berkas
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 rounded-lg transition-colors shadow-2xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Sekarang'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Table of Existing Contents */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Daftar Konten Aktif ({contents.length})
            </h3>

            {contents.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                Belum ada konten materi atau berita. Gunakan formulir di atas untuk menerbitkan konten pertama Anda.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="py-2.5 px-4">Judul Konten</th>
                      <th className="py-2.5 px-4">Jenis</th>
                      <th className="py-2.5 px-4">Kategori</th>
                      <th className="py-2.5 px-4">Lampiran</th>
                      <th className="py-2.5 px-4 font-mono text-center">Views</th>
                      <th className="py-2.5 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {contents.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="py-2.5 px-4 uppercase text-2xs font-bold text-slate-500 dark:text-slate-400">
                          {item.type}
                        </td>
                        <td className="py-2.5 px-4 capitalize text-slate-600 dark:text-slate-300">
                          {item.category || '-'}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300">
                          {item.attachment ? (
                            <span className="font-mono text-2xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                              {item.attachment.name.slice(-10)}
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-center font-bold text-slate-900 dark:text-white tabular-nums">
                          {item.viewsCount}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => onViewContent(item)}
                              className="px-2 py-1 text-2xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                            >
                              Lihat
                            </button>
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteContent(item.id, item.title)}
                              className="p-1 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded"
                              title="Hapus"
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
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: MODERASI KOMENTAR */}
      {/* ==================================================================== */}
      {activeTab === 'comments' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Moderasi Seluruh Komentar Pengguna ({comments.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sebagai moderator, Anda memiliki wewenang untuk meninjau dan menghapus komentar apapun demi menjaga ketertiban diskusi akademik.
            </p>
          </div>

          {comments.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500">
              Belum ada komentar dari pengguna di dalam sistem.
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {comm.authorFullName || comm.userName || 'Pengguna'}
                      </span>
                      {comm.authorUsername && (
                        <span className="text-2xs text-slate-500 dark:text-slate-400 font-mono">
                          @{comm.authorUsername}
                        </span>
                      )}
                      <span className="text-2xs text-slate-400 dark:text-slate-500 font-mono">
                        · {new Date(comm.createdAt).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      "{comm.commentText}"
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteComment(comm.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-2xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus Komentar</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: KOTAK MASUKAN (FEEDBACK INBOX) */}
      {/* ==================================================================== */}
      {activeTab === 'feedbacks' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kotak Masukan dari Pengguna ({feedbacks.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tinjau pesan, usulan kurikulum, dan pertanyaan yang dikirimkan oleh pembaca publik.
            </p>
          </div>

          {feedbacks.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500">
              Kotak masukan kosong. Belum ada saran atau pesan dari pembaca.
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{fb.subject}</h4>
                      <div className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                        Pengirim: <span className="text-slate-800 dark:text-slate-200 font-semibold">{fb.senderName}</span> {fb.senderEmail ? `(${fb.senderEmail})` : ''} · {new Date(fb.createdAt).toLocaleDateString('id-ID')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={fb.status}
                        onChange={(e) => handleUpdateFeedbackStatus(fb.id, e.target.value as Feedback['status'])}
                        className={`text-2xs font-semibold rounded px-2 py-1 border ${
                          fb.status === 'resolved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : fb.status === 'read'
                            ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        <option value="unread">Belum Dibaca</option>
                        <option value="read">Sudah Dibaca</option>
                        <option value="resolved">Selesai</option>
                      </select>

                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    {fb.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
