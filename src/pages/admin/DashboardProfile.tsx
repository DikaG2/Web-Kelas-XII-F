import React, { useState } from 'react';
import { getProfile, saveProfile } from '../../services/storageService';
import { Save, Upload } from 'lucide-react';

export const DashboardProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(getProfile());
  const [success, setSuccess] = useState(false);

  // Fungsi sakti untuk meng-upload foto apa saja langsung dari laptop
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Edit Profil & Wali Kelas</h1>
      <p className="text-slate-500 text-sm mb-8">Ubah informasi dasar kelas, foto wali kelas, dan foto banner utama.</p>

      {success && <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-sm font-semibold mb-6">Profil & Foto berhasil disimpan!</div>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 max-w-4xl mb-20">
        
        {/* WALI KELAS AREA */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex gap-6 items-center flex-wrap">
          <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden shrink-0 border-4 border-white shadow-sm">
            {profile.homeroomTeacherPhoto ? <img src={profile.homeroomTeacherPhoto} alt="Wali" className="w-full h-full object-cover"/> : <div className="w-full h-full bg-slate-300"></div>}
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-600 mb-1">Nama Wali Kelas</label>
            <input type="text" value={profile.homeroomTeacher} onChange={e => setProfile({...profile, homeroomTeacher: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary mb-3" required/>
            <label className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl cursor-pointer w-max hover:bg-primary/20 transition-colors">
              <Upload size={14}/> Upload Foto Wali Kelas
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'homeroomTeacherPhoto')} />
            </label>
          </div>
        </div>

        {/* DATA KELAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div><label className="block text-xs font-bold text-slate-600 mb-1">Nama Kelas</label><input type="text" value={profile.className} onChange={e => setProfile({...profile, className: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" required/></div>
          <div><label className="block text-xs font-bold text-slate-600 mb-1">Tahun Ajaran</label><input type="text" value={profile.academicYear} onChange={e => setProfile({...profile, academicYear: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" required/></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div><label className="block text-xs font-bold text-slate-600 mb-1">Total Siswa</label><input type="number" value={profile.totalStudents} onChange={e => setProfile({...profile, totalStudents: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" required/></div>
          <div><label className="block text-xs font-bold text-slate-600 mb-1">Laki-laki</label><input type="number" value={profile.maleCount} onChange={e => setProfile({...profile, maleCount: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" required/></div>
          <div><label className="block text-xs font-bold text-slate-600 mb-1">Perempuan</label><input type="number" value={profile.femaleCount} onChange={e => setProfile({...profile, femaleCount: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" required/></div>
        </div>

        <div><label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Kelas</label><textarea rows={3} value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none"></textarea></div>
        
        {/* UPLOAD FOTO KELAS DAN HERO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          {/* Foto Kelas (Profil) */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2">Foto Utama Kelas (Halaman Profil)</label>
            <div className="flex flex-col gap-3">
              <div className="h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                {profile.classPhoto && <img src={profile.classPhoto} alt="Kelas" className="w-full h-full object-cover"/>}
              </div>
              <label className="flex items-center justify-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-primary/20 transition-colors">
                <Upload size={14}/> Upload Foto Kelas
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'classPhoto')} />
              </label>
            </div>
          </div>

          {/* Foto Banner Hero (Beranda) */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2">Foto Background "One Class, One Story"</label>
            <div className="flex flex-col gap-3">
              <div className="h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                {profile.heroImage && <img src={profile.heroImage} alt="Hero" className="w-full h-full object-cover"/>}
              </div>
              <label className="flex items-center justify-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-primary/20 transition-colors">
                <Upload size={14}/> Upload Foto Background
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'heroImage')} />
              </label>
            </div>
          </div>

        </div>

        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold px-6 py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-4">
          <Save size={18}/> Simpan Semua Perubahan
        </button>
      </form>
    </div>
  );
};