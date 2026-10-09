import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { getAlbums } from '../services/storageService';
import { AlbumItem } from '../types';
import { Image as ImageIcon, X } from 'lucide-react';

export const Album: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [expandedImage, setExpandedImage] = useState<string | null>(null); // State untuk gambar membesar
  
  useEffect(() => {
    const data = getAlbums();
    if (data) setAlbums(data);
  }, []);

  const categories = ['Semua', 'Foto Bersama', 'Kegiatan Kelas', 'Study Tour', 'Acara Sekolah'];
  const filteredAlbums = selectedCategory === 'Semua' 
    ? albums 
    : albums.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full flex-1 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Galeri Kenangan</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-3">Album Dokumentasi Kelas</h1>
          <p className="text-slate-500 text-sm">Kumpulan momen berharga dan kegiatan seru siswa XII-F.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)} 
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <ImageIcon size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Belum ada foto di kategori "{selectedCategory}".</p>
            </div>
          ) : (
            filteredAlbums.map((item) => (
              <div key={item.id} onClick={() => setExpandedImage(item.imageUrl)} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer">
                <div className="h-64 overflow-hidden bg-slate-100 relative">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{item.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-2">{item.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* POP-UP FOTO MEMBESAR (EXPAND) */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" onClick={() => setExpandedImage(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-rose-500 transition-colors">
            <X size={28} />
          </button>
          <img src={expandedImage} className="max-w-full max-h-[90vh] object-contain rounded-xl" />
        </div>
      )}
    </div>
  );
};