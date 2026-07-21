import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState('Senin');
  const [scheduleData, setScheduleData] = useState({
    Senin: [],
    Selasa: [],
    Rabu: [],
    Kamis: [],
    Jumat: []
  });

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  // Mengambil data jadwal secara dinamis dari database Node.js saat halaman dibuka
  useEffect(() => {
    fetch('http://localhost:5000/api/jadwal')
      .then((res) => res.json())
      .then((data) => {
        // Wadah pengelompokan data berdasarkan tab hari
        const groupedSchedule = {
          Senin: [],
          Selasa: [],
          Rabu: [],
          Kamis: [],
          Jumat: []
        };

        // Memasukkan data dari MySQL ke kelompok harinya masing-masing dengan istilah IELTS
        data.forEach((item) => {
          if (!item.hari) return;

          // 1. PENGAMAN HARI: Memaksa huruf pertama kapital (contoh: "selasa" -> "Selasa")
          const namaHariSesuaiFormat = item.hari.charAt(0).toUpperCase() + item.hari.slice(1).toLowerCase();

          if (groupedSchedule[namaHariSesuaiFormat]) {
            // 2. PENGAMAN KOLOM: Mengambil dari properti mata_pelajaran atau fallback ke mata_kuliah jika belum berubah
            const namaKelasAsli = item.mata_pelajaran || item.mata_kuliah || "Kelas IELTS";
            const teksLower = namaKelasAsli.toLowerCase();
            
            // Menentukan tipe skill IELTS secara otomatis berdasarkan teks kata kunci
            let skillType = "IELTS Core";
            if (teksLower.includes('write') || teksLower.includes('menulis')) skillType = "Writing";
            else if (teksLower.includes('speak') || teksLower.includes('bicara')) skillType = "Speaking";
            else if (teksLower.includes('listen') || teksLower.includes('dengar')) skillType = "Listening";
            else if (teksLower.includes('read') || teksLower.includes('baca')) skillType = "Reading";
            else if (teksLower.includes('grammar')) skillType = "Grammar Class";
            else if (teksLower.includes('english')) skillType = "English Class";
            else if (teksLower.includes('ai') || teksLower.includes('kecerdasan')) skillType = "AI Evaluation";

            groupedSchedule[namaHariSesuaiFormat].push({
              time: item.waktu || "00:00 - 00:00",
              subject: namaKelasAsli, 
              tutor: "Certified IELTS Expert", 
              platform: "Zoom Premium & LMS", 
              type: skillType 
            });
          }
        });

        setScheduleData(groupedSchedule);
      })
      .catch((err) => console.error("Gagal memuat database jadwal IELTS:", err));
  }, []);

  return (
    <section id="schedule" className="w-full bg-[#F2F5F9] py-24 px-6 md:px-12 select-none text-black">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold tracking-wider text-[#CC6A14] uppercase mb-3">
              <span>03 / WAKTU &amp; AGENDA BIMBINGAN</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Jadwal Kelas IELTS.
            </h2>
          </div>

          {/* Navigasi Pilihan Tab Hari */}
          <div className="flex flex-wrap items-center justify-center p-1.5 bg-orange-100/40 rounded-2xl border border-orange-100 self-center md:self-auto">
            {days.map((day) => {
              const isSelected = activeDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className={`relative px-5 py-2 text-xs font-bold transition-colors duration-300 rounded-xl ${
                    isSelected ? 'text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <span className="relative z-10">{day}</span>
                  {isSelected && (
                    <motion.div 
                      layoutId="active-day-pill" 
                      className="absolute inset-0 bg-[#FF9233] rounded-xl z-0 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Container List Jadwal Dinamis */}
        <div className="w-full min-h-75">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {scheduleData[activeDay] && scheduleData[activeDay].length > 0 ? (
                scheduleData[activeDay].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -4, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)" }}
                    className="bg-white border border-orange-100/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-shadow duration-300 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <span className="text-xs font-bold text-[#CC6A14] font-mono tracking-wider">⏱️ {item.time}</span>
                      <h3 className="text-xl font-extrabold text-gray-800 tracking-tight leading-snug">{item.subject}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                        <span>💻 {item.platform}</span>
                        <span className="hidden md:inline text-gray-200">|</span>
                        <span>👩‍🏫 {item.tutor}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-[10px] font-bold text-[#CC6A14] uppercase tracking-wider rounded-lg shrink-0">
                      {item.type}
                    </span>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center text-gray-400 py-16 text-sm font-medium">
                  Tidak ada agenda kelas persiapan IELTS untuk hari {activeDay}.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}