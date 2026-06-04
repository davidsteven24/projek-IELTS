import React from 'react';
import { motion } from 'framer-motion';

export default function CampusPartners() {
  const partnersData = [
    {
      id: 1,
      name: "TechGlobal Institute",
      logoText: "TG",
      bgColor: "bg-blue-600",
      websiteUrl: "https://www.google.com"
    },
    {
      id: 2,
      name: "Nusantara Bank Corp",
      logoText: "NB",
      bgColor: "bg-emerald-600",
      websiteUrl: "https://www.wikipedia.org"
    },
    {
      id: 3,
      name: "EcoEnergy Group",
      logoText: "EE",
      bgColor: "bg-amber-600",
      websiteUrl: "https://www.github.com"
    }
  ];

  return (
    <section id="campus" className="w-full bg-[#F2F2F2] py-20 px-6 md:px-12 select-none">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
            <span>02 / JARINGAN GLOBAL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight">
            Mitra Strategis Kampus.
          </h2>
        </div>

        {/* Grid 3 Kolom Ke Samping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnersData.map((partner) => (
            <motion.a
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.04, 
                y: -6,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-200/80 p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-shadow duration-300"
            >
              {/* Box Logo Mitra */}
              <div className={`w-14 h-14 ${partner.bgColor} rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-sm flex-shrink-0`}>
                {partner.logoText}
              </div>

              {/* Nama Perusahaan / Kampus Mitra */}
              <h3 className="text-lg font-bold text-black tracking-tight max-w-[200px] leading-snug">
                {partner.name}
              </h3>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}