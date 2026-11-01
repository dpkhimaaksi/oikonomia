-- ============================================================================
-- OIKONOMIA DATABASE SCHEMA (PostgreSQL / Relational DDL)
-- Version: 3.0 (Clean Architecture with Standard Auth & Role-Based Access Control)
-- ============================================================================

-- 1. EXTENSIONS (UUID generation)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
CREATE TYPE user_role_enum AS ENUM ('moderator', 'user');
CREATE TYPE content_type_enum AS ENUM ('materi', 'berita');
CREATE TYPE materi_category_enum AS ENUM ('akuntansi', 'mikro', 'makro');
CREATE TYPE feedback_status_enum AS ENUM ('unread', 'read', 'resolved');

-- 3. TABLE: roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES
('moderator', 'Pengelola sistem dengan akses penuh ke Dashboard, CRUD konten, moderasi komentar, dan kotak masukan.'),
('user', 'Pengguna umum terdaftar yang dapat membaca konten, mengunduh lampiran, berkomentar, dan mengirim masukan.')
ON CONFLICT (name) DO NOTHING;

-- 4. TABLE: users
-- Menyimpan data registrasi user biasa (Nama Lengkap, Username, Password) serta akun moderator default
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user' REFERENCES roles(name) ON UPDATE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- Akun Default Moderator (username: "moderator oikonomia", password: "mod123!@#")
-- Catatan Keamanan: Hash bcrypt disimulasikan untuk lingkungan produksi
INSERT INTO users (id, full_name, username, password_hash, role) VALUES
(
    uuid_generate_v4(),
    'Moderator Oikonomia',
    'moderator oikonomia',
    '$2b$12$e8J3mQW1z...mod123!@#',
    'moderator'
) ON CONFLICT (username) DO NOTHING;

-- 5. TABLE: materials_news (Materi & Berita)
-- Kondisi awal bersih (0 baris data bawaan), hanya diisi oleh moderator dari Dashboard
CREATE TABLE IF NOT EXISTS materials_news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    type content_type_enum NOT NULL, -- 'materi' atau 'berita'
    category materi_category_enum,   -- Hanya untuk materi: 'akuntansi' | 'mikro' | 'makro'
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    thumbnail_url TEXT,
    
    -- File Attachment (.pdf & .xlsx support)
    attachment_name VARCHAR(255),
    attachment_type VARCHAR(100),    -- 'application/pdf' atau 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    attachment_url TEXT,             -- URL file atau base64 payload
    attachment_size_bytes BIGINT,
    
    -- Status & Analytics
    is_published BOOLEAN DEFAULT TRUE,
    views_count BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_materials_news_type ON materials_news(type);
CREATE INDEX idx_materials_news_category ON materials_news(category);
CREATE INDEX idx_materials_news_created_at ON materials_news(created_at DESC);
CREATE INDEX idx_materials_news_slug ON materials_news(slug);

-- 6. TABLE: views_tracking (Pelacakan Kunjungan & Pembaca Publik)
CREATE TABLE IF NOT EXISTS views_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES materials_news(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL jika pengunjung tamu belum login
    ip_address VARCHAR(45),
    user_agent TEXT,
    viewed_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_views_content_id ON views_tracking(content_id);
CREATE INDEX idx_views_date ON views_tracking(viewed_date);

-- 7. TABLE: comments (Komentar Pengguna Terdaftar)
-- User umum terdaftar dapat menambah, mengedit, dan menghapus komentar sendiri.
-- Moderator memiliki wewenang menghapus komentar apapun.
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES materials_news(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_content_id ON comments(content_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at ASC);

-- 8. TABLE: feedbacks (Kotak Masukan Pengguna Terdaftar ke Moderator)
CREATE TABLE IF NOT EXISTS feedbacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    sender_name VARCHAR(150) NOT NULL,
    sender_email VARCHAR(255),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status feedback_status_enum NOT NULL DEFAULT 'unread',
    moderator_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedbacks_status ON feedbacks(status);
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC);
