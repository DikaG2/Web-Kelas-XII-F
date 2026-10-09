import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { DashboardMembers } from './pages/admin/DashboardMembers'

export function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/album" element={<Album />} />
        <Route path="/tugas" element={<Tasks />} />
        
        {/* Rute Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="album" element={<DashboardAlbum />} />
          <Route path="tasks" element={<DashboardTasks />} />
          <Route path="members" element={<DashboardMembers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;