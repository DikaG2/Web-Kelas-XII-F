import React from 'react';
import { getProfile, getAlbums, getTasks } from '../../services/storageService';
import { Users, Image, FileText } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const profile = getProfile();
  const albums = getAlbums();
  const tasks = getTasks();

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Dashboard Overview</h1>
      <p className="text-slate-500 text-sm mb-10">Ringkasan data dan aktivitas website kelas XII-F saat ini.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold"><Users size={26}/></div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800">{profile.totalStudents}</h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Siswa</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold"><Image size={26}/></div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800">{albums.length}</h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Album</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold"><FileText size={26}/></div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800">{tasks.length}</h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Tugas Aktif</p>
          </div>
        </div>
      </div>
    </div>
  );
};