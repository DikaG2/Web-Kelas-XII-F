import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
// Pastikan getTasks di-import dari storageService
import { getProfile, getOfficers, getAlbums, getTasks } from '../services/storageService';
import { Users, UserCheck, Award, ArrowRight, Search, X, ZoomIn, Image as ImageIcon, BookOpen } from 'lucide-react';

export const Home: React.FC = () => {
  const profile = getProfile();
  const members = getOfficers();
  const albums = getAlbums(); 
  const tasks = typeof getTasks !== 'undefined' ? getTasks() : []; // Ambil data tugas
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  // LOGIKA PENCARIAN GLOBAL
  const query = searchQuery.toLowerCase();
  
  const filteredMembers = query ? members.filter((m: any) => 
    m.name.toLowerCase().includes(query) || 
    m.role.toLowerCase().includes(query) ||
    (m.description && m.description.toLowerCase().includes(query))
  ) : [];

  const filteredAlbums = query ? albums.filter((a: any) => 
    a.title.toLowerCase().includes(query) || 
    a.category.toLowerCase().includes(query)
  ) : [];

  // Filter Tugas
  const filteredTasks = query ? tasks.filter((t: any) => 
    t.title.toLowerCase().includes(query) || 
    t.subject.toLowerCase().includes(query)
  ) : [];

  const totalResults = filteredMembers.length + filteredAlbums.length + filteredTasks.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="relative mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden bg-slate-900 text-white py-28 px-6 md:px-16 flex flex-col justify-center items-center text-center shadow-xl animate-in fade-in duration-500">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url('${profile.heroImage}')` }}></div>
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

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20 w-full animate-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="bg-white rounded-2xl shadow-xl p-3 border border-slate-100 flex items-center gap-3">
          <Search className="text-slate-400 ml-3" size={20}/>
          <input 
            type="text" 
            placeholder="Cari anggota, album, atau tugas/PR..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm md:text-base font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 w-full mt-12 mb-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Hasil Pencarian: <span className="text-primary">"{searchQuery}"</span>
            </h2>
            <span className="text-sm font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-full">{totalResults} ditemukan</span>
          </div>

          {totalResults === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
              <Search className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">Yah, tidak ada hasil yang cocok dengan pencarianmu.</p>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* Hasil Tugas */}
              {filteredTasks.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-amber-500"/> Daftar Tugas & PR
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map((t: any) => (
                      <Link to="/tugas" key={t.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group">
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md w-fit mb-2">{t.subject}</span>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">{t.title}</h4>
                        <p className="text-xs text-slate-500">Deadline: {t.deadline || '-'}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Hasil Anggota */}
              {filteredMembers.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Users size={20} className="text-primary"/> Anggota Kelas
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMembers.map((m: any) => (
                      <div key={m.id} onClick={() => setSelectedMember(m)} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer text-center group">
                        <img src={m.photo} className="w-20 h-20 mx-auto rounded-full object-cover mb-3 group-hover:scale-105 transition-transform" />
                        <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{m.name}</h3>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block">{m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hasil Album */}
              {filteredAlbums.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <ImageIcon size={20} className="text-blue-500"/> Album & Galeri
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAlbums.map((item: any) => (
                      <Link to="/album" key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-center group">
                        <div className="w-24 h-24 shrink-0 overflow-hidden bg-slate-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <div className="p-4 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{item.category}</span>
                          <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{item.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Stats Section */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 w-full animate-in fade-in duration-700 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold"><Users size={28}/></div>
              <div><h3 className="text-3xl font-extrabold text-slate-800">{profile.totalStudents}</h3><p className="text-slate-500 font-medium">Total Siswa Kelas</p></div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"><UserCheck size={28}/></div>
              <div><h3 className="text-3xl font-extrabold text-slate-800">{profile.maleCount}</h3><p className="text-slate-500 font-medium">Laki-laki</p></div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold"><Award size={28}/></div>
              <div><h3 className="text-3xl font-extrabold text-slate-800">{profile.femaleCount}</h3><p className="text-slate-500 font-medium">Perempuan</p></div>
            </div>
          </div>
        </section>
      )}

      {/* MODAL BIODATA ANGGOTA */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 bg-slate-400 text-white p-1.5 rounded-lg hover:bg-rose-500 transition-colors z-10"><X size={24} /></button>
            <div className="w-full md:w-1/2 relative group rounded-2xl overflow-hidden shadow-md">
              <img src={selectedMember.photo} className="w-full h-full object-cover aspect-[3/4]" />
              <button onClick={() => setIsPhotoExpanded(true)} className="absolute top-3 right-3 bg-white/90 p-2 rounded-xl text-primary opacity-80 hover:opacity-100 transition-opacity shadow-sm"><ZoomIn size={20} /></button>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-slate-800 space-y-4">
              <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-wide">BIODATA</h2>
              <div className="space-y-2 text-sm md:text-base font-medium">
                <p><span className="font-bold w-24 inline-block">NAMA</span> : {selectedMember.name}</p>
                <p><span className="font-bold w-24 inline-block">SEBAGAI</span> : {selectedMember.role}</p>
                <p><span className="font-bold w-24 inline-block">NISN</span> : {selectedMember.nisn || '---'}</p>
                <p><span className="font-bold w-24 inline-block">KATA KATA</span> : {selectedMember.description || '---'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPhotoExpanded && selectedMember && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" onClick={() => setIsPhotoExpanded(false)}>
          <button className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-rose-500 transition-colors"><X size={28} /></button>
          <img src={selectedMember.photo} className="max-w-full max-h-[90vh] object-contain rounded-xl" />
        </div>
      )}
    </div>
  );
};