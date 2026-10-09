import React, { useState } from 'react';
import { getOfficers, saveOfficers } from '../../services/storageService';
import { Plus, Trash2, Upload, UserPlus } from 'lucide-react';

export const DashboardMembers: React.FC = () => {
  const [members, setMembers] = useState(getOfficers());
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  
  // Mengganti photoBase64 menjadi photoUrl dan menambah state loading
  const [photoUrl, setPhotoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // ==========================================
  // FUNGSI UPLOAD KE CLOUDINARY
  // ==========================================
  const uploadKeCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // GANTI 'portal_kelas' DENGAN NAMA UPLOAD PRESET-MU SENDIRI
    formData.append('upload_preset', 'kelas xii-f'); 

    // GANTI 'dika-cloud' DENGAN CLOUD NAME-MU SENDIRI
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
      setIsUploading(true); // Tampilkan loading
      try {
        const url = await uploadKeCloudinary(file);
        setPhotoUrl(url); // Simpan link gambar online
      } catch (error) {
        alert("Gagal mengunggah foto. Pastikan internet lancar dan nama preset Cloudinary benar.");
      } finally {
        setIsUploading(false); // Matikan loading
      }
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;
    const newItem = {
      id: Date.now().toString(),
      name, role, description,
      photo: photoUrl || 'https://via.placeholder.com/150'
    };
    const updated = [...members, newItem];
    setMembers(updated); saveOfficers(updated);
    setName(''); setRole(''); setDescription(''); setPhotoUrl('');
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Anggota & Pengurus</h1>
      <p className="text-slate-500 text-sm mb-8">Tambah daftar murid, atur jabatan bebas (Anggota, Ketua, dll), dan upload foto.</p>

      <form onSubmit={handleAdd} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 max-w-3xl mb-12">
        <div className="flex gap-6 items-start flex-wrap">
          {/* Preview Foto */}
          <div className="w-28 h-28 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden relative shrink-0">
            {isUploading ? (
              <span className="text-xs text-primary font-bold text-center px-2 animate-pulse">Mengunggah...</span>
            ) : photoUrl ? (
              <img src={photoUrl} className="w-full h-full object-cover"/>
            ) : (
              <span className="text-xs text-slate-400 text-center px-2">Belum ada foto</span>
            )}
            
            {/* Input file dimatikan saat sedang loading agar tidak ditumpuk */}
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 opacity-0 cursor-pointer" required={!photoUrl} />
          </div>

          <div className="flex-1 space-y-4 min-w-[250px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Nama Lengkap (Cth: Budi)" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary" required/>
              <input type="text" placeholder="Jabatan (Cth: Anggota, Ketua, Keamanan)" value={role} onChange={e=>setRole(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary" required/>
            </div>
            <input type="text" placeholder="Kata-kata Singkat / Motto (Opsional)" value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"/>
            <p className="text-[11px] text-slate-400 italic">*Klik kotak foto di sebelah kiri untuk memilih gambar dari laptop.</p>
          </div>
        </div>
        
        {/* Tombol dimatikan jika gambar masih loading */}
        <button type="submit" disabled={isUploading} className="bg-primary hover:bg-primary-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2">
          <UserPlus size={16}/> {isUploading ? 'Tunggu Sebentar...' : 'Tambah Anggota'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <img src={m.photo} className="w-14 h-14 rounded-full object-cover shrink-0"/>
            <div className="flex-1 overflow-hidden">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1 inline-block">{m.role}</span>
              <h4 className="font-bold text-slate-800 text-sm truncate">{m.name}</h4>
            </div>
            <button onClick={() => {const up = members.filter(x => x.id !== m.id); setMembers(up); saveOfficers(up);}} className="text-rose-400 hover:bg-rose-50 p-2 rounded-xl transition-colors"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};