import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EditJadwalForm from './EditJadwal';
import logoKionco from '../../assets/logo1.png';

export default function JadwalDashboard() {
  const [currentView, setCurrentView] = useState('table'); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = () => {
    fetch('http://localhost:5000/api/jadwal')
      .then(res => res.json())
      .then(data => setScheduleList(data))
      .catch(err => console.error("Gagal mengambil data jadwal:", err));
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
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      fetch(`http://localhost:5000/api/jadwal/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(() => {
        alert('Jadwal berhasil dihapus!');
        fetchScheduleData();
      })
      .catch(err => console.error("Gagal menghapus jadwal:", err));
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-sans flex flex-col select-none text-black">
      
      {/* HEADER UTAMA */}
      <header className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
           <img 
                        src={logoKionco} 
                        alt="Logo Kion &amp; Co" 
                        className="h-12 w-auto object-contain"
                         
                      />
        </div>
        
        {/* Tombol kembali dinamis: Muncul di header kanan hanya saat form terbuka */}
        {currentView !== 'table' ? (
          <button 
            type="button"
            onClick={() => setCurrentView('table')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-bold transition-colors"
          >
            ← Kembali ke Tabel
          </button>
        ) : (
          <Link to="/" className="text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-4 py-2 rounded-xl transition-colors">
            Logout
          </Link>
        )}
      </header>

      {/* WORKSPACE AREA */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto p-6 gap-8 items-start">
        
        {/* SIDEBAR KIRI */}
        <aside className="w-64 bg-[#FF9233] rounded-3xl p-4 flex flex-col gap-2 shadow-xl shadow-orange-500/5 flex-shrink-0">
          {menuItems.map((item) => {
            const isActive = item.name === 'jadwal';
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

        {/* KONTEN UTAMA KANAN */}
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
                <div className="w-full bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FF9233] text-white text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-4 border-r border-white/20 w-16 text-center">No</th>
                        <th className="py-4 px-6">Jadwal Mata Pelajaran / Kelas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {scheduleList.length > 0 ? (
                        scheduleList.map((row, index) => (
                          <tr key={row.id} className="hover:bg-orange-50/20 transition-colors group">
                            <td className="py-4 px-4 text-center font-bold text-gray-500 text-xs border-r border-gray-100">
                              {index + 1}
                            </td>
                            <td className="py-4 px-6 text-gray-700 text-xs font-semibold">
                              <div className="flex items-center justify-between gap-4">
                                <span>{` ${row.hari} (${row.waktu}) - ${row.mata_pelajaran || row.mata_kuliah} `}</span>
                                
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
                          <td colSpan="2" className="py-16 text-center text-gray-400 text-xs font-medium">
                            Belum ada database jadwal kelas yang terdaftar untuk saat ini.
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
              <EditJadwalForm 
                initialData={selectedItem}
                onBack={() => setCurrentView('table')}
                onSave={fetchScheduleData}
              />
            )}

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}