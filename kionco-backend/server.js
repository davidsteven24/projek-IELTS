import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.filename + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Gagal menyambung ke MySQL Laragon:', err.message);
        console.log('👉 Pastikan Laragon sudah di-Start dan database "' + process.env.DB_NAME + '" sudah kamu buat di HeidiSQL.');
        return;
    }
    console.log('✅ Berhasil terhubung ke database MySQL Laragon!');
});

app.get('/', (req, res) => {
    res.send('Selamat! Server Node.js Kionco kamu sudah berjalan di localhost.');
});

// ==========================================
// API RESOURCE: SISWA
// ==========================================
app.get('/api/siswa', (req, res) => {
    db.query('SELECT * FROM siswa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/siswa', (req, res) => {
    const { nama, kota, sekolah, kelas, no_hp } = req.body;
    const query = 'INSERT INTO siswa (nama, kota, sekolah, kelas, no_hp) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [nama, kota, sekolah, kelas, no_hp], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Siswa baru berhasil didaftarkan!', id: result.insertId });
    });
});

app.delete('/api/siswa/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM siswa WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data siswa berhasil dihapus!' });
    });
});

// ==========================================
// API RESOURCE: BIAYA UTAMA
// ==========================================
app.get('/api/biaya', (req, res) => {
    db.query('SELECT * FROM biaya', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/biaya', (req, res) => {
    const { nama_paket, harga } = req.body;
    db.query('INSERT INTO biaya (nama_paket, harga) VALUES (?, ?)', [nama_paket, harga], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data biaya berhasil disimpan!', id: result.insertId });
    });
});

app.delete('/api/biaya/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM biaya WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data biaya berhasil dihapus!' });
    });
});

// ==========================================
// API RESOURCE: PAKET BENEFIT & BIAYA (👉 PERBAIKAN)
// ==========================================
app.get('/api/paket-biaya', (req, res) => {
    db.query('SELECT * FROM paket_biaya', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// PERBAIKAN: Menambahkan tampungan field 'harga' dari form baru
app.post('/api/paket-biaya', (req, res) => {
    const { benefit, harga, gambar_url } = req.body;
    const query = 'INSERT INTO paket_biaya (benefit, harga, gambar_url) VALUES (?, ?, ?)';
    db.query(query, [benefit, harga || 0, gambar_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data benefit & harga berhasil disimpan!', id: result.insertId });
    });
});

// PERBAIKAN: Menambahkan update field 'harga' pada saat edit data
app.put('/api/paket-biaya/:id', (req, res) => {
    const { id } = req.params;
    const { benefit, harga, gambar_url } = req.body;
    const query = 'UPDATE paket_biaya SET benefit = ?, harga = ?, gambar_url = ? WHERE id = ?';
    db.query(query, [benefit, harga || 0, gambar_url, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data paket biaya berhasil diperbarui!' });
    });
});

app.delete('/api/paket-biaya/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM paket_biaya WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data berhasil dihapus!' });
    });
});

// ==========================================
// API RESOURCE: INFORMASI KAMPUS (👉 PERBAIKAN POPUP PLACEHOLDER)
// ==========================================
app.get('/api/informasi', (req, res) => {
    db.query('SELECT * FROM informasi', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/informasi', upload.single('gambar_file'), (req, res) => {
    const { informasi } = req.body;
    const namaGambar = req.file ? req.file.filename : 'placeholder.png';

    const query = 'INSERT INTO informasi (informasi, gambar_url) VALUES (?, ?)';
    db.query(query, [informasi, namaGambar], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data & File berhasil disimpan!', id: result.insertId });
    });
});

