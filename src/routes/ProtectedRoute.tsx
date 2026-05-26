import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};