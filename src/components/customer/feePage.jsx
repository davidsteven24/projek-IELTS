import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeePage() {
  const [showBenefits, setShowBenefits] = useState(false);

  const courseData = {
    title: "IELTS ONLINE",
    schedule: "Senin & Kamis",
    time: "17.00 - 19.00 WIB",
    meetings: "25 PERTEMUAN",
    price: 2400000,
    benefits: [
      "Simulasi (Mock Test) IELTS Berstandar Resmi",
      "E-Book & Modul Latihan Soal Komprehensif",
      "Evaluasi & Feedback Langsung dari Tutor Ahli",
      "Akses Rekaman Kelas Kapan Saja",
      "Grup Diskusi Eksklusif Komunitas Mahasiswa"
    ]
  };

  return (
    <section id="fee" className="w-full bg-[#F2F2F2] py-24 px-6 md:px-12 select-none flex flex-col items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
        
        {/* 1. BADGE: PROMO TERBATAS */}
        <div className="mb-8 px-4 py-1.5 bg-[#FFF0F0] border border-[#FFE0E0] rounded-lg">
          <span className="text-[11px] font-black tracking-widest text-[#E50000] uppercase font-sans">
            PROMO TERBATAS
          </span>
        </div>

        {/* 2. JUDUL UTAMA */}
        <h3 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-6 font-sans">
          {courseData.title}
        </h3>

        {/* 3. DETAIL JADWAL & WAKTU */}
        <div className="flex flex-col items-center gap-3 mb-6">
          {/* Baris Hari */}
          <div className="flex items-center gap-2 text-xl font-bold text-[#2A2A2A]">
            <span className="text-xl">📅</span>
            <span>{courseData.schedule}</span>
          </div>
          {/* Baris Jam */}
          <div className="flex items-center gap-2 text-base font-semibold text-[#8A8A8A]">
            <span className="text-base">🕒</span>
            <span>{courseData.time}</span>
          </div>
        </div>

        {/* 4. BADGE PERTEMUAN */}
        <div className="mb-12 px-5 py-1.5 bg-[#EEF4FF] rounded-full">
          <span className="text-[11px] font-black tracking-widest text-[#2B6CB0] font-mono">
            {courseData.meetings}
          </span>
        </div>

        {/* GARIS PEMBATAS TIPIS ATAS HARGA */}
        <div className="w-full h-[1px] bg-gray-200/60 mb-8" />

        {/* 5. AREA HARGA UTAMA (Besar & Dominan) */}
        <div className="mb-8 flex flex-col items-center cursor-pointer" onClick={() => setShowBenefits(true)}>
          <span className="text-5xl md:text-6xl font-black text-black tracking-tight font-sans">
            Rp {courseData.price.toLocaleString('id-ID')}
          </span>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-xs">🏷️</span>
            <span className="text-[11px] font-bold text-[#E50000] tracking-wider uppercase font-sans">
              DISC PRICE APPLIED
            </span>
          </div>
        </div>

        {/* GARIS PEMBATAS TIPIS BAWAH HARGA */}
        <div className="w-full h-[1px] bg-gray-200/60 mb-8" />

        {/* TOMBOL PANDUAN BENEFIT */}
        <button 
          onClick={() => setShowBenefits(true)}
          className="px-8 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wide shadow-sm transition-colors"
        >
          Lihat Benefit Paket
        </button>

        {/* INTERACTIVE POPUP MODAL BENEFIT */}
        <AnimatePresence>
          {showBenefits && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBenefits(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white w-full max-w-sm rounded-3xl p-6 md:p-8 shadow-2xl z-10 border border-gray-100 flex flex-col"
              >
                <button 
                  onClick={() => setShowBenefits(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold transition-colors"
                >
                  ✕
                </button>

                <h4 className="text-xl font-black text-black tracking-tight mb-1">Fasilitas & Benefit</h4>
                <p className="text-xs text-gray-400 font-medium mb-4">Program {courseData.title}</p>
                <div className="h-[1px] w-full bg-gray-100 mb-5" />

                <ul className="space-y-3.5 mb-6">
                  {courseData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-xs text-neutral-600 font-medium leading-relaxed">
                      <span className="text-emerald-500 font-bold text-sm leading-none">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setShowBenefits(false)}
                  className="w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-xl text-xs font-bold transition-colors"
                >
                  Tutup Rincian
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}