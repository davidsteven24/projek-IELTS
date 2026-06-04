import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderNavbar() {
  const [activeTab, setActiveTab] = useState('Information');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menuItems = [
    { name: 'Information', href: '#information', tooltip: 'Lihat Ringkasan Data' },
    { name: 'Campus', href: '#campus', tooltip: 'Daftar Mitra Strategis' },
    { name: 'Schedule', href: '#schedule', tooltip: 'Daftar Jadwal Les' },
    { name: 'fee', href: '#fee', tooltip: 'Daftar Harga Pertemuan' },
  ];

  // --- PERUBAHAN: Fungsi Interaksi Tombol Sign Up ---
  const handleSignUpClick = () => {
    // 1. Secara opsional, ubah active tab untuk memberikan konteks visual
    setActiveTab('signin'); 

    // 2. Gunakan Web API standar untuk meluncur mulus ke arah Form Sign In
    const signInFormElement = document.getElementById('signin-form');
    if (signInFormElement) {
      signInFormElement.scrollIntoView({ 
        behavior: 'smooth', // Animasi meluncur halus
        block: 'start'      // Berhenti tepat di bagian atas form
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-[#F2F2F2]/90 backdrop-blur-md flex flex-col gap-4 select-none z-50 shadow-sm overflow-visible">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Top Row: Logo & Sign Up Button */}
        <div className="flex items-center justify-between w-full px-4 mb-3">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 text-black font-semibold text-lg cursor-pointer flex-shrink-0">
            <svg 
              className="w-5 h-5 text-black block flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="tracking-wide text-xl font-bold">ramos</span>
          </div>

          {/* --- PERUBAHAN: Penambahan Event Listener onClick --- */}
          <button 
            onClick={handleSignUpClick}
            className="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </div>

        {/* Bottom Row: Main Navbar */}
        <div className="flex items-center justify-start w-full h-16 px-4 bg-black rounded-2xl overflow-visible">
          <div className="flex items-center space-x-1 bg-[#1A1A1A] px-3 py-2 rounded-xl relative">
            {menuItems.map((item, index) => {
              const isActive = activeTab === item.name;
              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className="absolute bottom-full mb-3 flex flex-col items-center pointer-events-none z-10"
                      >
                        <div className="bg-neutral-800 text-white text-[10px] px-2.5 py-1 rounded-md shadow-2xl whitespace-nowrap border border-neutral-700">
                          {item.tooltip}
                        </div>
                        <div className="w-1.5 h-1.5 bg-neutral-800 border-r border-b border-neutral-700 transform rotate-45 -mt-[4px]"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={`relative px-4 py-1.5 text-xs font-medium transition-colors duration-300 rounded-lg z-[2] ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div layoutId="active-pill" className="absolute inset-0 bg-[#262626] rounded-lg z-[-1]" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
}