import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoKionco from '../../assets/logo1.png';

function EditMitraCampus({ mode, data, onBack, onSave }) {
  const [formData, setFormData] = useState({
    nama: data ? data.nama : '',
    link: data ? data.link : '',
    gambarUrl: data ? data.gambar_url : '', 
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      nama: formData.nama,
      link: formData.link,
      gambar_url: formData.gambarUrl
    };

    const isEdit = mode === 'edit' && data?.id;
    const url = isEdit 
      ? `http://localhost:5000/api/mitra/${data.id}` 
      : 'http://localhost:5000/api/mitra';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(() => {
      alert(isEdit ? 'Data Mitra Campus berhasil diperbarui!' : 'Mitra Campus baru berhasil ditambahkan!');
      if (onSave) onSave(); 
      if (onBack) onBack(); 
    })
    .catch(err => console.error(err));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-orange-100 shadow-sm text-black"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800">
          {mode === 'edit' ? 'Edit Mitra Campus' : 'Tambah Mitra Campus Baru'}
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
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Kampus / Institusi</label>
          <input
            type="text"
            required
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            placeholder="Masukkan nama mitra kampus..."
            className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Link Website</label>
          <input
            type="url"
            required
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com"
            className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nama File Gambar / Logo</label>
          <input
            type="text"
            required
            value={formData.gambarUrl}
            onChange={(e) => setFormData({ ...formData, gambarUrl: e.target.value })}
            placeholder="contoh: logo-univ.png"
            className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] rounded-xl text-sm font-medium outline-none transition-colors text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#FF9233] hover:bg-orange-600 text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors"
        >
          Simpan Data Mitra
        </button>
      </form>
    </motion.div>
  );
}

export default function MitraCampusDashboard() {
  const [currentView, setCurrentView] = useState('table'); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [partnersData, setPartnersData] = useState([]);

  useEffect(() => {
    fetchPartnersData();
  }, []);

  const fetchPartnersData = () => {
    fetch('http://localhost:5000/api/mitra')
      .then(res => res.json())
      .then(data => setPartnersData(data))
      .catch(err => console.error(err));
  };

  const menuItems = [
    { name: 'Informasi', label: 'Informasi', path: '/admin' },
    { name: 'mitra campus', label: 'mitra campus', path: '/admin/mitra' },
    { name: 'jadwal', label: 'jadwal', path: '/admin/jadwal' },
    { name: 'biaya', label: 'biaya', path: '/admin/biaya' },
    { name: 'daftar siswa', label: 'daftar siswa', path: '/admin/siswa' },
  ];

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setCurrentView('edit');
  };

  const handleNewClick = () => {
    setSelectedItem(null);
    setCurrentView('new');
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
      fetch(`http://localhost:5000/api/mitra/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(() => {
        alert('Mitra berhasil dihapus!');
        fetchPartnersData();
      })
      .catch(err => console.error(err));
    }
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
            const isActive = item.name === 'mitra campus';
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

        <main className="flex-1 flex justify-center w-full">
          <AnimatePresence mode="wait">
            
            {currentView === 'table' && (
              <motion.div 
                key="table-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col gap-6"
              >
                <div className="w-full bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden text-black">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FF9233] text-white text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-4 border-r border-white/20 w-16 text-center">No</th>
                        <th className="py-4 px-6 border-r border-white/20">Nama</th>
                        <th className="py-4 px-6 border-r border-white/20">Link</th>
                        <th className="py-4 px-6">Gambar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {partnersData.length > 0 ? (
                        partnersData.map((row, index) => (
                          <tr key={row.id} className="hover:bg-orange-50/20 transition-colors group">
                            <td className="py-4 px-4 text-center font-bold text-gray-500 text-xs border-r border-gray-100">
                              {index + 1}
                            </td>
                            <td className="py-4 px-6 text-gray-700 text-xs font-bold border-r border-gray-100">
                              {row.nama}
                            </td>
                            <td className="py-4 px-6 text-blue-500 text-xs font-medium border-r border-gray-100 truncate max-w-[180px]">
                              <a href={row.link} target="_blank" rel="noreferrer" className="hover:underline text-blue-500">
                                {row.link}
                              </a>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-xs font-mono bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md max-w-[120px] truncate">
                                  🖼️ {row.gambar_url}
                                </span>
                                
                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                  <button 
                                    type="button"
                                    onClick={() => handleEditClick(row)}
                                    className="px-2.5 py-1.5 bg-[#FF9233] hover:bg-orange-600 text-white rounded-lg text-[10px] font-bold transition-colors shadow-sm"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteClick(row.id)}
                                    className="px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[10px] font-bold transition-colors shadow-sm"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-16 text-center text-gray-400 text-xs font-medium">
                            Belum ada database mitra yang terdaftar untuk saat ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    onClick={handleNewClick}
                    className="px-14 py-2.5 bg-[#FF9233] hover:bg-orange-600 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition-colors"
                  >
                    New
                  </button>
                </div>
              </motion.div>
            )}

            {(currentView === 'edit' || currentView === 'new') && (
              <EditMitraCampus 
                mode={currentView}
                data={selectedItem}
                onBack={() => setCurrentView('table')}
                onSave={fetchPartnersData}
              />
            )}

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}