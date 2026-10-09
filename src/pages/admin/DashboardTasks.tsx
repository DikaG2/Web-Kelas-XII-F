import React, { useState } from 'react';
import { getTasks, saveTasks, getSchedule, saveSchedule } from '../../services/storageService';
import { BookOpen, Calendar, Clock, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export const DashboardTasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tugas' | 'jadwal'>('tugas');
  const [activeDayTab, setActiveDayTab] = useState<'senin' | 'selasa_kamis' | 'jumat'>('senin');

  // --- STATE TUGAS (Ditambah <any[]> agar tidak error saat di-build) ---
  const [tasks, setTasks] = useState<any[]>(typeof getTasks !== 'undefined' ? getTasks() : []);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  // --- STATE JADWAL (Ditambah <any> agar tidak error saat di-build) ---
  const [schedule, setSchedule] = useState<any>(getSchedule());
  const [isUploading, setIsUploading] = useState(false);

  // LOGIKA TUGAS
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject) return;
    const newTask = { id: Date.now().toString(), title, subject, deadline, description };
    const updated = [...tasks, newTask];
    setTasks(updated); saveTasks(updated);
    setTitle(''); setSubject(''); setDeadline(''); setDescription('');
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t: any) => t.id !== id);
    setTasks(updated); saveTasks(updated);
  };

  // LOGIKA JADWAL
  const uploadKeCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // PASTIKAN INI NAMA PRESET-MU YANG BENAR
    formData.append('upload_preset', 'kelas xii-f'); 

    const res = await fetch('https://api.cloudinary.com/v1_1/h6vcuxga/image/upload', {
      method: 'POST', body: formData,
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Gagal terhubung');
    return data.secure_url;
  };

  const handleUploadJadwal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadKeCloudinary(file);
        const updated = { ...schedule, imageUrl: url };
        setSchedule(updated); saveSchedule(updated);
      } catch (err: any) {
        alert("Gagal mengunggah foto: " + err.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // LOGIKA JAM PELAJARAN
  const handleAddTimeSlot = (day: string) => {
    const updated = { 
      ...schedule, 
      timeSlots: {
        ...schedule.timeSlots,
        [day]: [...schedule.timeSlots[day], { id: Date.now().toString(), label: 'Jam ke-', time: '00:00 - 00:00', isBreak: false }]
      }
    };
    setSchedule(updated); saveSchedule(updated);
  };

  const handleRemoveTimeSlot = (day: string, id: string) => {
    const updated = { 
      ...schedule, 
      timeSlots: {
        ...schedule.timeSlots,
        [day]: schedule.timeSlots[day].filter((ts: any) => ts.id !== id)
      }
    };
    setSchedule(updated); saveSchedule(updated);
  };

  const handleUpdateTimeSlot = (day: string, id: string, field: string, value: any) => {
    const updatedSlots = schedule.timeSlots[day].map((ts: any) => ts.id === id ? { ...ts, [field]: value } : ts);
    const updated = { 
      ...schedule, 
      timeSlots: {
        ...schedule.timeSlots,
        [day]: updatedSlots
      }
    };
    setSchedule(updated); saveSchedule(updated);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Akademik</h1>
      <p className="text-slate-500 text-sm mb-8">Kelola tugas, jadwal pelajaran, dan jam kelas.</p>

      {/* TAB NAVIGASI UTAMA */}
      <div className="flex gap-4 mb-8 border-b border-slate-200 pb-px">
        <button onClick={() => setActiveTab('tugas')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'tugas' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>
          <div className="flex items-center gap-2"><BookOpen size={16}/> Daftar Tugas</div>
        </button>
        <button onClick={() => setActiveTab('jadwal')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'jadwal' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>
          <div className="flex items-center gap-2"><Calendar size={16}/> Pengaturan Jadwal</div>
        </button>
      </div>

      {/* === KONTEN TAB TUGAS === */}
      {activeTab === 'tugas' && (
        <div className="space-y-8 animate-in fade-in">
          <form onSubmit={handleAddTask} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Tambah Tugas Baru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Mata Pelajaran (Cth: Matematika)" value={subject} onChange={e=>setSubject(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" required/>
              <input type="text" placeholder="Judul Tugas (Cth: Bab 1 Aljabar)" value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" required/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Tenggat Waktu / Deadline (Cth: Besok, 12:00)" value={deadline} onChange={e=>setDeadline(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none"/>
            </div>
            <textarea placeholder="Deskripsi atau Catatan Tugas..." value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none mb-4 h-24 resize-none"></textarea>
            <button type="submit" className="bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm w-full md:w-auto">Simpan Tugas</button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((t: any) => (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md uppercase">{t.subject}</span>
                  <button onClick={() => handleDeleteTask(t.id)} className="text-rose-400 p-1 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{t.title}</h4>
                <p className="text-xs text-slate-500 mb-3 flex-1">{t.description}</p>
                <div className="text-xs font-bold text-rose-500">Deadline: {t.deadline}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === KONTEN TAB JADWAL === */}
      {activeTab === 'jadwal' && (
        <div className="space-y-8 animate-in fade-in max-w-4xl">
          
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><ImageIcon size={20} className="text-blue-500"/> Foto Jadwal Pelajaran</h2>
            <div className="relative w-full h-48 md:h-64 bg-slate-100 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 flex flex-col items-center justify-center group">
              {isUploading ? (
                <span className="text-primary font-bold animate-pulse">Sedang Mengunggah...</span>
              ) : (
                <>
                  <img src={schedule.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute flex flex-col items-center">
                    <div className="bg-slate-900 text-white p-3 rounded-full mb-2"><ImageIcon size={24}/></div>
                    <span className="text-sm font-bold text-slate-900 bg-white/80 px-3 py-1 rounded-full">Klik untuk Ganti Foto</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleUploadJadwal} disabled={isUploading} className="absolute inset-0 opacity-0 cursor-pointer" />
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-amber-500"/> Atur Jam Pelajaran</h2>
            
            <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6">
              <button onClick={() => setActiveDayTab('senin')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeDayTab === 'senin' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-800'}`}>Senin</button>
              <button onClick={() => setActiveDayTab('selasa_kamis')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeDayTab === 'selasa_kamis' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-800'}`}>Selasa - Kamis</button>
              <button onClick={() => setActiveDayTab('jumat')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeDayTab === 'jumat' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-800'}`}>Jumat</button>
            </div>

            <div className="flex justify-end mb-4">
              <button onClick={() => handleAddTimeSlot(activeDayTab)} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"><Plus size={14}/> Tambah Jam</button>
            </div>
            
            <div className="space-y-3">
              {schedule.timeSlots[activeDayTab]?.map((ts: any) => (
                <div key={ts.id} className={`flex items-center gap-3 p-3 rounded-xl border ${ts.isBreak ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-200'}`}>
                  <input type="text" value={ts.label} onChange={(e) => handleUpdateTimeSlot(activeDayTab, ts.id, 'label', e.target.value)} placeholder="Label (Jam ke-1)" className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-700"/>
                  <input type="text" value={ts.time} onChange={(e) => handleUpdateTimeSlot(activeDayTab, ts.id, 'time', e.target.value)} placeholder="07:00 - 07:45" className="w-32 bg-transparent border-none outline-none text-sm text-slate-600 text-center"/>
                  
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 cursor-pointer border-l border-slate-300 pl-3">
                    <input type="checkbox" checked={ts.isBreak} onChange={(e) => handleUpdateTimeSlot(activeDayTab, ts.id, 'isBreak', e.target.checked)} className="accent-rose-500 w-4 h-4" />
                    Istirahat?
                  </label>
                  <button onClick={() => handleRemoveTimeSlot(activeDayTab, ts.id)} className="text-slate-400 hover:text-rose-500 p-1 ml-2"><Trash2 size={16}/></button>
                </div>
              ))}
              {(!schedule.timeSlots[activeDayTab] || schedule.timeSlots[activeDayTab].length === 0) && (
                <p className="text-slate-500 text-sm text-center py-4 bg-slate-50 rounded-xl">Belum ada jam pelajaran untuk kategori hari ini.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};