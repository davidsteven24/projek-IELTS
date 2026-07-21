import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoKionco from '../../assets/logo1.png';

function EditBiayaPaket({ mode, onBack, onSave }) {
  const [namaPaket, setNamaPaket] = useState('');
  const [harga, setHarga] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      nama_paket: namaPaket,
      harga: parseInt(harga) || 0
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="w-full max-w-xl bg-white rounded-3xl p-8 border border-orange-100 shadow-sm text-black"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800">
          {mode === 'new' ? 'Tambah Paket Biaya Baru' : 'Edit Paket Biaya'}
        </h3>
        <button 
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Program / Paket</label>
          <input
            type="text"
            required
            value={namaPaket}
            onChange={(e) => setNamaPaket(e.target.value)}
            placeholder="contoh: IELTS ONLINE CLASS"
            className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nominal Biaya (Rp)</label>
          <input
            type="number"
            required
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="contoh: 2400000"
            className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#FF9233] hover:bg-orange-600 text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors"
        >
          Simpan Informasi Biaya
        </button>
      </form>
    </motion.div>
  );
}

export default function BiayaDashboard() {
  const [currentView, setCurrentView] = useState('card'); 
  const [listBiaya, setListBiaya] = useState([]);

  useEffect(() => {
    fetchBiayaData();
  }, []);

  const fetchBiayaData = () => {
    fetch('http://localhost:5000/api/biaya')
      .then(res => res.json())
      .then(data => setListBiaya(data))
      .catch(err => console.error(err));
  };

  const menuItems = [
    { name: 'Informasi', label: 'Informasi', path: '/admin' },
    { name: 'mitra campus', label: 'mitra campus', path: '/admin/mitra' },
    { name: 'jadwal', label: 'jadwal', path: '/admin/jadwal' },
    { name: 'biaya', label: 'biaya', path: '/admin/biaya' },
    { name: 'daftar siswa', label: 'daftar siswa', path: '/admin/siswa' },
  ];

  const handleNewClick = () => {
    setCurrentView('new');
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus paket biaya ini?')) {
      fetch(`http://localhost:5000/api/biaya/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(() => {
        alert('Data berhasil dihapus!');
        fetchBiayaData();
      })
      .catch(err => console.error(err));
    }
  };

  const handleSaveData = (newData) => {
    fetch('http://localhost:5000/api/biaya', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(() => {
      alert(`Paket ${newData.nama_paket} berhasil disimpan ke database.`);
      setCurrentView('card');
      fetchBiayaData();
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-sans flex flex-col select-none">
      
      <header className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
           <img 
                        src={logoKionco} 
                        alt="Logo Kion &amp; Co" 
                        className="h-12 w-auto object-contain"
                         
                      />
        </div>
        <Link to="/" className="text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-4 py-2 rounded-xl transition-colors">
          Logout
        </Link>
      </header>

      <div className="flex flex-1 w-full max-w-7xl mx-auto p-6 gap-8 items-start">
        
        <aside className="w-64 bg-[#FF9233] rounded-3xl p-4 flex flex-col gap-2 shadow-xl shadow-orange-500/5 flex-shrink-0">
          {menuItems.map((item) => {
            const isActive = item.name === 'biaya';
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full px-5 py-3.5 rounded-xl text-sm font-bold capitalize text-left transition-all block ${
                  isActive 
                    ? 'bg-[#CC6A14] text-white shadow-inner' 
                    : 'text-white/90 hover:bg-[#E67E22] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            
            {currentView === 'card' && (
              <motion.div 
                key="card-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-2xl flex flex-col items-center"
              >
                <div className="mb-4 px-8 py-1.5 bg-[#FF9233] rounded-xl shadow-sm">
                  <span className="text-xs font-bold text-white tracking-wide">
                    Price List
                  </span>
                </div>

                <div className="w-full bg-[#FFB370] rounded-3xl p-10 shadow-sm relative flex flex-col gap-6 text-black">
                  
                  <button
                    type="button"
                    onClick={handleNewClick}
                    className="absolute top-6 right-8 px-6 py-1.5 bg-[#FF9233] hover:bg-[#E67E22] text-white text-xs font-bold rounded-xl tracking-wide transition-colors"
                  >
                    New
                  </button>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {listBiaya.length > 0 ? (
                      listBiaya.map((item) => (
                        <div key={item.id} className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/20 flex flex-col justify-between shadow-sm">
                          <div>
                            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wide">{item.nama_paket}</h4>
                            <p className="text-lg font-bold text-[#CC6A14] mt-1">Rp {item.harga.toLocaleString('id-ID')}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(item.id)}
                            className="mt-4 w-full py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold rounded-xl transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-white font-medium text-sm">
                        Tidak ada info biaya di database. Klik "New" untuk menambahkan.
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

            {currentView === 'new' && (
              <EditBiayaPaket 
                mode="new"
                onBack={() => setCurrentView('card')}
                onSave={handleSaveData}
              />
            )}

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}