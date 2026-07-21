import React from 'react';
import { motion } from 'framer-motion';
import logoKionco from '../../assets/logo1.png';

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
    <section className="w-full min-h-[75vh] bg-[#F2F5F9] flex items-center justify-center select-none pt-56 pb-20 px-6 md:px-12 overflow-hidden text-black">
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
            className="w-full max-w-sm flex items-center gap-4 bg-white border border-orange-100 p-5 rounded-2xl shadow-[0_8px_30px_rgba(255,146,51,0.04)] cursor-pointer backdrop-blur-sm"
          >
            {/* Ikon Edukasi/Toga Bertema Oranye Kion & Co. */}
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-14 h-14 bg-[#FF9233] rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 7l11 5 9-4.09V14a1 1 0 002 0V7.5L12 2z" />
                <path d="M4.19 12.16L12 15.71l7.81-3.55a1 1 0 011.19.16 1 1 0 010 1.25l-8.4 4a1 1 0 01-1.2 0l-8.4-4a1 1 0 010-1.25 1 1 0 011.2-.16z" />
              </svg>
            </motion.div>

            <div className="h-10 w-px bg-orange-100" />
               <img 
                            src={logoKionco} 
                            alt="Logo Kion &amp; Co" 
                            className="h-12 w-auto object-contain"
                             
                          />
            <div className="flex flex-col items-start text-left pr-2">
              
            </div>
          </motion.div>
        </div>

        {/* SISI SEBELAH KANAN: TEXT CONTENT (IELTS & GLOBAL PARTNERSHIPS) */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12] mb-5"
          >
            Master Your IELTS. <br />
            <span className="bg-gradient-to-r from-[#FF9233] via-[#E67E22] to-amber-900 bg-clip-text text-transparent">
              Unlock Global Campuses.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-xl text-sm md:text-base text-gray-500 font-medium leading-relaxed mb-8"
          >
            Achieve your target band score with our certified intensive preparation program. Through our prestigious network of world-class partner universities, Kion &amp; Co. bridges the gap between your academic potential and your global education dreams.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}