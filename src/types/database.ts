export type UserRole = 'moderator' | 'user';

export interface User {
  id: string;
  fullName: string;
  username: string;
  password?: string;
  role: UserRole;
  createdAt: string;
  name?: string; // Compatibility alias to fullName
}

export type ContentType = 'materi' | 'berita';
export type MateriCategory = 'akuntansi' | 'mikro' | 'makro';

export interface FileAttachment {
  name: string;
  type: string; // 'application/pdf' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  sizeBytes: number;
  dataUrl?: string; // base64 payload for direct preview and download
}

export interface MaterialNewsItem {
  id: string;
  authorId: string;
  authorName: string;
  type: ContentType;
  category?: MateriCategory; // required if type === 'materi'
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown or rich text
  attachment?: FileAttachment;
  isPublished: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ViewTrackingRecord {
  id: string;
  contentId: string;
  userId?: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
}

export interface Comment {
  id: string;
  contentId: string;
  userId: string;
  authorFullName: string;
  authorUsername: string;
  userName?: string; // backward compat alias
  userRole: UserRole;
  commentText: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FeedbackStatus = 'unread' | 'read' | 'resolved';

export interface Feedback {
  id: string;
  senderUserId?: string;
  senderName: string;
  senderUsername?: string;
  senderEmail?: string;
  subject: string;
  message: string;
  status: FeedbackStatus;
  moderatorNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorAnalytics {
  totalVisitors: number;
  totalPageViews: number;
  dailyViews: { date: string; views: number }[];
  weeklyViews: { week: string; views: number }[];
  monthlyViews: { month: string; views: number }[];
  topArticles: { id: string; title: string; type: ContentType; views: number }[];
}
