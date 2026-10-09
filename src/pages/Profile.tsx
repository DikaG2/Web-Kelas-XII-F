import React from 'react';
import { Navbar } from '../components/Navbar';
import { getProfile, getOfficers } from '../services/storageService';

export const Profile: React.FC = () => {
  const profile = getProfile();
  const members = getOfficers(); // Kita gunakan array ini untuk semua anggota

  // Fallback foto jika belum diatur
  const waliKelasPhoto = (profile as any).homeroomTeacherPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full flex-1 mb-20 animate-in fade-in duration-500">
        
        {/* Section 1: Profil Kelas Umum */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Profil Kelas</span>
              <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">Keluarga Besar <br/>Kelas {profile.className}</h1>
              <p className="text-slate-600 leading-relaxed mb-8">{profile.description}</p>
              
              <div className="inline-block bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl">
                <span className="text-xs text-slate-400 block font-bold uppercase mb-1">Tahun Ajaran</span>
                <strong className="text-slate-800 text-lg">{profile.academicYear}</strong>
              </div>
            </div>
            <div className="h-80 lg:h-96 rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img src={profile.classPhoto} alt="Foto Kelas" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
            </div>
          </div>
        </div>

        {/* Section 2: WALI KELAS (Spesial VIP Card) */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 shadow-lg mb-16 flex flex-col md:flex-row items-center gap-8 text-white relative overflow-hidden">
          {/* Aksen Dekorasi */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="shrink-0 relative z-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-xl">
              <img src={waliKelasPhoto} alt="Wali Kelas" className="w-full h-full object-cover"/>
            </div>
          </div>
          <div className="text-center md:text-left relative z-10 flex-1">
            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 inline-block">Wali Kelas {profile.className}</span>
            <h2 className="text-3xl font-extrabold mb-2">{profile.homeroomTeacher}</h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">Beliau adalah pembimbing, orang tua kedua, sekaligus inspirasi kami dalam menempuh pendidikan di kelas ini. Terima kasih atas segala kesabaran dan ilmu yang diberikan.</p>
          </div>
        </div>

        {/* Section 3: GRID SEMUA ANGGOTA KELAS */}
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">Anggota & Pengurus Kelas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col group text-center">
              <div className="h-48 md:h-56 bg-slate-100 overflow-hidden relative">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                {/* Badge Jabatan Absolute */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-md ${
                    member.role.toLowerCase().includes('ketua') || member.role.toLowerCase().includes('wakil') 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-slate-800'
                  }`}>
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1 line-clamp-1">{member.name}</h3>
                {member.description && <p className="text-slate-500 text-xs italic line-clamp-2">"{member.description}"</p>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};