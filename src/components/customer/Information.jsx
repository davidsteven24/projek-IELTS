import React from 'react';
import { motion } from 'framer-motion';

export default function InformationPage() {
  const infoData = [
    {
      title: "Sistem Informasi Akademik Terintegrated",
      description: "Akses kartu hasil studi, rencana perkuliahan, dan riwayat nilai dalam satu platform terpusat. Dikembangkan dengan arsitektur cloud tingkat tinggi untuk memastikan akurasi data real-time tanpa delay.",
      tag: "Fitur Utama",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", 
      accentColor: "bg-blue-500"
    },
    {
      title: "Manajemen Fasilitas & Kampus Modern",
      description: "Jelajahi ekosistem digital kampus mulai dari pemesanan laboratorium, perpustakaan pintar, hingga peta interaktif gedung kuliah. Semua kendali fasilitas kini berada tepat di genggaman tangan Anda.",
      tag: "Ekosistem",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      accentColor: "bg-amber-500"
    },
    {
      title: "Transparansi Finansial & Biaya Kuliah",
      description: "Sistem pelacakan tagihan UKT, beasiswa, dan dana bantuan pendidikan secara transparan. Dapatkan notifikasi instan serta rincian alokasi dana yang jelas untuk mendukung akuntabilitas keuangan.",
      tag: "Finansial",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      accentColor: "bg-emerald-500"
    }
  ];

  // Variasi animasi masuk dari bawah (Kiri/Foto biasa atau teks kanan)
  const scrollAnimationVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15,
        duration: 0.6 
      } 
    }
  };

  return (
    <section id="information" className="w-full bg-[#F2F2F2] py-24 px-6 md:px-12 ...">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* HEADER HALAMAN (Ikut menganut animasi scroll dua arah) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollAnimationVariants}
          className="mb-20 max-w-2xl"
        >
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
            <span>01 / INFORMASI UTAMA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
            Eksplorasi Ruang Lingkup <br />
            Akademik Digital Kami.
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Menyediakan transparansi data dan kemudahan akses informasi demi mewujudkan lingkungan kampus yang efisien dan berteknologi tinggi.
          </p>
        </motion.div>

        {/* LIST KONTEN UTAMA */}
        <div className="flex flex-col gap-32 md:gap-40">
          {infoData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                
                {/* 1. ANIMASI BAGIAN FOTO */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  // once: false membuat animasi reset kembali saat di-scroll ke atas meninggalkan layar
                  // amount: 0.25 artinya animasi terpicu jika minimal 25% area elemen masuk ke layar
                  viewport={{ once: false, amount: 0.25 }}
                  variants={scrollAnimationVariants}
                  className={`md:col-span-5 w-full ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group border border-gray-300/40"
                  >
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 z-10" />
                    <motion.img 
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-black uppercase rounded-md">
                      {item.tag}
                    </span>
                  </motion.div>
                </motion.div>

                {/* 2. ANIMASI BAGIAN TEKS/INFORMASI */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.25 }}
                  variants={scrollAnimationVariants}
                  className={`md:col-span-7 flex flex-col items-start text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}
                >
                  <div className={`h-[3px] w-12 ${item.accentColor} rounded-full mb-6`} />
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 font-normal leading-relaxed mb-6">
                    {item.description}
                  </p>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}