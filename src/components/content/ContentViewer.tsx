import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Eye,
  Calendar,
  User as UserIcon,
  FileText,
  Download,
  MessageSquare,
  Send,
  Trash2,
  Edit2,
  Shield,
  FileSpreadsheet,
  LogIn,
} from 'lucide-react';
import { MaterialNewsItem, User, Comment } from '../../types/database';
import { storageService } from '../../services/storage';

interface ContentViewerProps {
  content: MaterialNewsItem;
  currentUser: User | null;
  onBack: () => void;
  onOpenAuth: () => void;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  currentUser,
  onBack,
  onOpenAuth,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [liveViews, setLiveViews] = useState(content.viewsCount || 0);

  // Record view on mount
  useEffect(() => {
    storageService.recordView(content.id, currentUser?.id);
    const updated = storageService.getContentById(content.id);
    if (updated) {
      setLiveViews(updated.viewsCount);
    }
    loadComments();
  }, [content.id]);

  const loadComments = () => {
    const list = storageService.getComments(content.id);
    setComments(list);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    storageService.addComment(content.id, currentUser, newCommentText);
    setNewCommentText('');
    loadComments();
  };

  const handleStartEdit = (comm: Comment) => {
    setEditingCommentId(comm.id);
    setEditingText(comm.commentText);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!currentUser || !editingText.trim()) return;
    storageService.updateComment(commentId, currentUser.id, editingText);
    setEditingCommentId(null);
    setEditingText('');
    loadComments();
  };

  const handleDeleteComment = (commentId: string) => {
    if (!currentUser) return;
    const ok = window.confirm('Yakin ingin menghapus komentar ini?');
    if (!ok) return;

    storageService.deleteComment(commentId, currentUser);
    loadComments();
  };

  const handleDownloadAttachment = () => {
    if (!content.attachment) return;

    if (content.attachment.dataUrl) {
      const a = document.createElement('a');
      a.href = content.attachment.dataUrl;
      a.download = content.attachment.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([`Berkas lampiran Oikonomia: ${content.attachment.name}\nJudul: ${content.title}`], {
        type: content.attachment.type,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = content.attachment.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const isModerator = currentUser?.role === 'moderator';

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar {content.type === 'berita' ? 'Berita' : 'Materi'}</span>
        </button>

        {/* Zero-Pill Clean Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="uppercase">{content.type}</span>
          {content.category && (
            <>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{content.category}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{liveViews} views</span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {content.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{content.authorName}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>
              {new Date(content.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </span>
        </div>

        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
          {content.summary}
        </p>
      </div>

      {/* Attachment Card (PDF & Excel) */}
      {content.attachment && (
        <div className="p-4 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 rounded-xl flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0">
              {content.attachment.name.endsWith('.xlsx') || content.attachment.type.includes('spreadsheet') ? (
                <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <FileText className="w-5 h-5 text-sky-700 dark:text-sky-400" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-sky-950 dark:text-sky-200">
                {content.attachment.name}
              </div>
              <div className="text-2xs text-sky-700 dark:text-sky-400 font-mono">
                {(content.attachment.sizeBytes / 1024).toFixed(1)} KB · Berkas Dokumen Resmi
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadAttachment}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-900 dark:bg-sky-600 hover:bg-sky-800 dark:hover:bg-sky-500 rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Berkas</span>
          </button>
        </div>
      )}

      {/* Body Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-4">
        {content.content}
      </div>

      {/* ================================================================== */}
      {/* COMMENTS & DISCUSSION SECTION */}
      {/* ================================================================== */}
      <section className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>Diskusi & Komentar ({comments.length})</span>
          </h2>
          <div className="text-2xs text-slate-500 dark:text-slate-400">
            {currentUser ? (
              <span className="flex items-center gap-1">
                <span>Aktif sebagai:</span>
                <strong className="text-slate-800 dark:text-slate-200">
                  {currentUser.fullName || currentUser.username}
                </strong>
                {currentUser.role === 'moderator' ? (
                  <span className="text-sky-700 dark:text-sky-400 font-bold">[Moderator]</span>
                ) : (
                  <span className="text-slate-500 dark:text-slate-400 font-mono">@{currentUser.username}</span>
                )}
              </span>
            ) : (
              <span>Pengunjung Tamu</span>
            )}
          </div>
        </div>

        {/* Comment Form or Login Gate */}
        {currentUser ? (
          <form
            onSubmit={handlePostComment}
            className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            <textarea
              required
              rows={3}
              placeholder={`Tulis tanggapan atau pertanyaan akademik sebagai ${
                currentUser.fullName || currentUser.username
              }...`}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-2xs text-slate-400 dark:text-slate-500">
                Gunakan bahasa yang sopan dan relevan dengan topik bahasan.
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 rounded-lg transition-colors shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Komentar</span>
              </button>
            </div>
          </form>
        ) : (
          /* Login Requirement Prompt for Guests */
          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mx-auto">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Ingin Bergabung dalam Diskusi Akademik?
              </h4>
              <p className="text-2xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-0.5">
                Silakan masuk atau daftarkan akun pembaca Anda (Nama Lengkap, Username, Password) untuk dapat mengirimkan komentar dan berdiskusi.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 rounded-lg transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk / Daftar Akun</span>
              </button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-3">
          {comments.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">
              Belum ada komentar untuk konten ini. Jadilah yang pertama berdiskusi!
            </div>
          ) : (
            comments.map((comm) => {
              const isOwner = currentUser?.id === comm.userId;
              const canDelete = isOwner || isModerator;
              const canEdit = isOwner;

              return (
                <div
                  key={comm.id}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-xs shadow-2xs transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {comm.authorFullName || comm.userName || 'Pengguna'}
                      </span>
                      
                      {comm.authorUsername && (
                        <span className="text-2xs text-slate-400 dark:text-slate-500 font-mono">
                          @{comm.authorUsername}
                        </span>
                      )}

                      {/* Role Badge */}
                      {comm.userRole === 'moderator' && (
                        <span className="text-2xs font-bold text-sky-800 dark:text-sky-400 flex items-center gap-1">
                          <Shield className="w-3 h-3 text-sky-700 dark:text-sky-400" />
                          <span>[Moderator]</span>
                        </span>
                      )}

                      <span className="text-slate-400 dark:text-slate-500 text-2xs">
                        · {new Date(comm.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        {comm.isEdited && ' (diedit)'}
                      </span>
                    </div>

                    {/* Actions: Owner can edit/delete; Moderator can delete ANY comment */}
                    <div className="flex items-center gap-1">
                      {canEdit && editingCommentId !== comm.id && (
                        <button
                          onClick={() => handleStartEdit(comm)}
                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors"
                          title="Edit Komentar Saya"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteComment(comm.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors"
                          title={
                            isModerator && !isOwner
                              ? 'Hapus Komentar (Wewenang Moderator)'
                              : 'Hapus Komentar Saya'
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {editingCommentId === comm.id ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={2}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-sky-500"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-2.5 py-1 text-2xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleSaveEdit(comm.id)}
                          className="px-3 py-1 text-2xs font-semibold text-white bg-slate-900 dark:bg-sky-600 rounded hover:bg-slate-800 dark:hover:bg-sky-500"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {comm.commentText}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </article>
  );
};
