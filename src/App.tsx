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

// --- SISTEM PROTEKSI RUTE & PEMBAGIAN AKSES ---
const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuth') === 'true';
  const role = sessionStorage.getItem('adminRole') || 'uploader';
  
  // Jika belum login sama sekali, tendang ke halaman login
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  
  // Jika rute ini dibatasi dan role tidak cocok, tendang ke halaman album
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/admin/album" replace />;
  }
  
  return <Outlet />;
};

export function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/album" element={<Album />} />
        <Route path="/tugas" element={<Tasks />} />
        
        {/* Rute Login Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Rute Admin (Dibungkus Proteksi) */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            
            {/* Rute Khusus Full Akses (Admin Utama) */}
            <Route element={<ProtectedRoute allowedRoles={['full']} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="profile" element={<DashboardProfile />} />
              <Route path="members" element={<DashboardMembers />} />
            </Route>

            {/* Rute Bebas (Bisa diakses Full Admin maupun Uploader) */}
            <Route path="album" element={<DashboardAlbum />} />
            <Route path="tasks" element={<DashboardTasks />} />
            
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;