import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuth') === 'true';
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};