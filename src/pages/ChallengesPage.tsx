import React, { useEffect, useState } from 'react';
import { ChallengeService } from '../services/challenge.service';
import { ChallengeList } from '../components/challenges/ChallengeList';
import { Navbar } from '../components/Navbar';
import { useAuthStore } from '../context/authStore';
import { type ChallengeItem } from '../types';

export const ChallengesPage = () => {
    const { user } = useAuthStore();
    const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

    const loadChallengesHistory = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await ChallengeService.getHistory();
            if (response.ok && response.data) {
                setChallenges(response.data);
            }
        } catch (err: any) {
            setError(err.message || 'Error al cargar el historial de desafíos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadChallengesHistory();
    }, []);

    const handleRespondChallenge = async (id: string, action: 'accept' | 'reject') => {
        setActionLoadingId(id);
        setError('');
        setSuccess('');
        try {
            const response = await ChallengeService.respondToChallenge(id, action);
            if (response.ok) {
                setSuccess(`Reto actualizado: ${action === 'accept' ? 'Aceptado' : 'Rechazado'} con éxito.`);
                await loadChallengesHistory();
            }
        } catch (err: any) {
            setError(err.message || 'Error al procesar la respuesta del reto.');
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleCompleteChallenge = async (id: string, winnerId: string) => {
        setActionLoadingId(id);
        setError('');
        setSuccess('');
        try {
            const response = await ChallengeService.completeChallenge(id, winnerId);
            if (response.ok) {
                setSuccess('Carrera finalizada. El puntaje y rango han sido recalculados.');
                await loadChallengesHistory();
            }
        } catch (err: any) {
            setError(err.message || 'Error al registrar la conclusión de la carrera.');
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-race-dark text-white">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                <div>
                    <h2 className="text-xl font-extrabold tracking-tight">Historial de Desafíos</h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        Administra los retos entrantes, revisa tus duelos programados y sube los resultados oficiales de pista.
                    </p>
                </div>

                {error && <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">{error}</div>}
                {success && <div className="rounded-lg bg-green-500/10 p-4 text-sm text-green-500 border border-green-500/20">{success}</div>}

                {loading ? (
                    <div className="flex h-32 items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-race-accent" />
                    </div>
                ) : (
                    <ChallengeList
                        challenges={challenges}
                        currentUserId={user?.id || ''}
                        onRespond={handleRespondChallenge}
                        onComplete={handleCompleteChallenge}
                        actionLoadingId={actionLoadingId}
                    />
                )}
            </main>
        </div>
    );
};