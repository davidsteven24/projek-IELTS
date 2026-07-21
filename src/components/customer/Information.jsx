import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InformationPage() {
  const [infoData, setInfoData] = useState([]);

  // Mengambil data informasi kampus dari Node.js saat halaman dimuat
  useEffect(() => {
    fetch('http://localhost:5000/api/informasi')
      .then((res) => res.json())
      .then((data) => {
        setInfoData(data);
      })
      .catch((err) => console.error("Gagal mengambil data informasi:", err));
  }, []);

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
    <section id="information" className="w-full bg-[#F2F5F9] py-24 px-6 md:px-12 text-black select-none">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* HEADER HALAMAN */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollAnimationVariants}
          className="mb-20 max-w-2xl text-left"
        >
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#CC6A14] uppercase mb-3">
            <span>01 / INFORMASI UTAMA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            Eksplorasi Ruang Lingkup <br />
            Akademik Digital Kami.
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Menyediakan transparansi data dan kemudahan akses informasi demi mewujudkan lingkungan kampus yang efisien dan berteknologi tinggi.
          </p>
        </motion.div>

        {/* LIST KONTEN UTAMA DARI DATABASE */}
        <div className="flex flex-col gap-32 md:gap-40">
          {infoData.length > 0 ? (
            infoData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id || index}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* 1. ANIMASI BAGIAN FOTO */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.25 }}
                    variants={scrollAnimationVariants}
                    className={`md:col-span-5 w-full ${isEven ? 'md:order-1' : 'md:order-2'}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] group border border-orange-100/50"
                    >
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 z-10" />
                      
                      {/* Menembak lokasi gambar fisik ke server backend port 5000 */}
                        <motion.img 
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.5 }}
                          src={
                            item.gambar_url && item.gambar_url.startsWith('http')
                              ? item.gambar_url // Gunakan langsung jika isinya link internet (http:// atau https://)
                              : `http://localhost:5000/uploads/${item.gambar_url}` // Arahkan ke uploads server jika hanya nama file biasa
                          } 
                          alt="Informasi Kampus"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => { 
                            // Proteksi fallback jika domain internet eksternal atau file lokal gagal dimuat
                            e.target.src = 'https://placehold.co/800x600'; 
                          }}
                        />
                                              
                      <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-[#CC6A14] uppercase rounded-md shadow-sm border border-orange-50">
                        Info {index + 1}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* 2. ANIMASI BAGIAN TEKS / DESKRIPSI */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.25 }}
                    variants={scrollAnimationVariants}
                    className={`md:col-span-7 flex flex-col items-start text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}
                  >
                    {/* Bar Aksen Warna Oranye Kion & Co. */}
                    <div className="h-1 w-12 bg-[#FF9233] rounded-full mb-6" />
                    
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4 leading-snug whitespace-pre-wrap">
                      {/* Menggunakan potongan teks otomatis sebagai judul jika tidak dipisah */}
                      {item.informasi.split('.')[0]}.
                    </h3>
                    
                    <p className="text-sm md:text-base text-gray-500 font-normal leading-relaxed mb-6 whitespace-pre-wrap">
                      {item.informasi}
                    </p>
                  </motion.div>

                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 py-20 text-sm font-medium">
              Belum ada data ekslorasi akademik digital yang di-upload dari admin panel.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}