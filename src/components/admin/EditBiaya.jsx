import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoKionco from '../../assets/logo1.png';
// ==========================================
// 1. SUB-KOMPONEN: FORM EDIT & TAMBAH BENEFIT (MODEL TERPISAH)
// ==========================================
function EditBiayaForm({ onBack, onSave, initialData }) {
  const [benefitText, setBenefitText] = useState(initialData ? initialData.benefit : '');
  const [harga, setHarga] = useState(initialData ? initialData.harga : '');
  const [imagePreview, setImagePreview] = useState(initialData ? initialData.gambar_url : null);
  const fileInputRef = useRef(null);

  // Menangani perubahan file gambar ke format Base64 teks panjang
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      benefit: benefitText,
      harga: Number(harga),
      gambar_url: imagePreview || 'placeholder-package.png'
    };

    const isEdit = initialData && initialData.id;
    const url = isEdit 
      ? `http://localhost:5000/api/paket-biaya/${initialData.id}` 
      : 'http://localhost:5000/api/paket-biaya';
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
      alert(isEdit ? 'Data Benefit & Biaya berhasil diperbarui!' : 'Data Benefit & Biaya berhasil disimpan!');
      if (onSave) onSave(); 
      if (onBack) onBack(); 
    })
    .catch(err => {
      console.error("Gagal menyimpan data:", err);
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
      {/* Top Row Form */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 w-full">
        <h3 className="text-lg font-black text-gray-800 tracking-tight">
          {initialData ? 'Edit Benefit & Cost Package' : 'Add New Benefit Package'}
        </h3>
        <button 
          type="button" 
          onClick={onBack}
          className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Sektor Kiri: Input Data Terpisah */}
        <div className="md:col-span-8 flex flex-col gap-5 w-full text-left">
          
          {/* 1. Input Benefit */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Benefit Yang Didapatkan
            </label>
            <input
              type="text"
              required
              value={benefitText}
              onChange={(e) => setBenefitText(e.target.value)}
              placeholder="contoh: Certified Intensive IELTS Prep Modules"
              className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
            />
          </div>

          {/* 2. Input Nominal Biaya */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Nominal Biaya (RP)
            </label>
            <input
              type="number"
              required
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="contoh: 2400000"
              className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
            />
          </div>

        </div>

        {/* Sektor Kanan: Upload Gambar */}
        <div className="md:col-span-4 flex flex-col items-center w-full pt-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 self-start md:self-center">
            Package Image
          </label>
          <div className="w-full aspect-square max-w-[150px] bg-neutral-50 border border-gray-200 rounded-2xl p-3 flex items-center justify-center shadow-inner relative overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <button
            type="button"
            onClick={handleUploadClick}
            className="mt-3 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-gray-600 text-[10px] font-bold rounded-lg tracking-wide transition-colors uppercase w-full max-w-[150px]"
          >
            Choose Image
          </button>
        </div>

        {/* Tombol Simpan Aksi */}
        <div className="p-1 col-span-1 md:col-span-12 w-full mt-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF9233] hover:bg-[#E67E22] text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors uppercase"
          >
            Simpan Informasi Biaya
          </button>
        </div>

      </form>
    </motion.div>
  );
}

// ==========================================
// 2. KOMPONEN UTAMA: BIAYA DASHBOARD
// ==========================================
export default function BiayaDashboard() {
  const [currentView, setCurrentView] = useState('card'); 
  const [listPaket, setListPaket] = useState([]);
  const [selectedData, setSelectedData] = useState(null); 

  useEffect(() => {
    fetchPaketData();
  }, []);

  const fetchPaketData = () => {
    fetch('http://localhost:5000/api/paket-biaya')
      .then(res => res.json())
      .then(data => setListPaket(data))
      .catch(err => console.error("Gagal mengambil data:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus paket biaya ini?')) {
      fetch(`http://localhost:5000/api/paket-biaya/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          alert('Data berhasil dihapus!');
          fetchPaketData();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (item) => {
    setSelectedData(item); 
    setCurrentView('form'); 
  };

  const handleNewClick = () => {
    setSelectedData(null); 
    setCurrentView('form');
  };

  const menuItems = [
    { name: 'Informasi', label: 'Informasi', path: '/admin' },
    { name: 'mitra campus', label: 'mitra campus', path: '/admin/mitra' },
    { name: 'jadwal', label: 'jadwal', path: '/admin/jadwal' },
    { name: 'biaya', label: 'biaya', path: '/admin/biaya' },
    { name: 'daftar siswa', label: 'daftar siswa', path: '/admin/siswa' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-sans flex flex-col select-none text-black">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <img 
                        src={logoKionco} 
                        alt="Logo Kion &amp; Co" 
                        className="h-12 w-auto object-contain"
                         
                      />
        </div>
        <Link to="/" className="text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-4 py-2 rounded-xl">Logout</Link>
      </header>

      {/* WORKSPACE AREA */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto p-6 gap-8 items-start">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#FF9233] rounded-3xl p-4 flex flex-col gap-2 shadow-xl flex-shrink-0">
          {menuItems.map((item) => {
            const isActive = item.name === 'biaya';
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full px-5 py-3.5 rounded-xl text-sm font-bold capitalize text-left block transition-all ${
                  isActive ? 'bg-[#CC6A14] text-white shadow-inner' : 'text-white/90 hover:bg-[#E67E22] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* CONTROLLER VIEW */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            
            {currentView === 'card' && (
              <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl flex flex-col items-center">
                <div className="mb-4 px-8 py-1.5 bg-[#FF9233] rounded-xl shadow-sm text-white text-xs font-bold uppercase">Benefit Info List</div>
                
                <div className="w-full bg-[#FFB370] rounded-3xl p-10 relative text-black">
                  <button type="button" onClick={handleNewClick} className="absolute top-6 right-8 px-6 py-1.5 bg-[#FF9233] text-white text-xs font-bold rounded-xl hover:bg-[#E67E22]">
                    New
                  </button>

                  {/* Grid Menampilkan Gambar dan Benefit dari DB */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
                    {listPaket.length > 0 ? (
                      listPaket.map((item) => (
                        <div key={item.id} className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl flex gap-4 shadow-sm border border-white/20">
                          <img src={item.gambar_url} alt="Package" className="w-24 h-32 object-contain bg-white rounded-xl p-1 border flex-shrink-0" />
                          <div className="flex flex-col justify-between flex-1 text-left">
                            <div>
                              <p className="text-xs text-gray-800 font-extrabold mb-1">Benefit Package:</p>
                              <p className="text-xs text-gray-600 font-medium line-clamp-3 whitespace-pre-wrap">{item.benefit}</p>
                              {item.harga && (
                                <p className="text-xs font-bold text-[#CC6A14] mt-1 font-mono">Rp {Number(item.harga).toLocaleString('id-ID')}</p>
                              )}
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button type="button" onClick={() => handleEditClick(item)} className="flex-1 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] rounded-lg">Edit</button>
                              <button type="button" onClick={() => handleDelete(item.id)} className="flex-1 py-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] rounded-lg">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-white font-medium text-sm">Belum ada info benefit paket. Klik "New" untuk menambah.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {currentView === 'form' && (
              <EditBiayaForm 
                initialData={selectedData} 
                onBack={() => setCurrentView('card')} 
                onSave={fetchPaketData} 
              />
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}