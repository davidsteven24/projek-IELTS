import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
  };

  // Varian Animasi untuk efek staggered (muncul berurutan dengan halus)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="signin-form" className="w-full min-h-screen bg-[#F2F2F2] ...">
      
      {/* Kotak Utama Sign In */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white border border-gray-200/80 p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] flex flex-col"
      >
        
        {/* HEADER: Logo & Judul */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Logo Ramos */}
          <motion.div 
            variants={itemVariants}
            className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-md mb-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-2xl font-black text-black tracking-tight mb-1.5">
            Selamat Datang Kembali
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xs text-gray-400 font-medium">
            Masukkan akun Anda untuk mengelola data akademik
          </motion.p>
        </div>

        {/* FORM ISIAN */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input Email */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
              Alamat Email
            </label>
            <input 
              type="email" 
              required
              placeholder="nama@kampus.id"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 text-sm font-medium rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-200"
            />
          </motion.div>

          {/* Input Password */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="flex justify-between items-center mb-2 pl-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Kata Sandi
              </label>
              <a href="#forgot" className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors">
                Lupa Sandi?
              </a>
            </div>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 text-sm font-medium rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-200"
            />
          </motion.div>

          {/* Opsi Ingat Saya */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1 pl-1">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded-md border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-semibold text-gray-500 cursor-pointer select-none">
              Ingat perangkat ini
            </label>
          </motion.div>

          {/* Tombol Submit Sign In */}
          <motion.div variants={itemVariants} className="pt-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-colors duration-200"
            >
              Masuk ke Dashboard
            </motion.button>
          </motion.div>

        </form>
      </motion.div>
    </section>
  );
}