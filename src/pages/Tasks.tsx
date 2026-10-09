import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { getTasks } from '../services/storageService';
import { TaskItem } from '../types';
import { BookOpen, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    const data = getTasks();
    if (data) setTasks(data);
  }, []);

  // Fungsi untuk memberi warna berbeda berdasarkan status tugas
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Sedang dikerjakan': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Terlambat': return 'bg-rose-50 text-rose-600 border-rose-200';
      default: return 'bg-amber-50 text-amber-600 border-amber-200'; // Belum dikerjakan
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full flex-1 mb-20 animate-in fade-in duration-500">
        
        {/* Header Halaman */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 w-max mx-auto mb-4">
            <BookOpen size={14}/> Akademik
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Daftar Tugas & PR</h1>
          <p className="text-slate-500 text-sm">Pantau jadwal deadline agar tidak ada tugas kelas XII-F yang terlewat.</p>
        </div>

        {/* Grid Daftar Tugas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
              <p className="text-slate-600 font-bold text-lg">Hore! Belum ada tugas.</p>
              <p className="text-slate-400 text-sm mt-1">Bisa santai dulu atau cek Dashboard Admin jika ada PR baru.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all group">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-slate-50 text-slate-700 font-extrabold text-xs px-3 py-1.5 rounded-full tracking-wide border border-slate-200">
                      {task.subject}
                    </span>
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl text-slate-800 mb-2 leading-snug group-hover:text-primary transition-colors">{task.title}</h3>
                  {task.description && <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">{task.description}</p>}
                </div>
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-sm mt-auto">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5"><Clock size={16}/> Deadline:</span>
                  <strong className="text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-rose-100"><Calendar size={14}/> {task.deadline}</strong>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};