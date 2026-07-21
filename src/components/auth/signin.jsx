import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage({ onClose, onLoginSuccess }) {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { email, password };

    fetch('http://localhost:5000/api/login', {
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
    .then(data => {
      alert('Login Berhasil! Selamat Datang Admin.');
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      onClose();          
      navigate('/admin'); 
    })
    .catch(err => {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan koneksi ke server.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose} 
      />

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 relative z-10 overflow-hidden text-black flex flex-col md:flex-row min-h-[450px] animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          type="button"
          className="btn btn-sm btn-circle absolute top-4 right-4 bg-gray-50 border-none hover:bg-gray-100 text-gray-400 hover:text-black z-20"
        >
          ✕
        </button>

        <div className="w-full md:w-1/2 bg-[#EFF4F9] p-8 flex flex-col items-center justify-between relative min-h-[200px] md:min-h-full">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
          <div className="hidden md:block"></div>

          <div className="text-center z-10 my-auto md:my-0">
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-black text-[#1e293b] tracking-tight">Kion &amp; Co.</span>
            </div>
            <p className="text-[10px] font-bold text-orange-500 tracking-widest uppercase mt-0.5">Education Consultant</p>
          </div>

          <div className="w-36 md:w-44 z-10 hidden sm:block">
            <img 
              src="https://img.freepik.com/free-vector/graduation-cap-with_23-2147502390.jpg" 
              alt="Graduation Illustration" 
              className="w-full h-auto mix-blend-multiply opacity-80"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Welcome Back!</h3>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">sign in to continue to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-700">Email Address</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 text-xs">✉</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  className="w-full pl-10 pr-4 py-3 bg-[#F9F7F7] border border-transparent focus:border-gray-300 focus:bg-white rounded-lg text-xs font-medium outline-none transition-all text-black" 
                  required 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 text-xs">🔒</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password" 
                  className="w-full pl-10 pr-4 py-3 bg-[#F9F7F7] border border-transparent focus:border-gray-300 focus:bg-white rounded-lg text-xs font-medium outline-none transition-all text-black" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn w-full mt-4 bg-[#FF9838] hover:bg-[#e68228] border-none text-white text-sm font-bold tracking-wide shadow-sm shadow-orange-200 capitalize"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-white"></span>
                  Logging in...
                </>
              ) : (
                "login"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}