import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import logoKionco from '../../assets/logo1.png';

export default function EditInformation({ onBack, onSave, initialData }) {
  const [activeMenu, setActiveMenu] = useState('Informasi');
  const [informasi, setInformasi] = useState(initialData ? initialData.informasi : '');
  
  // imagePreview untuk menampilkan gambar di layar (mengarahkan ke folder uploads server jika sedang edit)
  const [imagePreview, setImagePreview] = useState(
    initialData && initialData.gambar_url 
      ? `http://localhost:5000/uploads/${initialData.gambar_url}` 
      : null
  );
  
  // State khusus menampung objek file fisik binary baru (.png/.jpg asli)
  const [fileObject, setFileObject] = useState(null); 
  const fileInputRef = useRef(null);

  const menuItems = [
    { name: 'Informasi', label: 'Informasi' },
    { name: 'mitra campus', label: 'mitra campus' },
    { name: 'jadwal', label: 'jadwal' },
    { name: 'biaya', label: 'biaya' },
    { name: 'daftar siswa', label: 'daftar siswa' },
  ];

  // Menangani seleksi file fisik baru dari komputer
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileObject(file); // Simpan file fisik ke state untuk dikirim ke Node.js
      setImagePreview(URL.createObjectURL(file)); // Membuat URL lokal sementara untuk preview di kotak putih
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buat bungkusan FormData baru
    const formDataToSend = new FormData();
    formDataToSend.append('informasi', informasi);
    
    if (fileObject) {
      // 1. KONDISI JIKA ADA FILE BARU: Kirim file fisik asli ke server
      formDataToSend.append('gambar_file', fileObject); 
    } else if (initialData && initialData.gambar_url) {
      // 2. 👉 PERBAIKAN UTAMA: Jika tidak ada file baru, kirim string nama file gambar lama agar tidak ter-reset ke placeholder!
      formDataToSend.append('gambar_url', initialData.gambar_url);
    }

    const isEdit = initialData && initialData.id;
    const url = isEdit 
      ? `http://localhost:5000/api/informasi/${initialData.id}` 
      : 'http://localhost:5000/api/informasi';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formDataToSend // Mengirim objek FormData utuh tanpa JSON.stringify
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.error) });
      }
      return res.json();
    })
    .then(() => {
      alert(isEdit ? 'Data Informasi berhasil diperbarui!' : 'Data & File Gambar baru berhasil ditambahkan!');
      if (onSave) onSave(); // Refresh data tabel dashboard utama
      if (onBack) onBack(); // Otomatis kembali ke panel tabel utama
    })
    .catch(err => {
      console.error("Gagal menyimpan data:", err);
      alert(err.message || "Terjadi kesalahan koneksi ke server backend.");
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
        
        {/* SIDEBAR NAVIGASI */}
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

        {/* DYNAMIC FORM CARD ORANYE */}
        <main className="flex-1 bg-[#FFB370] rounded-3xl p-8 shadow-sm flex flex-col w-full">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
              
              {/* Kolom Teks Informasi */}
              <div className="md:col-span-7 flex flex-col gap-2 w-full">
                <label className="text-sm font-bold text-white tracking-wide text-left">
                  Informasi
                </label>
                <textarea
                  required
                  value={informasi}
                  onChange={(e) => setInformasi(e.target.value)}
                  placeholder="Ketik informasi di sini..."
                  className="w-full h-64 px-4 py-4 bg-white border border-transparent focus:border-[#CC6A14] rounded-2xl text-xs font-medium text-gray-700 outline-none transition-colors shadow-inner resize-none leading-relaxed"
                />
              </div>

              {/* Kolom Upload & Preview Gambar */}
              <div className="md:col-span-5 flex flex-col items-center pt-8 w-full">
                <div className="w-48 h-48 bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm relative overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                  ) : (
                    <svg className="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
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
                  className="mt-4 px-4 py-2 bg-[#FF9233] hover:bg-[#E67E22] text-white text-[11px] font-bold rounded-lg tracking-wide transition-colors uppercase shadow-sm"
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