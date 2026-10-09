import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { getAlbums } from '../services/storageService';
import { AlbumItem } from '../types';
import { Image as ImageIcon } from 'lucide-react';

export const Album: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  
  // Memuat data album saat halaman dibuka
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
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Galeri Kenangan
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-3">Album Dokumentasi Kelas</h1>
          <p className="text-slate-500 text-sm">Kumpulan momen berharga dan kegiatan seru siswa XII-F.</p>
        </div>

        {/* Filter Kategori */}
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

        {/* Grid Foto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <ImageIcon size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Belum ada foto di kategori "{selectedCategory}".</p>
              <p className="text-slate-400 text-sm mt-1">Silakan tambahkan foto melalui Dashboard Admin.</p>
            </div>
          ) : (
            filteredAlbums.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer">
                <div className="h-64 overflow-hidden bg-slate-100 relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      // Jika link foto rusak/mati, tampilkan gambar abu-abu
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-2">
                    {item.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};