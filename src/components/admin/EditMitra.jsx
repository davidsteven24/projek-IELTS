import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import logoKionco from '../../assets/logo1.png';

export default function EditMitraCampus({ onBack, onSave, initialData }) {
  const [activeMenu, setActiveMenu] = useState('mitra campus');
  const [nama, setNama] = useState(initialData ? initialData.nama : '');
  const [link, setLink] = useState(initialData ? initialData.link : '');
  
  // Menampilkan preview foto (arahkan ke server jika sedang mengedit data lama)
  const [imagePreview, setImagePreview] = useState(
    initialData && initialData.gambar_url 
      ? `http://localhost:5000/uploads/${initialData.gambar_url}` 
      : null
  );
  
  // State khusus untuk menampung file objek biner asli dari perangkat
  const [fileObject, setFileObject] = useState(null);
  const fileInputRef = useRef(null);

  const menuItems = [
    { name: 'Informasi', label: 'Informasi' },
    { name: 'mitra campus', label: 'mitra campus' },
    { name: 'jadwal', label: 'jadwal' },
    { name: 'biaya', label: 'biaya' },
    { name: 'daftar siswa', label: 'daftar siswa' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileObject(file); // Simpan objek file fisik untuk dikirim ke API
      setImagePreview(URL.createObjectURL(file)); // Membuat link lokal untuk preview gambar
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Bungkus semua isian menggunakan FormData agar bisa mengirim file mentah
    const formDataToSend = new FormData();
    formDataToSend.append('nama', nama);
    formDataToSend.append('link', link);
    
    if (fileObject) {
      formDataToSend.append('gambar_file', fileObject);
    } else if (initialData && initialData.gambar_url) {
      // 👉 Tambahan: Mempertahankan logo lama jika admin hanya edit teks nama/link saja
      formDataToSend.append('gambar_url', initialData.gambar_url);
    }

    const isEdit = initialData && initialData.id;
    const url = isEdit 
      ? `http://localhost:5000/api/mitra/${initialData.id}` 
      : 'http://localhost:5000/api/mitra';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formDataToSend // Kirim langsung objek FormData tanpa JSON.stringify atau headers tambahan
    })
    .then(res => res.json())
    .then(() => {
      alert(isEdit ? 'Data Mitra Campus berhasil diperbarui!' : 'Data Mitra Campus berhasil ditambahkan!');
      if (onSave) onSave(); // Segarkan data tabel di dashboard utama
      if (onBack) onBack(); // Otomatis kembali ke halaman tabel panel admin
    })
    .catch(err => {
      console.error("Gagal menyambung ke server:", err);
      alert("Terjadi kesalahan koneksi ke server backend.");
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F2F5F9] font-sans flex flex-col select-none text-black">
      
      {/* 1. TOP HEADER */}
      <header className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <img 
            src={logoKionco} 
            alt="Logo Kion &amp; Co" 
            className="h-12 w-auto object-contain"
          />
        </div>
        {onBack && (
          <button 
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-bold transition-colors"
          >
            ← Kembali ke Tabel
          </button>
        )}
      </header>

      {/* 2. MAIN CONTAINER WORKSPACE */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto p-6 gap-8 items-start">
        
        {/* SISI SEBELAH KIRI: SIDEBAR NAVIGASI */}
        <aside className="w-64 bg-[#FF9233] rounded-3xl p-4 flex flex-col gap-2 shadow-lg flex-shrink-0">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveMenu(item.name)}
                className={`w-full px-5 py-3.5 rounded-xl text-sm font-bold capitalize text-left transition-all ${
                  isActive 
                    ? 'bg-[#CC6A14] text-white shadow-inner' 
                    : 'text-white/90 hover:bg-[#E67E22] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* SISI SEBELAH KANAN: FORM CARD ORANYE */}
        <main className="flex-1 bg-[#FFB370] rounded-3xl p-8 shadow-sm flex flex-col w-full">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
              
              {/* Kolom Isian Data Kiri (Nama & Link) */}
              <div className="md:col-span-7 flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-white tracking-wide text-left">Nama</label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama mitra kampus"
                    className="w-full px-4 py-3 bg-white border border-transparent focus:border-[#CC6A14] rounded-xl text-xs font-medium text-gray-700 outline-none transition-all shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-white tracking-wide text-left">Link</label>
                  <input
                    type="url"
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Masukkan tautan link website"
                    className="w-full px-4 py-3 bg-white border border-transparent focus:border-[#CC6A14] rounded-xl text-xs font-medium text-gray-700 outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Kolom Upload & Preview Gambar Kanan */}
              <div className="md:col-span-5 flex flex-col items-center w-full">
                <div className="w-48 h-48 bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm relative overflow-hidden">
                  {/* 👉 PERBAIKAN: Menggunakan state 'imagePreview' untuk membaca gambar secara dinamis */}
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Logo Kampus" 
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => { e.target.src = 'https://placehold.co/150'; }} 
                    />
                  ) : (
                    <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="mt-4 px-4 py-1.5 bg-[#FF9233] hover:bg-[#E67E22] text-white text-[11px] font-bold rounded-lg tracking-wide transition-colors uppercase shadow-sm"
                >
                  upload image
                </button>
              </div>

            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="px-16 py-2.5 bg-[#FF9233] hover:bg-[#E67E22] text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition-colors"
            >
              upload
            </motion.button>

          </form>
        </main>

      </div>
    </div>
  );
}