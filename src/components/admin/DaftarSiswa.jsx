import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoKionco from '../../assets/logo1.png';

export default function DaftarSiswaDashboard() {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = () => {
    fetch('http://localhost:5000/api/siswa')
      .then((res) => res.json())
      .then((data) => setStudentsData(data))
      .catch((err) => console.error(err));
  };

  const menuItems = [
    { name: 'Informasi', label: 'Informasi', path: '/admin' },
    { name: 'mitra campus', label: 'mitra campus', path: '/admin/mitra' },
    { name: 'jadwal', label: 'jadwal', path: '/admin/jadwal' },
    { name: 'biaya', label: 'biaya', path: '/admin/biaya' },
    { name: 'daftar siswa', label: 'daftar siswa', path: '/admin/siswa' },
  ];

  const handleDeleteStudent = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      fetch(`http://localhost:5000/api/siswa/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          alert('Data siswa berhasil dihapus!');
          fetchStudentsData();
        })
        .catch((err) => console.error(err));
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
            const isActive = item.name === 'daftar siswa';
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

        <main className="flex-1 flex flex-col w-full">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden text-black"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FF9233] text-white text-xs font-bold capitalize tracking-wider">
                    <th className="py-4 px-4 border-r border-white/20 w-16 text-center">No</th>
                    <th className="py-4 px-5 border-r border-white/20">nama</th>
                    <th className="py-4 px-5 border-r border-white/20">kota</th>
                    <th className="py-4 px-5 border-r border-white/20">sekolah</th>
                    <th className="py-4 px-5 border-r border-white/20">kelas</th>
                    <th className="py-4 px-5">No Hp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {studentsData.map((student, index) => (
                    <tr key={student.id} className="hover:bg-orange-50/20 transition-colors group">
                      <td className="py-4 px-4 text-center font-bold text-gray-500 text-xs border-r border-gray-100">
                        {index + 1}
                      </td>
                      <td className="py-4 px-5 text-gray-800 text-xs font-bold border-r border-gray-100">
                        {student.nama}
                      </td>
                      <td className="py-4 px-5 text-gray-600 text-xs font-medium border-r border-gray-100">
                        {student.kota}
                      </td>
                      <td className="py-4 px-5 text-gray-600 text-xs font-medium border-r border-gray-100">
                        {student.sekolah}
                      </td>
                      <td className="py-4 px-5 text-gray-600 text-xs font-medium border-r border-gray-100">
                        {student.kelas}
                      </td>
                      <td className="py-4 px-5 text-gray-700 text-xs font-mono flex items-center justify-between gap-4">
                        <span>{student.no_hp}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(student.id)}
                          className="opacity-0 group-hover:opacity-100 px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm flex-shrink-0"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {studentsData.length === 0 && (
              <div className="w-full py-16 text-center text-gray-400 text-xs font-medium">
                Belum ada database siswa yang terdaftar untuk saat ini.
              </div>
            )}
          </motion.div>
        </main>

      </div>
    </div>
  );
}