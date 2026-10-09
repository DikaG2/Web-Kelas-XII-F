import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Album } from './pages/Album';
import { Tasks } from './pages/Tasks';
import { AdminLogin } from './pages/admin/Login';
import { DashboardLayout } from './pages/admin/DashboardLayout';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { DashboardProfile } from './pages/admin/DashboardProfile';
import { DashboardAlbum } from './pages/admin/DashboardAlbum';
import { DashboardTasks } from './pages/admin/DashboardTasks';
import { DashboardMembers } from './pages/admin/DashboardMembers';

// --- SISTEM PROTEKSI RUTE ---
// Mengecek apakah admin sudah login (ada data di sessionStorage)
const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuth') === 'true';
  // Jika sudah login, izinkan masuk (Outlet). Jika belum, lempar kembali ke halaman login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik (Bisa diakses siapa saja) */}
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/album" element={<Album />} />
        <Route path="/tugas" element={<Tasks />} />
        
        {/* Rute Login Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Rute Admin (DIBUNGKUS PROTECTED ROUTE) */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="album" element={<DashboardAlbum />} />
            <Route path="tasks" element={<DashboardTasks />} />
            <Route path="members" element={<DashboardMembers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;