import React, { useState } from 'react';
import { getOfficers, saveOfficers } from '../../services/storageService';
import { Trash2, UserPlus, Pencil, X } from 'lucide-react';

export const DashboardMembers: React.FC = () => {
  const [members, setMembers] = useState(getOfficers());
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [nisn, setNisn] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const uploadKeCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kelas xii-f'); // Sesuaikan nama preset-mu
    const res = await fetch('https://api.cloudinary.com/v1_1/h6vcuxga/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.secure_url; 
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadKeCloudinary(file);
        setPhotoUrl(url);
      } catch (error) {
        alert("Gagal mengunggah foto.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    let updated;
    if (editingId) {
      // Mode Edit
      updated = members.map((m: any) => 
        m.id === editingId ? { ...m, name, role, nisn, description, photo: photoUrl || m.photo } : m
      );
    } else {
      // Mode Tambah Baru
      const newItem = {
        id: Date.now().toString(),
        name, role, nisn, description,
        photo: photoUrl || 'https://via.placeholder.com/150'
      };
      updated = [...members, newItem];
    }

    setMembers(updated); 
    saveOfficers(updated);
    batalEdit();
  };

  const klikEdit = (m: any) => {
    setName(m.name);
    setRole(m.role);
    setNisn(m.nisn || '');
    setDescription(m.description || '');
    setPhotoUrl(m.photo);
    setEditingId(m.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const batalEdit = () => {
    setName(''); setRole(''); setNisn(''); setDescription(''); setPhotoUrl(''); setEditingId(null);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Anggota & Pengurus</h1>
      <p className="text-slate-500 text-sm mb-8">Kelola daftar murid, NISN, dan foto.</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 max-w-3xl mb-12 relative">
        {editingId && (
          <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
            Mode Edit <button type="button" onClick={batalEdit}><X size={14}/></button>
          </div>
        )}
        
        <div className="flex gap-6 items-start flex-wrap">
          <div className="w-28 h-28 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden relative shrink-0">
            {isUploading ? <span className="text-xs text-primary animate-pulse">Mengunggah...</span> : photoUrl ? <img src={photoUrl} className="w-full h-full object-cover"/> : <span className="text-xs text-slate-400">Belum ada foto</span>}
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>

          <div className="flex-1 space-y-4 min-w-[250px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Nama Lengkap" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" required/>
              <input type="text" placeholder="Jabatan" value={role} onChange={e=>setRole(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" required/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="NISN (Opsional)" value={nisn} onChange={e=>setNisn(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"/>
              <input type="text" placeholder="Kata-kata Singkat" value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"/>
            </div>
          </div>
        </div>
        <button type="submit" disabled={isUploading} className="bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2">
          <UserPlus size={16}/> {editingId ? 'Simpan Perubahan' : 'Tambah Anggota'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m: any) => (
          <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <img src={m.photo} className="w-14 h-14 rounded-full object-cover shrink-0"/>
            <div className="flex-1 overflow-hidden">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1 inline-block">{m.role}</span>
              <h4 className="font-bold text-slate-800 text-sm truncate">{m.name}</h4>
            </div>
            <div className="flex gap-2">
              <button onClick={() => klikEdit(m)} className="text-amber-500 bg-amber-50 p-2 rounded-xl"><Pencil size={16}/></button>
              <button onClick={() => {const up = members.filter((x: any) => x.id !== m.id); setMembers(up); saveOfficers(up);}} className="text-rose-400 bg-rose-50 p-2 rounded-xl"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};