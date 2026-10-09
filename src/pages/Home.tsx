import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getProfile, getAlbums } from '../services/storageService';
import { Users, UserCheck, Award, ArrowRight, Search } from 'lucide-react';

export const Home: React.FC = () => {
  const profile = getProfile();
  const albums = getAlbums().slice(0, 3);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden bg-slate-900 text-white py-28 px-6 md:px-16 flex flex-col justify-center items-center text-center shadow-xl animate-in fade-in duration-500">
        
        {/* PERBAIKAN GAMBAR BACKGROUND: Dibuat lebih terang dan jelas */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60" 
          style={{ backgroundImage: `url('${profile.heroImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="bg-primary/30 border border-primary/40 text-primary-light px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 inline-block backdrop-blur-md">
            Official Fnatic {profile.className}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md">One Class, One Story</h1>
          <p className="text-slate-200 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow">{profile.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/album" className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2">
              Lihat Album <ArrowRight size={18}/>
            </Link>
            <Link to="/profil" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-bold backdrop-blur-md transition-all">
              Profil Kelas
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Search Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20 w-full animate-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="bg-white rounded-2xl shadow-xl p-3 border border-slate-100 flex items-center gap-3">
          <Search className="text-slate-400 ml-3" size={20}/>
          <input 
            type="text" 
            placeholder="Cari tugas, album, atau informasi kelas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && searchQuery) navigate(`/search?q=${encodeURIComponent(searchQuery)}`); }}
            className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm md:text-base font-medium"
          />
          <button onClick={() => { if (searchQuery) navigate(`/search?q=${encodeURIComponent(searchQuery)}`); }} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition-colors">
            Cari
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 w-full animate-in fade-in duration-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold"><Users size={28}/></div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-800">{profile.totalStudents}</h3>
              <p className="text-slate-500 font-medium">Total Siswa Kelas</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"><UserCheck size={28}/></div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-800">{profile.maleCount}</h3>
              <p className="text-slate-500 font-medium">Laki-laki</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold"><Award size={28}/></div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-800">{profile.femaleCount}</h3>
              <p className="text-slate-500 font-medium">Perempuan</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};