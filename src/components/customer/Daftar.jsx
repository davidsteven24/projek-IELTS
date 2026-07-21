import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DaftarPage() {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    phone: '', 
    city: '', 
    school: '', 
    grade: '' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Pemetaan data dari state form ke kolom database siswa (nama, no_hp, kota, sekolah, kelas)
    const payload = {
      nama: formData.fullName,
      no_hp: formData.phone,
      kota: formData.city,
      sekolah: formData.school,
      kelas: formData.grade
    };

    // Kirim data ke Node.js endpoint /api/siswa
    fetch('http://localhost:5000/api/siswa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.error) });
      }
      return res.json();
    })
    .then(() => {
      setIsSubmitted(true);
    })
    .catch(err => {
      console.error("Gagal mendaftarkan siswa:", err);
      alert("Terjadi masalah saat menyimpan data pendaftaran.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <section id="daftar-form" className="w-full bg-[#F2F5F9] py-24 px-6 md:px-12 flex flex-col items-center justify-center min-h-screen text-black">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl border border-orange-100 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-8 text-center md:text-left">
                <div className="inline-block mb-3 px-3 py-1 bg-orange-50 border border-orange-100 rounded-lg">
                  <span className="text-[10px] font-black tracking-widest text-[#CC6A14] uppercase">Pendaftaran Anggota</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Mulai Belajar.</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* KOLOM 1: Nama Lengkap */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Masukkan nama lengkap Anda" className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] focus:bg-white rounded-xl text-xs font-medium outline-none text-black transition-all" />
                </div>

                {/* KOLOM 2: Nomor WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Nomor WhatsApp</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="0812345678xx" className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] focus:bg-white rounded-xl text-xs font-medium outline-none text-black transition-all" />
                </div>

                {/* KOLOM 3: Kota Asal */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kota</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="Masukkan kota asal Anda" className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] focus:bg-white rounded-xl text-xs font-medium outline-none text-black transition-all" />
                </div>

                {/* KOLOM 4: Asal Sekolah */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Asal Sekolah</label>
                  <input type="text" name="school" required value={formData.school} onChange={handleChange} placeholder="Masukkan nama sekolah Anda" className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] focus:bg-white rounded-xl text-xs font-medium outline-none text-black transition-all" />
                </div>

                {/* KOLOM 5: Kelas */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kelas</label>
                  <input type="text" name="grade" required value={formData.grade} onChange={handleChange} placeholder="Contoh: 10, 11, 12, atau Umum" className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 focus:border-[#FF9233] focus:bg-white rounded-xl text-xs font-medium outline-none text-black transition-all" />
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-2 bg-[#FF9233] hover:bg-[#E67E22] disabled:bg-orange-300 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 tracking-wide shadow-md transition-colors uppercase">
                  {isLoading ? <span>Memproses...</span> : <span>Konfirmasi & Daftar Sekarang →</span>}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-50 text-[#FF9233] rounded-full flex items-center justify-center text-2xl font-bold mb-6 border border-orange-100 shadow-sm">✓</div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Pendaftaran Berhasil!</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed mb-8">
                Halo <span className="font-bold text-black">{formData.fullName}</span>, data Anda telah tersimpan ke database. Tim bimbingan akademik kami akan segera menghubungi Anda via WhatsApp.
              </p>
              <button onClick={() => { setIsSubmitted(false); setFormData({ fullName: '', phone: '', city: '', school: '', grade: '' }); }} className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold transition-colors">Kembali</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}