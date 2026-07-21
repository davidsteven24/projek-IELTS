import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EditJadwalForm({ onBack, onSave, initialData }) {
  // State masing-masing input terpisah sesuai model gambar
  const [hari, setHari] = useState(initialData ? initialData.hari : 'Senin');
  const [waktu, setWaktu] = useState(initialData ? initialData.waktu : '');
  const [mataPelajaran, setMataPelajaran] = useState(
    initialData ? (initialData.mata_pelajaran || initialData.mata_kuliah) : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data dikirim sebagai objek field terpisah (bukan full_text lagi)
    const payload = {
      hari,
      waktu,
      mata_pelajaran: mataPelajaran
    };

    const isEdit = initialData && initialData.id;
    const url = isEdit 
      ? `http://localhost:5000/api/jadwal/${initialData.id}` 
      : 'http://localhost:5000/api/jadwal';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.error) });
      }
      return res.json();
    })
    .then(() => {
      alert(isEdit ? 'Data Jadwal berhasil diperbarui!' : 'Jadwal baru berhasil disimpan!');
      if (onSave) onSave();
      if (onBack) onBack();
    })
    .catch(err => {
      console.error("Gagal menyambung ke server:", err);
      alert(err.message || "Terjadi kesalahan koneksi ke server backend.");
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col w-full text-black max-w-2xl mx-auto"
    >
      {/* Bagian Atas Form */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-lg font-black text-gray-800 tracking-tight">
          {initialData ? 'Edit Jadwal Kelas' : 'Tambah Jadwal Baru'}
        </h3>
        <button 
          type="button"
          onClick={onBack}
          className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Kembali
        </button>
      </div>

      {/* Konten Form Input */}
      <form onSubmit={handleSubmit} className="space-y-6 w-full text-left">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Pilihan Hari Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hari</label>
            <select
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
            >
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* 2. Input Jam/Waktu */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jam Kelas</label>
            <input
              type="text"
              required
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
              placeholder="contoh: 17:00 - 19:00"
              className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
            />
          </div>
        </div>

        {/* 3. Input Nama Mata Pelajaran */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mata Pelajaran</label>
          <input
            type="text"
            required
            value={mataPelajaran}
            onChange={(e) => setMataPelajaran(e.target.value)}
            placeholder="Masukkan nama mata pelajaran / jenis kelas..."
            className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
          />
        </div>

        {/* Tombol Simpan Aksen Oranye */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#FF9233] hover:bg-[#E67E22] text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors uppercase mt-2"
        >
          Simpan Jadwal
        </button>

      </form>
    </motion.div>
  );
}