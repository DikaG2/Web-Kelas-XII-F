import React, { useState } from 'react';
import { getAlbums, saveAlbums } from '../../services/storageService';
import { AlbumItem } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const DashboardAlbum: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>(getAlbums());
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AlbumItem['category']>('Kegiatan Kelas');
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;
    const newItem: AlbumItem = {
      id: Date.now().toString(), title, category, description: '', imageUrl, date: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...albums];
    setAlbums(updated); saveAlbums(updated);
    setTitle(''); setImageUrl('');
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Manajemen Album Foto</h1>
      <p className="text-slate-500 text-sm mb-8">Tambah foto galeri kelas ke halaman publik.</p>

      <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 max-w-2xl mb-12">
        <h3 className="font-bold text-lg text-slate-800">Tambah Foto Baru</h3>
        <input type="text" placeholder="Judul Foto" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" required/>
        <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary">
          <option value="Foto Bersama">Foto Bersama</option>
          <option value="Kegiatan Kelas">Kegiatan Kelas</option>
          <option value="Study Tour">Study Tour</option>
          <option value="Acara Sekolah">Acara Sekolah</option>
        </select>
        <input type="text" placeholder="URL Link Gambar" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" required/>
        <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2"><Plus size={18}/> Tambah Foto</button>
      </form>

      <div className="space-y-4 max-w-2xl">
        {albums.map(a => (
          <div key={a.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={a.imageUrl} alt={a.title} className="w-16 h-16 rounded-xl object-cover"/>
              <div>
                <span className="text-xs font-bold text-primary">{a.category}</span>
                <h4 className="font-bold text-slate-800">{a.title}</h4>
              </div>
            </div>
            <button onClick={() => {const up = albums.filter(x => x.id !== a.id); setAlbums(up); saveAlbums(up);}} className="bg-rose-50 text-rose-600 p-3 rounded-xl hover:bg-rose-100 transition-colors"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};