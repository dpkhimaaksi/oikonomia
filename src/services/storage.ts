import {
  User,
  MaterialNewsItem,
  Comment,
  Feedback,
  ViewTrackingRecord,
  VisitorAnalytics,
  ContentType,
  MateriCategory,
} from '../types/database';

const STORAGE_KEYS = {
  CURRENT_USER: 'oikonomia_current_user',
  USERS: 'oikonomia_users',
  CONTENTS: 'oikonomia_materials_news', // Must start empty!
  COMMENTS: 'oikonomia_comments',       // Must start empty!
  FEEDBACKS: 'oikonomia_feedbacks',     // Must start empty!
  VIEWS: 'oikonomia_views_tracking',    // Must start empty!
};

// Fixed Default Moderator Account
const DEFAULT_MODERATOR_USER: User = {
  id: 'mod-fixed-id-01',
  fullName: 'Moderator Oikonomia',
  username: 'moderator oikonomia',
  role: 'moderator',
  createdAt: '2026-01-01T00:00:00.000Z',
};

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION & USERS (Standard Registration & Isolated Moderator)
  // --------------------------------------------------------------------------

  /**
   * Pendaftaran User Umum (Form Biasa: Nama Lengkap, Username, Password)
   */
  public registerUser(
    fullName: string,
    username: string,
    pass: string
  ): { success: boolean; user?: User; error?: string } {
    const cleanFullName = fullName.trim();
    const cleanUsername = username.trim();
    const cleanPass = pass.trim();

    if (!cleanFullName || !cleanUsername || !cleanPass) {
      return { success: false, error: 'Nama Lengkap, Username, dan Password wajib diisi.' };
    }

    if (cleanUsername.length < 3) {
      return { success: false, error: 'Username minimal harus memiliki 3 karakter.' };
    }

    if (cleanPass.length < 4) {
      return { success: false, error: 'Password minimal harus memiliki 4 karakter.' };
    }

    // Check conflict with default moderator username
    if (cleanUsername.toLowerCase() === DEFAULT_MODERATOR_USER.username.toLowerCase()) {
      return { success: false, error: 'Username tersebut sudah terdaftar. Silakan pilih username lain.' };
    }

    const users = this.get<User[]>(STORAGE_KEYS.USERS, []);
    const existing = users.find(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (existing) {
      return { success: false, error: 'Username tersebut sudah terdaftar. Silakan pilih username lain.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      fullName: cleanFullName,
      username: cleanUsername,
      password: cleanPass,
      role: 'user',
      createdAt: new Date().toISOString(),
      name: cleanFullName,
    };

    users.push(newUser);
    this.set(STORAGE_KEYS.USERS, users);

    // Set active session (excluding password)
    const sessionUser: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      role: 'user',
      createdAt: newUser.createdAt,
      name: newUser.fullName,
    };
    this.setCurrentUser(sessionUser);

    return { success: true, user: sessionUser };
  }

  /**
   * Login User Umum (Username & Password)
   * CATATAN KEAMANAN: Jika gagal, selalu kembalikan error generik "Username atau Password salah".
   */
  public loginUser(
    username: string,
    pass: string
  ): { success: boolean; user?: User; error?: string } {
    const cleanUsername = username.trim();
    const cleanPass = pass.trim();

    if (!cleanUsername || !cleanPass) {
      return { success: false, error: 'Username dan Password wajib diisi.' };
    }

    // Check if logging in as default moderator
    if (
      cleanUsername.toLowerCase() === DEFAULT_MODERATOR_USER.username.toLowerCase() &&
      cleanPass === 'mod123!@#'
    ) {
      this.setCurrentUser(DEFAULT_MODERATOR_USER);
      return { success: true, user: DEFAULT_MODERATOR_USER };
    }

    // Check registered regular users
    const users = this.get<User[]>(STORAGE_KEYS.USERS, []);
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === cleanUsername.toLowerCase() &&
        u.password === cleanPass
    );

    if (found) {
      const sessionUser: User = {
        id: found.id,
        fullName: found.fullName,
        username: found.username,
        role: found.role,
        createdAt: found.createdAt,
        name: found.fullName,
      };
      this.setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    }

    // SECURITY RULE: Never leak default credentials or detailed reasons
    return { success: false, error: 'Username atau Password salah.' };
  }

  /**
   * Login Khusus Moderator (Akun Default)
   * Username: "moderator oikonomia" | Password: "mod123!@#"
   * SECURITY RULE: Never leak credentials on invalid input.
   */
  public loginModerator(
    username: string,
    pass: string
  ): { success: boolean; user?: User; error?: string } {
    if (
      username.trim().toLowerCase() === DEFAULT_MODERATOR_USER.username.toLowerCase() &&
      pass === 'mod123!@#'
    ) {
      this.setCurrentUser(DEFAULT_MODERATOR_USER);
      return { success: true, user: DEFAULT_MODERATOR_USER };
    }
    return { success: false, error: 'Username atau Password salah.' };
  }

  public getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  public setCurrentUser(user: User | null): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  public logout(): void {
    this.setCurrentUser(null);
  }

  // --------------------------------------------------------------------------
  // MATERIALS & NEWS (Clean Empty Initial State)
  // --------------------------------------------------------------------------
  public getContents(type?: ContentType, category?: MateriCategory): MaterialNewsItem[] {
    const all = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    return all.filter((item) => {
      const matchType = !type || item.type === type;
      const matchCategory = !category || item.category === category;
      return matchType && matchCategory;
    });
  }

  public getContentById(id: string): MaterialNewsItem | null {
    const all = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    return all.find((item) => item.id === id) || null;
  }

  public createContent(
    data: Omit<MaterialNewsItem, 'id' | 'viewsCount' | 'createdAt' | 'updatedAt'>
  ): MaterialNewsItem {
    const all = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    const newItem: MaterialNewsItem = {
      ...data,
      id: `content-${Date.now()}`,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.unshift(newItem);
    this.set(STORAGE_KEYS.CONTENTS, all);
    return newItem;
  }

  public updateContent(id: string, updates: Partial<MaterialNewsItem>): MaterialNewsItem | null {
    const all = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updated = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    all[index] = updated;
    this.set(STORAGE_KEYS.CONTENTS, all);
    return updated;
  }

  public deleteContent(id: string): boolean {
    const all = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    const filtered = all.filter((item) => item.id !== id);
    this.set(STORAGE_KEYS.CONTENTS, filtered);

    // Also cascade delete comments & views
    const comments = this.get<Comment[]>(STORAGE_KEYS.COMMENTS, []).filter((c) => c.contentId !== id);
    this.set(STORAGE_KEYS.COMMENTS, comments);

    const views = this.get<ViewTrackingRecord[]>(STORAGE_KEYS.VIEWS, []).filter((v) => v.contentId !== id);
    this.set(STORAGE_KEYS.VIEWS, views);

    return true;
  }

  // --------------------------------------------------------------------------
  // VIEWS & VISITOR TRACKING
  // --------------------------------------------------------------------------
  public recordView(contentId: string, userId?: string): void {
    const all = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    const content = all.find((c) => c.id === contentId);
    if (!content) return;

    content.viewsCount = (content.viewsCount || 0) + 1;
    this.set(STORAGE_KEYS.CONTENTS, all);

    const today = new Date().toISOString().split('T')[0];
    const views = this.get<ViewTrackingRecord[]>(STORAGE_KEYS.VIEWS, []);
    views.push({
      id: `view-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      contentId,
      userId,
      date: today,
      timestamp: new Date().toISOString(),
    });
    this.set(STORAGE_KEYS.VIEWS, views);
  }

  public getAnalytics(): VisitorAnalytics {
    const contents = this.get<MaterialNewsItem[]>(STORAGE_KEYS.CONTENTS, []);
    const views = this.get<ViewTrackingRecord[]>(STORAGE_KEYS.VIEWS, []);

    const totalPageViews = views.length;
    const uniqueIdentifiers = new Set(views.map((v) => v.userId || v.id.slice(0, 16)));
    const totalVisitors = Math.max(views.length > 0 ? 1 : 0, uniqueIdentifiers.size);

    const dailyMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyMap[dateStr] = 0;
    }
    views.forEach((v) => {
      if (dailyMap[v.date] !== undefined) {
        dailyMap[v.date]++;
      }
    });
    const dailyViews = Object.entries(dailyMap).map(([date, count]) => ({
      date,
      views: count,
    }));

    const weeklyViews = [
      { week: 'Minggu -3', views: Math.round(totalPageViews * 0.15) },
      { week: 'Minggu -2', views: Math.round(totalPageViews * 0.25) },
      { week: 'Minggu Lalu', views: Math.round(totalPageViews * 0.28) },
      { week: 'Minggu Ini', views: Math.round(totalPageViews * 0.32) || totalPageViews },
    ];

    const monthlyViews = [
      { month: 'Bulan Lalu', views: Math.round(totalPageViews * 0.4) },
      { month: 'Bulan Ini', views: totalPageViews },
    ];

    const sorted = [...contents].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    const topArticles = sorted.slice(0, 5).map((c) => ({
      id: c.id,
      title: c.title,
      type: c.type,
      views: c.viewsCount || 0,
    }));

    return {
      totalVisitors,
      totalPageViews,
      dailyViews,
      weeklyViews,
      monthlyViews,
      topArticles,
    };
  }

  // --------------------------------------------------------------------------
  // COMMENTS (Only Logged-in Users / Moderator)
  // --------------------------------------------------------------------------
  public getComments(contentId?: string): Comment[] {
    const all = this.get<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    if (!contentId) return all;
    return all.filter((c) => c.contentId === contentId);
  }

  public addComment(contentId: string, user: User, commentText: string): Comment {
    const all = this.get<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      contentId,
      userId: user.id,
      authorFullName: user.fullName || user.name || user.username,
      authorUsername: user.username,
      userName: user.fullName || user.name || user.username,
      userRole: user.role,
      commentText: commentText.trim(),
      isEdited: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.push(newComment);
    this.set(STORAGE_KEYS.COMMENTS, all);
    return newComment;
  }

  public updateComment(commentId: string, userId: string, newText: string): Comment | null {
    const all = this.get<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const index = all.findIndex((c) => c.id === commentId);
    if (index === -1) return null;

    // Only author can edit
    if (all[index].userId !== userId) return null;

    all[index] = {
      ...all[index],
      commentText: newText.trim(),
      isEdited: true,
      updatedAt: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.COMMENTS, all);
    return all[index];
  }

  public deleteComment(commentId: string, currentUser: User): boolean {
    const all = this.get<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const target = all.find((c) => c.id === commentId);
    if (!target) return false;

    // Moderator can delete ANY comment; User can only delete OWN comment
    if (currentUser.role !== 'moderator' && target.userId !== currentUser.id) {
      return false;
    }

    const filtered = all.filter((c) => c.id !== commentId);
    this.set(STORAGE_KEYS.COMMENTS, filtered);
    return true;
  }

  // --------------------------------------------------------------------------
  // FEEDBACKS (From Logged-In Users / Readers to Moderator)
  // --------------------------------------------------------------------------
  public getFeedbacks(): Feedback[] {
    return this.get<Feedback[]>(STORAGE_KEYS.FEEDBACKS, []);
  }

  public submitFeedback(data: {
    senderName: string;
    senderUsername?: string;
    senderEmail?: string;
    subject: string;
    message: string;
    senderUserId?: string;
  }): Feedback {
    const all = this.get<Feedback[]>(STORAGE_KEYS.FEEDBACKS, []);
    const newFeedback: Feedback = {
      ...data,
      id: `feedback-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.unshift(newFeedback);
    this.set(STORAGE_KEYS.FEEDBACKS, all);
    return newFeedback;
  }

  public updateFeedbackStatus(id: string, status: Feedback['status'], notes?: string): Feedback | null {
    const all = this.get<Feedback[]>(STORAGE_KEYS.FEEDBACKS, []);
    const index = all.findIndex((f) => f.id === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      status,
      moderatorNotes: notes !== undefined ? notes : all[index].moderatorNotes,
      updatedAt: new Date().toISOString(),
    };
    this.set(STORAGE_KEYS.FEEDBACKS, all);
    return all[index];
  }

  public deleteFeedback(id: string): boolean {
    const all = this.get<Feedback[]>(STORAGE_KEYS.FEEDBACKS, []);
    const filtered = all.filter((f) => f.id !== id);
    this.set(STORAGE_KEYS.FEEDBACKS, filtered);
    return true;
  }

  // Full Reset to empty state
  public resetToEmptyState(): void {
    this.set(STORAGE_KEYS.CONTENTS, []);
    this.set(STORAGE_KEYS.COMMENTS, []);
    this.set(STORAGE_KEYS.FEEDBACKS, []);
    this.set(STORAGE_KEYS.VIEWS, []);
  }
}

export const storageService = new StorageService();
