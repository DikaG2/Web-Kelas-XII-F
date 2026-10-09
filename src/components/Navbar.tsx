import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Fungsi kecil untuk mewarnai menu yang sedang aktif
  const isActive = (path: string) => location.pathname === path ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary';

  return (
    <nav className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tambahan w-full dan justify-between agar menyebar rata */}
      <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-sm border border-slate-200/80 flex items-center justify-between w-full">
        
        {/* KIRI: Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="bg-primary text-white font-extrabold px-3 py-1.5 rounded-full text-sm shadow-sm">XII-F</span>
          <span className="font-bold text-slate-800 tracking-tight hidden sm:block">Class</span>
        </Link>

        {/* TENGAH: Menu Navigasi */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8 text-sm font-medium">
          <Link to="/" className={`transition-colors ${isActive('/')}`}>Beranda</Link>
          <Link to="/profil" className={`transition-colors ${isActive('/profil')}`}>Profil</Link>
          <Link to="/album" className={`transition-colors ${isActive('/album')}`}>Album</Link>
          <Link to="/tugas" className={`transition-colors ${isActive('/tugas')}`}>Tugas</Link>
        </div>

        {/* KANAN: Tombol Admin (Desain Light Blue seperti Foto ke-2) */}
        <div className="hidden md:flex items-center shrink-0">
          <Link 
            to="/admin/login" 
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2"
          >
            <Shield size={16}/> Admin
          </Link>
        </div>

        {/* Tombol Hamburger Menu untuk Mobile (HP) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-700 p-1 ml-auto shrink-0">
          {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex flex-col gap-3 text-sm font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className={`px-3 py-2 rounded-lg ${location.pathname === '/' ? 'bg-slate-50 text-primary font-bold' : 'text-slate-600'}`}>Beranda</Link>
          <Link to="/profil" onClick={() => setIsOpen(false)} className={`px-3 py-2 rounded-lg ${location.pathname === '/profil' ? 'bg-slate-50 text-primary font-bold' : 'text-slate-600'}`}>Profil</Link>
          <Link to="/album" onClick={() => setIsOpen(false)} className={`px-3 py-2 rounded-lg ${location.pathname === '/album' ? 'bg-slate-50 text-primary font-bold' : 'text-slate-600'}`}>Album</Link>
          <Link to="/tugas" onClick={() => setIsOpen(false)} className={`px-3 py-2 rounded-lg ${location.pathname === '/tugas' ? 'bg-slate-50 text-primary font-bold' : 'text-slate-600'}`}>Tugas</Link>
          <Link to="/admin/login" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-2.5 rounded-xl font-bold mt-2 flex justify-center items-center gap-2">
            <Shield size={16}/> Login Admin
          </Link>
        </div>
      )}
    </nav>
  );
};