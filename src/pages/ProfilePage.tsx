import React, { useEffect, useState } from 'react';
import { PilotService } from '../services/pilot.service';
import { Navbar } from '../components/Navbar';
import { ProfileCard } from '../components/profile/ProfileCard';
import { type PilotProps } from '../types';

export const ProfilePage = () => {
    const [profile, setProfile] = useState<PilotProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await PilotService.getMyProfile();

                if (response.ok && response.data?.props) {
                    setProfile(response.data.props);
                } else {
                    setError('No se pudo mapear la información de tu piloto.');
                }
            } catch (err: any) {
                setError(err.message || 'Error de conexión con el servidor.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="min-h-screen bg-race-dark text-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6 flex flex-col items-center">
                <div className="w-full max-w-2xl text-left">
                    <h2 className="text-xl font-extrabold tracking-tight">Hoja de Vida del Piloto</h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        Registro oficial de credenciales, reputación y geolocalización dentro de Street Race X.
                    </p>
                </div>

                {error && (
                    <div className="w-full max-w-2xl rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex h-48 items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-race-accent" />
                    </div>
                ) : (
                    profile && <ProfileCard profile={profile} />
                )}
            </main>
        </div>
    );
};