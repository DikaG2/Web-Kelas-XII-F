import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Image, FileText, MessageSquare, LogOut, Home } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cek apakah admin sudah login
    const isAuth = localStorage.getItem('xii_f_auth');
    if (!isAuth) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('xii_f_auth');
    navigate('/admin/login');
  };

    const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Profil Kelas', path: '/admin/profile', icon: Users },
    { label: 'Anggota Kelas', path: '/admin/members', icon: Users }, // <--- TAMBAHKAN BARIS INI
    { label: 'Album Foto', path: '/admin/album', icon: Image },
    { label: 'Daftar Tugas', path: '/admin/tasks', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Hitam Elegan */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-10 px-2">
            <span className="bg-primary text-white font-extrabold px-3 py-1 rounded-full text-sm shadow-md shadow-primary/20">XII-F</span>
            <span className="text-white font-bold text-lg tracking-tight">CMS Admin</span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon size={18}/> {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-2 mt-10">
          <Link to="/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Home size={16}/> Lihat Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors">
            <LogOut size={16}/> Keluar
          </button>
        </div>
      </aside>

      {/* Konten Utama di Sebelah Kanan */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};