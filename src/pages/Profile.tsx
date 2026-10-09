import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { getProfile, getOfficers } from '../services/storageService';
import { X, ZoomIn } from 'lucide-react';

export const Profile: React.FC = () => {
  const profile = getProfile();
  const allMembers = getOfficers();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  const waliKelasPhoto = (profile as any).homeroomTeacherPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop';

  // LOGIKA PEMISAHAN PENGURUS & ANGGOTA
  const isAnggota = (role: string) => {
    const r = role.toLowerCase();
    return r === 'anggota' || r === 'siswa' || r === 'murid' || r === '';
  };

  const pengurus = allMembers.filter(m => !isAnggota(m.role));
  const anggotaBiasa = allMembers.filter(m => isAnggota(m.role));

  // Pengelompokan Hierarki Pengurus
  const ketua = pengurus.filter(m => m.role.toLowerCase().includes('ketua') && !m.role.toLowerCase().includes('wakil'));
  const wakil = pengurus.filter(m => m.role.toLowerCase().includes('wakil'));
  const sekben = pengurus.filter(m => m.role.toLowerCase().includes('sekretaris') || m.role.toLowerCase().includes('bendahara'));
  const seksiLainnya = pengurus.filter(m => 
    !m.role.toLowerCase().includes('ketua') && 
    !m.role.toLowerCase().includes('wakil') && 
    !m.role.toLowerCase().includes('sekretaris') && 
    !m.role.toLowerCase().includes('bendahara')
  );

  // Komponen Kotak Foto (Node) untuk Struktur Organisasi
  const OrgNode = ({ member }: { member: any }) => (
    <div onClick={() => setSelectedMember(member)} className="flex flex-col items-center group cursor-pointer relative z-10 w-28 md:w-36 transition-transform hover:-translate-y-2">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-200">
        <img src={member.photo} className="w-full h-full object-cover" />
      </div>
      <div className="bg-white px-2 py-2 md:py-3 rounded-xl shadow-md -mt-4 border border-slate-100 text-center w-full min-h-[60px] flex flex-col justify-center">
        <span className="block text-[9px] md:text-[10px] font-bold text-primary uppercase mb-1 leading-tight">{member.role}</span>
        <h3 className="font-bold text-slate-800 text-[11px] md:text-xs line-clamp-2 leading-tight">{member.name}</h3>
      </div>
    </div>
  );

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
              <img src={profile.classPhoto} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
            </div>
          </div>
        </div>

        {/* Section 2: WALI KELAS */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 shadow-lg mb-20 flex flex-col md:flex-row items-center gap-8 text-white relative overflow-hidden">
          <div className="shrink-0 relative z-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-xl">
              <img src={waliKelasPhoto} className="w-full h-full object-cover"/>
            </div>
          </div>
          <div className="text-center md:text-left relative z-10 flex-1">
            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-3 inline-block">Wali Kelas</span>
            <h2 className="text-3xl font-extrabold mb-2">{profile.homeroomTeacher}</h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">Beliau adalah pembimbing dan inspirasi kami.</p>
          </div>
        </div>

        {/* Section 3: STRUKTUR ORGANISASI PENGURUS (Mode Tree/Pohon) */}
        {pengurus.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 inline-block relative">
                Struktur Organisasi
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-primary rounded-full"></div>
              </h2>
            </div>
            
            {/* Hierarki Tree */}
            <div className="relative flex flex-col items-center gap-12 max-w-4xl mx-auto py-8">
              {/* Garis Lurus Vertikal di Belakang */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-slate-200 -z-10 rounded-full"></div>
              
              {/* Level 1: Ketua */}
              {ketua.length > 0 && (
                <div className="flex justify-center gap-4">
                  {ketua.map(m => <OrgNode key={m.id} member={m} />)}
                </div>
              )}

              {/* Level 2: Wakil */}
              {wakil.length > 0 && (
                <div className="flex justify-center gap-4">
                  {wakil.map(m => <OrgNode key={m.id} member={m} />)}
                </div>
              )}

              {/* Level 3: Sekretaris & Bendahara (Bercabang ke Samping) */}
              {sekben.length > 0 && (
                <div className="flex justify-between w-full max-w-[280px] md:max-w-md relative">
                  {/* Garis Horizontal Cabang */}
                  <div className="absolute top-10 left-[15%] right-[15%] h-1.5 bg-slate-200 -z-10 rounded-full"></div>
                  {sekben.map(m => <OrgNode key={m.id} member={m} />)}
                </div>
              )}

              {/* Level 4: Seksi-seksi / Pengurus Lainnya */}
              {seksiLainnya.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-6 bg-white/60 p-6 rounded-3xl border border-slate-200 shadow-sm backdrop-blur-sm relative z-10 w-full">
                  {seksiLainnya.map(m => <OrgNode key={m.id} member={m} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: GRID SEMUA ANGGOTA KELAS */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Daftar Anggota Kelas</h2>
          <p className="text-slate-500 mt-2">Seluruh siswa-siswi hebat kelas {profile.className}</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {anggotaBiasa.map((member) => (
            <div key={member.id} onClick={() => setSelectedMember(member)} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col group text-center cursor-pointer">
              <div className="h-48 md:h-56 bg-slate-100 overflow-hidden relative">
                <img src={member.photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">{member.name}</h3>
              </div>
            </div>
          ))}
          {anggotaBiasa.length === 0 && (
            <div className="col-span-full text-center text-slate-500 py-10">Belum ada anggota biasa yang ditambahkan.</div>
          )}
        </div>
      </div>

      {/* MODAL BIODATA */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 bg-slate-400 text-white p-1.5 rounded-lg hover:bg-rose-500 z-10"><X size={24} /></button>
            <div className="w-full md:w-1/2 relative group rounded-2xl overflow-hidden shadow-md">
              <img src={selectedMember.photo} className="w-full h-full object-cover aspect-[3/4]" />
              <button onClick={() => setIsPhotoExpanded(true)} className="absolute top-3 right-3 bg-white/90 p-2 rounded-xl text-primary"><ZoomIn size={20} /></button>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-wide">BIODATA</h2>
              <div className="space-y-2 text-sm font-medium">
                <p><span className="font-bold w-24 inline-block">NAMA</span> : {selectedMember.name}</p>
                <p><span className="font-bold w-24 inline-block">SEBAGAI</span> : {selectedMember.role}</p>
                <p><span className="font-bold w-24 inline-block">NISN</span> : {selectedMember.nisn || '---'}</p>
                <p><span className="font-bold w-24 inline-block">KATA KATA</span> : {selectedMember.description || '---'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP FOTO LAYAR PENUH */}
      {isPhotoExpanded && selectedMember && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" onClick={() => setIsPhotoExpanded(false)}>
          <button className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-rose-500"><X size={28} /></button>
          <img src={selectedMember.photo} className="max-w-full max-h-[90vh] object-contain rounded-xl" />
        </div>
      )}
    </div>
  );
};