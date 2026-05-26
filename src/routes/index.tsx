import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VehiclesPage } from '../pages/VehiclesPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ProfilePage } from '../pages/ProfilePage';
import { ChallengesPage } from '../pages/ChallengesPage';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/vehicles" element={<VehiclesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/challenges" element={<ChallengesPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
};