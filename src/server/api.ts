import express, { Request, Response } from 'express';

export const apiRouter = express.Router();

/**
 * DEFAULT MODERATOR CREDENTIALS (ISOLATED & HARDCODED)
 * Sesuai aturan: Tidak ada form registrasi untuk moderator.
 * Kredensial default:
 * - Username: "moderator oikonomia"
 * - Password: "mod123!@#"
 * KEAMANAN: Jangan pernah membocorkan kredensial ini di pesan error apapun.
 */
const MODERATOR_CREDENTIALS = {
  username: 'moderator oikonomia',
  password: 'mod123!@#',
};

// In-memory simulation of users registered via API
interface StoredUserRecord {
  id: string;
  fullName: string;
  username: string;
  passwordHash: string;
  role: 'moderator' | 'user';
  createdAt: string;
}

const registeredUsers: StoredUserRecord[] = [];

// ============================================================================
// 1. POST /api/auth/register (Pendaftaran User Umum: Nama Lengkap, Username, Password)
// SQL Representation:
// INSERT INTO users (id, full_name, username, password_hash, role)
// VALUES (uuid_generate_v4(), $1, $2, $3, 'user') RETURNING id, full_name, username, role, created_at;
// ============================================================================
apiRouter.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { fullName, username, password } = req.body;

    if (!fullName?.trim() || !username?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Nama Lengkap, Username, dan Password wajib diisi.',
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    // Check conflict with default moderator username
    if (cleanUsername === MODERATOR_CREDENTIALS.username.toLowerCase()) {
      return res.status(409).json({
        success: false,
        message: 'Username tersebut sudah digunakan. Silakan gunakan username lain.',
      });
    }

    const exists = registeredUsers.some((u) => u.username.toLowerCase() === cleanUsername);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'Username tersebut sudah terdaftar. Silakan pilih username lain.',
      });
    }

    const newUser: StoredUserRecord = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fullName: fullName.trim(),
      username: username.trim(),
      passwordHash: password.trim(), // In production: await bcrypt.hash(password, 12)
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    registeredUsers.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun berhasil.',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mendaftarkan akun.',
    });
  }
});

// ============================================================================
// 2. POST /api/auth/login (Login User Umum & Moderator)
// SQL Representation:
// SELECT * FROM users WHERE LOWER(username) = LOWER($1);
// ============================================================================
apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan Password wajib diisi.',
      });
    }

    const cleanUser = username.trim().toLowerCase();

    // 1. Check if moderator credentials
    if (cleanUser === MODERATOR_CREDENTIALS.username.toLowerCase() && password === MODERATOR_CREDENTIALS.password) {
      return res.status(200).json({
        success: true,
        message: 'Login moderator berhasil.',
        user: {
          id: 'moderator-fixed-id',
          fullName: 'Moderator Oikonomia',
          username: 'moderator oikonomia',
          role: 'moderator',
          createdAt: new Date().toISOString(),
        },
      });
    }

    // 2. Check registered users
    const matched = registeredUsers.find(
      (u) => u.username.toLowerCase() === cleanUser && u.passwordHash === password
    );

    if (matched) {
      return res.status(200).json({
        success: true,
        message: 'Login berhasil.',
        user: {
          id: matched.id,
          fullName: matched.fullName,
          username: matched.username,
          role: matched.role,
          createdAt: matched.createdAt,
        },
      });
    }

    // PENTING: Jangan bocorkan kredensial atau perbedaan status akun!
    return res.status(401).json({
      success: false,
      message: 'Username atau Password salah.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat login.',
    });
  }
});

// ============================================================================
// 3. POST /api/auth/moderator-login (Login Khusus Form Moderator)
// ============================================================================
apiRouter.post('/auth/moderator-login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan Password wajib diisi.',
      });
    }

    if (
      username.trim().toLowerCase() === MODERATOR_CREDENTIALS.username.toLowerCase() &&
      password === MODERATOR_CREDENTIALS.password
    ) {
      return res.status(200).json({
        success: true,
        message: 'Autentikasi moderator berhasil.',
        user: {
          id: 'moderator-fixed-id',
          fullName: 'Moderator Oikonomia',
          username: 'moderator oikonomia',
          role: 'moderator',
          createdAt: new Date().toISOString(),
        },
      });
    }

    // PENTING (KEAMANAN): Error generik tanpa membocorkan kredensial
    return res.status(401).json({
      success: false,
      message: 'Username atau Password salah.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ============================================================================
// 4. POST /api/comments (Menyimpan Komentar Pengguna Terdaftar)
// SQL Representation:
// INSERT INTO comments (id, content_id, user_id, comment_text, created_at, updated_at)
// VALUES (uuid_generate_v4(), $1, $2, $3, NOW(), NOW()) RETURNING *;
// ============================================================================
apiRouter.post('/comments', async (req: Request, res: Response) => {
  try {
    const { contentId, commentText, user } = req.body;

    if (!contentId || !commentText?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Content ID dan teks komentar tidak boleh kosong.',
      });
    }

    if (!user || !user.id || !user.username) {
      return res.status(401).json({
        success: false,
        message: 'Hanya pengguna terdaftar yang dapat memberikan komentar. Silakan login terlebih dahulu.',
      });
    }

    const newComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      contentId,
      userId: user.id,
      authorFullName: user.fullName || user.name || user.username,
      authorUsername: user.username,
      userRole: user.role,
      commentText: commentText.trim(),
      isEdited: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return res.status(201).json({
      success: true,
      message: 'Komentar berhasil disimpan.',
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat menyimpan komentar.',
    });
  }
});

// ============================================================================
// 5. PUT /api/comments/:id (Mengedit Komentar Sendiri)
// SQL Query:
// UPDATE comments SET comment_text = $1, is_edited = TRUE, updated_at = NOW()
// WHERE id = $2 AND user_id = $3 RETURNING *;
// ============================================================================
apiRouter.put('/comments/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { commentText, userId } = req.body;

    if (!commentText?.trim() || !userId) {
      return res.status(400).json({ success: false, message: 'Parameter tidak valid.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Komentar berhasil diperbarui.',
      data: {
        id,
        commentText: commentText.trim(),
        isEdited: true,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal memperbarui komentar.' });
  }
});

// ============================================================================
// 6. DELETE /api/comments/:id (Hapus Komentar - Pemilik atau Moderator)
// SQL Query:
// DELETE FROM comments WHERE id = $1 AND (user_id = $2 OR $3 = 'moderator');
// ============================================================================
apiRouter.delete('/comments/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, userRole } = req.body;

    if (userRole !== 'moderator' && !userId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki hak untuk menghapus komentar ini.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Komentar berhasil dihapus.',
      deletedId: id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghapus komentar.' });
  }
});