app.put('/api/informasi/:id', upload.single('gambar_file'), (req, res) => {
    const { id } = req.params;
    const { informasi, gambar_url } = req.body;
    
    if (req.file) {
        const namaGambarBaru = req.file.filename;
        const query = 'UPDATE informasi SET informasi = ?, gambar_url = ? WHERE id = ?';
        db.query(query, [informasi, namaGambarBaru, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Informasi & Gambar Berhasil Diperbarui!' });
        });
    } else {
        // PERBAIKAN: Mempertahankan nama file gambar lama (gambar_url) jika tidak upload file fisik baru
        const query = 'UPDATE informasi SET informasi = ?, gambar_url = ? WHERE id = ?';
        const namaGambarTeks = gambar_url || 'placeholder.png';
        db.query(query, [informasi, namaGambarTeks, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Teks Informasi Berhasil Diperbarui!' });
        });
    }
});

app.delete('/api/informasi/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM informasi WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Informasi berhasil dihapus!' });
    });
});

// ==========================================
// API RESOURCE: JADWAL KELAS (MATA PELAJARAN)
// ==========================================
app.get('/api/jadwal', (req, res) => {
    db.query('SELECT * FROM jadwal ORDER BY FIELD(hari, "Senin", "Selasa", "Rabu", "Kamis", "Jumat"), waktu', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/jadwal', (req, res) => {
    const { hari, waktu, mata_pelajaran } = req.body;

    if (!hari || !waktu || !mata_pelajaran) {
        return res.status(400).json({ error: "Semua data (hari, waktu, mata pelajaran) wajib diisi!" });
    }

    const query = 'INSERT INTO jadwal (hari, waktu, mata_pelajaran) VALUES (?, ?, ?)';
    db.query(query, [hari, waktu, mata_pelajaran], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Jadwal baru berhasil disimpan!', id: result.insertId });
    });
});

app.put('/api/jadwal/:id', (req, res) => {
    const { id } = req.params;
    const { hari, waktu, mata_pelajaran } = req.body;

    if (!hari || !waktu || !mata_pelajaran) {
        return res.status(400).json({ error: "Semua data (hari, waktu, mata pelajaran) wajib diisi!" });
    }

    const query = 'UPDATE jadwal SET hari = ?, waktu = ?, mata_pelajaran = ? WHERE id = ?';
    db.query(query, [hari, waktu, mata_pelajaran, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data Jadwal berhasil diperbarui!' });
    });
});

app.delete('/api/jadwal/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM jadwal WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Jadwal berhasil dihapus!' });
    });
});

// ==========================================
// API RESOURCE: MITRA CAMPUS
// ==========================================
app.get('/api/mitra', (req, res) => {
    db.query('SELECT * FROM mitra', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/mitra', upload.single('gambar_file'), (req, res) => {
    const { nama, link } = req.body;
    const namaGambar = req.file ? req.file.filename : 'placeholder-logo.png';
    const query = 'INSERT INTO mitra (nama, link, gambar_url) VALUES (?, ?, ?)';
    db.query(query, [nama, link, namaGambar], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mitra berhasil disimpan!', id: result.insertId });
    });
});

app.put('/api/mitra/:id', upload.single('gambar_file'), (req, res) => {
    const { id } = req.params;
    const { nama, link } = req.body;
    
    if (req.file) {
        const namaGambarBaru = req.file.filename;
        const query = 'UPDATE mitra SET nama = ?, link = ?, gambar_url = ? WHERE id = ?';
        db.query(query, [nama, link, namaGambarBaru, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Mitra dan Gambar berhasil diperbarui!' });
        });
    } else {
        const query = 'UPDATE mitra SET nama = ?, link = ? WHERE id = ?';
        db.query(query, [nama, link, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Teks Informasi Mitra berhasil diperbarui!' });
        });
    }
});

app.delete('/api/mitra/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM mitra WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mitra berhasil dihapus!' });
    });
});

// ==========================================
// API RESOURCE: AUTH LOGIN
// ==========================================
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Email atau Password salah!' });
        }

        res.json({ message: 'Login berhasil!', user: { id: results[0].id, email: results[0].email } });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});