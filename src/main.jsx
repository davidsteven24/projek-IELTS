import React, { lazy, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/auth/Loading.jsx'; 
import './assets/tailwind.css';

const PageHeader = lazy(() => import("./components/customer/PageHeader.jsx"));
const HeroBanner = lazy(() => import("./components/customer/HeroBanner.jsx"));
const Information = lazy(() => import("./components/customer/Information.jsx"));
const Campus = lazy(() => import("./components/customer/mitraCampus.jsx"));
const Schedule = lazy(() => import("./components/customer/schedule.jsx"));
const Fee = lazy(() => import("./components/customer/feePage.jsx"));
const Daftar = lazy(() => import("./components/customer/Daftar.jsx"));
const SignIn = lazy(() => import('./components/auth/signin.jsx'));

const EditInformation = lazy(() => import('./components/admin/infromasi.jsx'));
const EditMitraCampus = lazy(() => import('./components/admin/Mitra.jsx'));
const EditJadwalForm = lazy(() => import('./components/admin/Jadwal.jsx'));
const BiayaDashboard = lazy(() => import('./components/admin/Biaya.jsx'));
const DaftarSiswaDashboard = lazy(() => import('./components/admin/DaftarSiswa.jsx'));

function ProtectedRoute({ isAuthenticated, children }) {
  const token = sessionStorage.getItem('token') || isAuthenticated;
  
  if (!token) {
    alert('Akses ditolak! Anda harus login terlebih dahulu.');
    return <Navigate to="/" replace />;
  }

  return children;
}

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('token', 'admin-logged-in-secret-key');
    setIsAuthenticated(true);
    setIsSignInOpen(false);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div>
            <PageHeader onSignInClick={() => setIsSignInOpen(true)} />
            <HeroBanner />
            <Information />
            <Campus />
            <Schedule />
            <Fee />
            <Daftar />
            {isSignInOpen && (
              <SignIn 
                onClose={() => setIsSignInOpen(false)} 
                onLoginSuccess={handleLoginSuccess} 
              />
            )}
          </div>
        } 
      />

      <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><EditInformation /></ProtectedRoute>} />
      <Route path="/admin/mitra" element={<ProtectedRoute isAuthenticated={isAuthenticated}><EditMitraCampus /></ProtectedRoute>} />
      <Route path="/admin/jadwal" element={<ProtectedRoute><ProtectedRoute isAuthenticated={isAuthenticated}><EditJadwalForm /></ProtectedRoute></ProtectedRoute>} />
      <Route path="/admin/biaya" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BiayaDashboard /></ProtectedRoute>} />
      <Route path="/admin/siswa" element={<ProtectedRoute isAuthenticated={isAuthenticated}><DaftarSiswaDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <MainApp />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);