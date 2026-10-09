import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { getTasks, getSchedule } from '../services/storageService'; 
import { BookOpen, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any>({ imageUrl: '', timeSlots: { senin: [], selasa_kamis: [], jumat: [] } });
  
  // State untuk melihat jam pelajaran hari apa
  const [activeDay, setActiveDay] = useState<'senin' | 'selasa_kamis' | 'jumat'>('senin');

  useEffect(() => {
    const taskData = typeof getTasks !== 'undefined' ? getTasks() : [];
    setTasks(taskData);
    setSchedule(getSchedule());
  }, []);

  // Ambil daftar jam berdasarkan hari yang dipilih
  const currentSlots = schedule.timeSlots[activeDay] || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full flex-1 mb-20 animate-in fade-in duration-500">
        
        <div className="text-center mb-10">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Akademik</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-3">Jadwal & Tugas</h1>
          <p className="text-slate-500">Pantau jadwal pelajaran dan deadline tugas kelas XII-F.</p>
        </div>

        {/* --- BAGIAN 1: FOTO JADWAL DINAMIS --- */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-primary" size={24}/>
            <h2 className="text-2xl font-bold text-slate-800">Jadwal Pelajaran</h2>
          </div>
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-slate-100 shadow-inner group relative">
            {schedule.imageUrl ? (
              <img src={schedule.imageUrl} alt="Jadwal Pelajaran Kelas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">Jadwal belum diatur</div>
            )}
          </div>
        </div>

        {/* --- BAGIAN 2: JAM PELAJARAN (Terbagi Kategori Hari) --- */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-lg mb-12 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-white/5 rotate-12">
            <Clock size={150} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-amber-400" size={24}/>
              <h2 className="text-xl font-bold">Waktu & Jam Belajar</h2>
            </div>
            
            {/* Pilihan Hari */}
            <div className="flex gap-2 mb-6">
              <button onClick={() => setActiveDay('senin')} className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeDay === 'senin' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Senin</button>
              <button onClick={() => setActiveDay('selasa_kamis')} className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeDay === 'selasa_kamis' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Selasa - Kamis</button>
              <button onClick={() => setActiveDay('jumat')} className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeDay === 'jumat' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Jumat</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm font-medium animate-in fade-in key={activeDay}">
              {currentSlots.map((ts: any) => (
                <div key={ts.id} className={`flex justify-between border-b border-slate-700 pb-2 ${ts.isBreak ? 'text-amber-400 font-bold' : 'text-slate-200'}`}>
                  <span>{ts.label}</span> 
                  <span>{ts.time}</span>
                </div>
              ))}
              {currentSlots.length === 0 && <p className="text-slate-400 italic">Jam pelajaran untuk hari ini belum diatur.</p>}
            </div>
          </div>
        </div>

        {/* --- BAGIAN 3: DAFTAR TUGAS --- */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-blue-500" size={24}/>
          <h2 className="text-2xl font-bold text-slate-800">Daftar Tugas & PR</h2>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-dashed border-slate-300 text-center">
            <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={48}/>
            <h3 className="font-bold text-slate-800 text-lg mb-1">Hore! Belum ada tugas.</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">Bisa santai dulu atau cek Dashboard Admin jika ada PR baru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tasks.map((t: any) => (
              <div key={t.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md w-fit mb-2 uppercase tracking-wider">{t.subject}</span>
                <h4 className="font-bold text-slate-800 text-base mb-2 line-clamp-2">{t.title}</h4>
                <p className="text-xs text-slate-500 mb-4 flex-1 line-clamp-3">{t.description}</p>
                <div className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg w-fit">
                  Deadline: {t.deadline || 'Belum diatur'}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};