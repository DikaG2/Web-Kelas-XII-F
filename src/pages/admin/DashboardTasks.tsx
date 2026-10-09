import React, { useState } from 'react';
import { getTasks, saveTasks } from '../../services/storageService';
import { TaskItem } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const DashboardTasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(getTasks());
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<TaskItem['status']>('Belum dikerjakan');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !deadline) return;
    const newItem: TaskItem = {
      id: Date.now().toString(), title, subject, teacher: '', description: '', deadline, status
    };
    const updated = [newItem, ...tasks];
    setTasks(updated); saveTasks(updated);
    setTitle(''); setSubject(''); setDeadline('');
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Manajemen Tugas Kelas</h1>
      <p className="text-slate-500 text-sm mb-8">Tambah list tugas & PR untuk murid XII-F.</p>

      <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 max-w-2xl mb-12">
        <h3 className="font-bold text-lg text-slate-800">Tambah Tugas Baru</h3>
        <input type="text" placeholder="Judul Tugas" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" required/>
        <input type="text" placeholder="Mata Pelajaran (misal: Fisika)" value={subject} onChange={e => setSubject(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" required/>
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" required/>
          <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary">
            <option value="Belum dikerjakan">Belum dikerjakan</option>
            <option value="Sedang dikerjakan">Sedang dikerjakan</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2"><Plus size={18}/> Tambah Tugas</button>
      </form>

      <div className="space-y-4 max-w-2xl">
        {tasks.map(t => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-primary">{t.subject} &bull; Deadline: {t.deadline}</span>
              <h4 className="font-bold text-slate-800 text-lg">{t.title}</h4>
            </div>
            <button onClick={() => {const up = tasks.filter(x => x.id !== t.id); setTasks(up); saveTasks(up);}} className="bg-rose-50 text-rose-600 p-3 rounded-xl hover:bg-rose-100 transition-colors"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};