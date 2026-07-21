import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoKionco from '../../assets/logo1.png';

export default function HeaderNavbar({ onSignInClick }) {
  const [activeTab, setActiveTab] = useState('Information');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menuItems = [
    { name: 'Information', href: '#information', tooltip: 'Lihat Eksplorasi Akademik' },
    { name: 'Campus', href: '#campus', tooltip: 'Daftar Mitra Strategis' },
    { name: 'Schedule', href: '#schedule', tooltip: 'Daftar Jadwal Kelas IELTS' },
    { name: 'Fee', href: '#fee', tooltip: 'Daftar Harga & Benefit' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-[#F8FAFC]/95 backdrop-blur-md flex flex-col gap-3 select-none z-50 shadow-sm overflow-visible">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Top Row: Brand Logo & Login Button */}
        <div className="flex items-center justify-between w-full px-4 mb-2">
          {/* Logo Kion & Co. */}
          <div className="flex flex-col text-left cursor-pointer shrink-0">
            <img 
              src={logoKionco} 
              alt="Logo Kion &amp; Co" 
              className="h-12 w-auto object-contain"
               
            />
          </div>

          {/* Tombol Login Oranye Tegas */}
          <button 
            type="button"
            onClick={onSignInClick}
            className="px-5 py-2 bg-[#FF9233] hover:bg-[#E67E22] text-white rounded-xl text-xs font-bold tracking-wide shadow-md shadow-orange-500/10 transition-colors uppercase"
          >
            Login
          </button>
        </div>

        {/* Bottom Row: Main Navbar Panel (Perbaikan Oranye Estetik) */}
        <div className="flex items-center justify-start w-full h-14 px-4 bg-[#FFF6EE] border border-orange-100 rounded-2xl overflow-visible shadow-sm">
          <div className="flex items-center space-x-1 bg-white px-2 py-1.5 rounded-xl border border-orange-100/60 relative">
            {menuItems.map((item, index) => {
              const isActive = activeTab === item.name;
              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip Popup: Menyesuaikan tema hangat hangat */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className="absolute bottom-full mb-3 flex flex-col items-center pointer-events-none z-10"
                      >
                        <div className="bg-[#CC6A14] text-white text-[10px] px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap border border-orange-700 font-bold tracking-wide">
                          {item.tooltip}
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#CC6A14] border-r border-b border-orange-700 transform rotate-45 -mt-1"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Nav Link Item Anchors */}
                  <a
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={`relative px-4 py-1.5 text-xs font-bold transition-colors duration-300 rounded-lg z-10 ${
                      isActive ? 'text-white' : 'text-orange-900/60 hover:text-orange-900'
                    }`}
                  >
                    {item.name}
                    
                    {/* Efek Aktif Pil Menu: Oranye Segar */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill" 
                        className="absolute inset-0 bg-[#FF9233] rounded-lg z-[-1] shadow-sm shadow-orange-500/20" 
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
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