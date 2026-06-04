import React from 'react';
import { motion } from 'framer-motion';

export default function CleanSplitHeroBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 14 } 
    }
  };

  return (
    /* PERUBAHAN UTAMA: Mengganti py-16 menjadi pt-56 pb-20 agar posisi konten turun sempurna di bawah navbar melayang */
    <section className="w-full min-h-[75vh] bg-[#F2F2F2] flex items-center justify-center select-none pt-56 pb-20 px-6 md:px-12 overflow-hidden">
      
      {/* Main Grid Wrapper split kiri-kanan */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center"
      >
        
        {/* SISI SEBELAH KIRI: BRANDING BLOCK */}
        <div className="md:col-span-5 flex justify-center md:justify-start">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-sm flex items-center gap-4 bg-white border border-gray-200/80 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer backdrop-blur-sm"
          >
            {/* Logo Icon */}
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-14 h-14 bg-black rounded-xl flex items-center justify-center text-white shadow-md shadow-black/10 flex-shrink-0"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </motion.div>

            {/* Garis Pembatas Pembagi */}
            <div className="h-10 w-[1px] bg-gray-200" />

            {/* Teks Identitas */}
            <div className="flex flex-col items-start text-left pr-2">
              <span className="text-xl font-bold text-black tracking-tight leading-none mb-1.5">
                ramos corp
              </span>
              <span className="text-xs font-medium text-gray-400 tracking-wide">
                “Integrasi Data Tanpa Batas”
              </span>
            </div>
          </motion.div>
        </div>

        {/* SISI SEBELAH KANAN: KATA-KATA UTAMA & ACTION BUTTON */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          
          {/* Judul Utama */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[1.12] mb-5"
          >
            Kelola Data Akademik <br />
            <span className="bg-gradient-to-r from-neutral-400 via-neutral-700 to-black bg-clip-text text-transparent">
              Jauh Lebih Terstruktur.
            </span>
          </motion.h1>

          {/* Deskripsi */}
          <motion.p 
            variants={itemVariants}
            className="max-w-xl text-sm md:text-base text-gray-500 font-normal leading-relaxed mb-8"
          >
            Pantau jadwal kuliah, transparansi biaya, dan manajemen informasi kampus dalam satu dashboard terintegrasi yang responsif.
          </motion.p>
        </div>

      </motion.div>
    </section>
  );
}