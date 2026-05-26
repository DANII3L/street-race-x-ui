import React, { useEffect, useState } from 'react';
import { PilotService } from '../services/pilot.service';
import { ChallengeService } from '../services/challenge.service';
import { Navbar } from '../components/Navbar'; // Importamos el Navbar Global
import { SearchFilters, type FilterField } from '../components/SearchFilters';
import { PilotCard } from '../components/PilotCard';
import { type DiscoverPilot } from '../types';
import { useAuthStore } from '../context/authStore';

export const DashboardPage = () => {
    const { user } = useAuthStore();
    const [pilots, setPilots] = useState<DiscoverPilot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useState<Record<string, string>>({});

    const [selectedPilot, setSelectedPilot] = useState<DiscoverPilot | null>(null);
    const [tipoCarrera, setTipoCarrera] = useState('cuarto_milla');
    const [ubicacion, setUbicacion] = useState('');
    const [fecha, setFecha] = useState('');
    const [modalLoading, setModalLoading] = useState(false);
    const [modalSuccess, setModalSuccess] = useState('');

    const filterConfig: FilterField[] = [
        { key: 'zona', placeholder: 'Filtrar por ciudad o zona...' }
    ];

    const loadDiscoverPilots = async (filters?: Record<string, string>) => {
        try {
            setLoading(true);
            setError('');
            const params = filters?.zona ? { zona: filters.zona } : undefined;
            const response = await PilotService.getDiscoverPilots(params);

            if (response.ok && response.data) {
                setPilots(response.data);
            } else {
                setError('No se pudo cargar la lista de rivales.');
            }
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDiscoverPilots(searchParams);
    }, [searchParams]);

    const handleSearchSubmit = (filters: Record<string, string>) => {
        setSearchParams(filters);
    };

    const handleOpenChallengeModal = (pilot: DiscoverPilot) => {
        setSelectedPilot(pilot);
        setTipoCarrera('cuarto_milla');
        setUbicacion('');
        setFecha('');
        setModalSuccess('');
        setError('');
    };

    const handleSendChallenge = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPilot) return;

        setModalLoading(true);
        setModalSuccess('');

        try {
            const payload = {
                retado_id: selectedPilot.props.id,
                tipo_carrera: tipoCarrera,
                ubicacion_acordada: ubicacion,
                fecha_acordada: fecha,
            };

            const response = await ChallengeService.createChallenge(payload);

            if (response.ok) {
                setModalSuccess('¡Reto enviado con éxito al piloto!');
                setTimeout(() => {
                    setSelectedPilot(null);
                }, 1500);
            } else {
                setError('No se pudo enviar el reto.');
            }
        } catch (err: any) {
            setError(err.message || 'Error al procesar el desafío.');
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-race-dark text-white">
            {/* Navbar Global Reutilizable */}
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-extrabold tracking-tight">Matchmaking / Descubrimiento</h2>
                        <p className="text-xs text-zinc-400 mt-1">
                            Rivales disponibles con tu mismo rango <span className="text-race-accent font-bold">{user?.rango || 'D'}</span> y tipo de vehículo activo.
                        </p>
                    </div>

                    <SearchFilters fields={filterConfig} onSearch={handleSearchSubmit} />
                </div>

                {loading && (
                    <div className="flex h-48 items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-race-accent" />
                    </div>
                )}

                {error && !selectedPilot && (
                    <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20 mb-6">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    pilots.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-race-card/40">
                            <p className="text-sm text-zinc-500">No hay pilotos listos que cumplan los criterios de equidad en tu área ahora mismo.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {pilots.map((pilot) => (
                                <PilotCard
                                    key={pilot.props.id}
                                    pilot={pilot}
                                    onChallengeOpen={handleOpenChallengeModal}
                                />
                            ))}
                        </div>
                    )
                )}
            </main>

            {/* Modal para Crear Desafío */}
            {selectedPilot && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl bg-race-card p-6 border border-zinc-800 space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h3 className="text-lg font-bold">Configurar Reto vs {selectedPilot.props.username}</h3>
                            <button onClick={() => setSelectedPilot(null)} className="text-zinc-400 hover:text-white font-bold text-sm cursor-pointer">✕</button>
                        </div>

                        {error && <div className="rounded bg-red-500/10 p-2.5 text-xs text-red-500 border border-red-500/20">{error}</div>}
                        {modalSuccess && <div className="rounded bg-green-500/10 p-2.5 text-xs text-green-500 border border-green-500/20">{modalSuccess}</div>}

                        <form onSubmit={handleSendChallenge} className="space-y-4 text-sm">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Modalidad de Carrera</label>
                                <select
                                    value={tipoCarrera}
                                    onChange={(e) => setTipoCarrera(e.target.value)}
                                    className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                                >
                                    <option value="cuarto_milla">Cuarto de Milla (1/4 Mile)</option>
                                    <option value="vueltas">Circuito / Vueltas</option>
                                    <option value="derrape">Derrape / Drift</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ubicación Acordada</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Las Palmas Km 4 / Variante Caldas"
                                    value={ubicacion}
                                    onChange={(e) => setUbicacion(e.target.value)}
                                    className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Fecha y Hora</label>
                                <input
                                    type="datetime-local"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedPilot(null)}
                                    className="w-1/2 rounded bg-zinc-800 p-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalLoading}
                                    className="w-1/2 rounded bg-race-accent p-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {modalLoading ? 'Enviando...' : 'Confirmar Reto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};