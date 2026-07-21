import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CampusPartners() {
  const [partnersData, setPartnersData] = useState([]);

  // Mengambil data mitra dari Node.js saat halaman dimuat
  useEffect(() => {
    fetch('http://localhost:5000/api/mitra')
      .then((res) => res.json())
      .then((data) => {
        setPartnersData(data);
      })
      .catch((err) => console.error("Gagal mengambil data mitra:", err));
  }, []);

  return (
    <section id="campus" className="w-full bg-[#F2F5F9] py-20 px-6 md:px-12 select-none text-black">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* HEADER HALAMAN */}
        <div className="mb-12 text-center md:text-left">
          <div className="text-xs font-semibold tracking-wider text-[#CC6A14] uppercase mb-3">
            <span>02 / JARINGAN GLOBAL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Mitra Strategis Kampus.
          </h2>
        </div>

        {/* GRID LAYOUT KARTU MITRA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnersData.length > 0 ? (
            partnersData.map((partner) => (
              <motion.a
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.04, 
                  y: -6,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-orange-100/70 p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-shadow duration-300 shadow-sm"
              >
                {/* Menampilkan Gambar fisik dari folder uploads backend port 5000 */}
                <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center border border-orange-50 mb-4 shadow-inner overflow-hidden shrink-0">
                  <img 
                    src={`http://localhost:5000/uploads/${partner.gambar_url}`} 
                    alt={partner.nama} 
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 tracking-tight max-w-50 leading-snug">
                  {partner.nama}
                </h3>
              </motion.a>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center text-gray-400 py-12 text-sm font-medium">
              Belum ada data mitra strategis yang di-upload dari admin panel.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}