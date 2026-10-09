import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'siswo') {
      sessionStorage.setItem('isAdminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Username atau password salah!  HINT! = usr : default, pw : kepala sekolah 2026');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl relative">
        <Link to="/" className="absolute top-6 left-6 text-slate-400 hover:text-slate-700 flex items-center gap-1 text-xs font-semibold">
          <ArrowLeft size={16}/> Kembali ke Beranda
        </Link>

        <div className="text-center mt-6 mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32}/>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Admin CMS Login</h1>
          <p className="text-slate-500 text-xs mt-1">Masuk untuk mengelola konten website kelas XII-F</p>
        </div>

        {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-semibold mb-6 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-400" size={18}/>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="" // <-- Dikosongkan di sini
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18}/>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="" // <-- Dan dikosongkan di sini juga
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-primary/30 mt-2">
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};