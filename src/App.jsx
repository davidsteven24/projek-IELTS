// src/App.jsx
import React from 'react';
import PageHeader from './components/customer/PageHeader';
import CleanSplitHeroBanner from './components/customer/HeroBanner';
import CampusPartners from './components/customer/mitraCampus';
import SchedulePage from './components/customer/schedule';
import FeePage from './components/customer/feePage';
import DaftarPage from './components/customer/Daftar'; // Diimport dengan benar

export default function App() {
  return (
    <div className="bg-[#F2F2F2] min-h-screen text-black">
      <PageHeader />
      <main>
        <CleanSplitHeroBanner />
        <CampusPartners />
        <SchedulePage />
        <FeePage />      {/* Tombol klik ada di sini */}
        <DaftarPage />   {/* Target scroll meluncur ke sini */}
      </main>
    </div>
  );
}