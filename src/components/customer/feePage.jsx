import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeePage() {
  const [showBenefits, setShowBenefits] = useState(false);
  const [hargaPaket, setHargaPaket] = useState(0);
  const [listBenefits, setListBenefits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/biaya')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setHargaPaket(data[0].harga);
        }
      })
      .catch(err => console.error("Gagal mengambil data harga:", err));

    fetch('http://localhost:5000/api/paket-biaya')
      .then(res => res.json())
      .then(data => {
        setListBenefits(data);
      })
      .catch(err => console.error("Gagal mengambil data benefit:", err));
  }, []);

  return (
    <section id="fee" className="w-full bg-[#F2F5F9] py-24 px-6 md:px-12 select-none flex flex-col items-center justify-center text-black">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        
        {/* Tombol Label "Price" di Bagian Paling Atas */}
        <div className="mb-6 px-10 py-2 bg-[#FF9233] rounded-xl shadow-sm">
          <span className="text-sm font-bold text-white tracking-wider uppercase">Price</span>
        </div>

        {/* KOTAK UTAMA ORANYE (Sesuai Wadah Besar di image_9086bc.png) */}
        <div className="w-full bg-[#FFB370] rounded-3xl p-10 shadow-lg border border-orange-300/30 flex flex-col items-center text-center mb-8 text-white">
          
          {/* Lencana Promo Internal */}
          <div className="mb-6 px-4 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg">
            <span className="text-[10px] font-black tracking-widest text-white uppercase">PROMO TERBATAS</span>
          </div>

          {/* Judul Utama */}
          <h3 className="text-4xl font-black tracking-tight mb-6 font-sans drop-shadow-sm">IELTS ONLINE</h3>

          {/* Jadwal & Waktu */}
          <div className="flex flex-col items-center gap-2.5 mb-6">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span>📅</span><span>Senin &amp; Kamis</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <span>🕒</span><span>17.00 - 19.00 WIB</span>
            </div>
          </div>

          {/* Total Pertemuan */}
          <div className="mb-8 px-5 py-1 bg-white text-[#CC6A14] rounded-full shadow-inner font-bold text-xs font-mono">
            25 PERTEMUAN
          </div>

          {/* Garis Pembatas Putih Transparan */}
          <div className="w-full h-px bg-white/20 mb-8" />

          {/* Sektor Tampilan Harga Dinamis */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-black tracking-tight font-sans drop-shadow-sm">
              Rp {hargaPaket.toLocaleString('id-ID')}
            </span>
            <div className="flex items-center gap-1.5 mt-3 px-3 py-1 bg-white/10 rounded-md border border-white/20">
              <span>🏷️</span>
              <span className="text-[10px] font-bold tracking-wider uppercase font-sans">
                DISC PRICE APPLIED
              </span>
            </div>
          </div>

        </div>

        {/* TOMBOL AKSI DI BAWAH KOTAK (Sesuai Benefit & Daftar di image_9086bc.png) */}
        <div className="flex items-center gap-4 justify-center w-full max-w-sm">
          <button 
            type="button"
            onClick={() => setShowBenefits(true)}
            className="flex-1 py-3 bg-[#FF9233] hover:bg-[#E67E22] text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors text-center uppercase"
          >
            Benefit
          </button>
          <a  
            href="#daftar-form" 
            className="flex-1 py-3 bg-[#FF9233] hover:bg-[#E67E22] text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors text-center uppercase"
          >
            Daftar
          </a>
        </div>

        {/* Modal Popup Rincian Benefit */}
        <AnimatePresence>
          {showBenefits && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBenefits(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative bg-white w-full max-w-sm rounded-3xl p-6 md:p-8 shadow-2xl z-10 border border-orange-50 flex flex-col">
                <button type="button" onClick={() => setShowBenefits(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-50 text-gray-400 hover:text-gray-600 flex items-center justify-center text-xs font-bold border border-neutral-100 transition-colors">✕</button>
                
                <h4 className="text-xl font-black text-gray-900 tracking-tight mb-1 text-left">Fasilitas &amp; Benefit</h4>
                <p className="text-xs text-gray-400 font-medium mb-4 text-left">Program IELTS ONLINE</p>
                
                <ul className="space-y-4 mb-6 text-left overflow-y-auto max-h-60 pr-1">
                  {listBenefits.length > 0 ? (
                    listBenefits.map((item, index) => (
                      <li key={item.id || index} className="flex items-start gap-3 text-xs text-gray-600 font-medium leading-relaxed">
                        <span className="text-[#FF9233] font-bold">✓</span>
                        <span className="whitespace-pre-wrap">{item.benefit}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-400 text-center py-4">Belum ada rincian fasilitas terdaftar.</li>
                  )}
                </ul>
                
                <button type="button" onClick={() => setShowBenefits(false)} className="w-full bg-[#FF9233] hover:bg-[#E67E22] text-white py-3 rounded-xl text-xs font-bold tracking-wide shadow-sm transition-colors uppercase">Tutup Rincian</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}