import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState('Senin');

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  // Data Jadwal Kuliah Sampel
  const scheduleData = {
    Senin: [
      { time: '08:00 - 10:30', subject: 'Kecerdasan Buatan (AI)', room: 'Lab Komputer 04', lecturer: 'Prof. Dr. Ir. Harianto', type: 'Teori & Praktik' },
      { time: '13:00 - 15:30', subject: 'Interaksi Manusia & Komputer', room: 'Gedung D - R.302', lecturer: 'Dr. Diana Putri', type: 'Teori' }
    ],
    Selasa: [
      { time: '10:00 - 12:30', subject: 'Pemrograman Web Enterprise', room: 'Lab Komputer 01', lecturer: 'Rian Fahmi, M.T.', type: 'Praktik' }
    ],
    Rabu: [
      { time: '08:00 - 10:30', subject: 'Keamanan Jaringan Cyber', room: 'Gedung C - R.101', lecturer: 'Ahmad Zakaria, Ph.D', type: 'Teori' },
      { time: '14:00 - 16:30', subject: 'Arsitektur Sistem Cloud', room: 'Lab Cloud Tier-3', lecturer: 'Prof. Dr. Ir. Harianto', type: 'Praktik' }
    ],
    Kamis: [
      { time: '13:00 - 15:30', subject: 'Analisis & Desain Sistem', room: 'Gedung D - R.405', lecturer: 'Siti Rahma, M.M.', type: 'Teori' }
    ],
    Jumat: [
      { time: '09:00 - 11:30', subject: 'Kewirausahaan Teknologi (Technopreneur)', room: 'Aula Utama Smart-Room', lecturer: 'Irwan Wijaya, MBA', type: 'Seminar' }
    ]
  };

  return (
    <section id="schedule" className="w-full bg-[#F2F2F2] py-24 px-6 md:px-12 select-none">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              <span>03 / WAKTU & AGENDA</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight">
              Jadwal Perkuliahan.
            </h2>
          </div>

          {/* FILTER HARI (Satu Tema dengan Navbar Pill) */}
          <div className="flex flex-wrap items-center justify-center p-1.5 bg-[#EAEAEA] rounded-2xl border border-gray-300/50 self-center md:self-auto">
            {days.map((day) => {
              const isSelected = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`relative px-5 py-2 text-xs font-semibold transition-colors duration-300 rounded-xl ${
                    isSelected ? 'text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <span className="relative z-10">{day}</span>
                  {isSelected && (
                    <motion.div 
                      layoutId="active-day-pill" 
                      className="absolute inset-0 bg-black rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AREA DAFTAR JADWAL */}
        <div className="w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {scheduleData[activeDay]?.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -4, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.08)" }}
                  className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-shadow duration-300"
                >
                  {/* Waktu & Detail Kelas */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-gray-400 font-mono tracking-wider">
                      ⏱️ {item.time}
                    </span>
                    <h3 className="text-xl font-extrabold text-black tracking-tight leading-snug">
                      {item.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                      <span>📍 {item.room}</span>
                      <span className="hidden md:inline text-gray-300">|</span>
                      <span>👨‍🏫 {item.lecturer}</span>
                    </div>
                  </div>

                  {/* Badge Jenis Kuliah (Kanan Atas / Samping) */}
                  <span className="px-3 py-1.5 bg-[#F2F2F2] border border-gray-200 text-[10px] font-bold text-black uppercase tracking-wider rounded-lg self-start md:self-auto flex-shrink-0">
                    {item.type}
                  </span>
                </motion.div>
              ))}

              {/* Handler jika hari tersebut tidak ada jadwal kosong */}
              {(!scheduleData[activeDay] || scheduleData[activeDay].length === 0) && (
                <div className="col-span-1 md:col-span-2 py-16 text-center text-gray-400 text-sm border-2 border-dashed border-gray-300/60 rounded-2xl">
                  Tidak ada jadwal perkuliahan untuk hari ini.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}