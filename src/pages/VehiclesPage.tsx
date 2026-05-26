import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VehicleService } from '../services/vehicle.service';
import { VehicleForm } from '../components/vehicles/VehicleForm';
import { VehicleList } from '../components/vehicles/VehicleList';
import { Navbar } from '../components/Navbar';
import { type VehicleItem } from '../types';

export const VehiclesPage = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState<VehicleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

    const loadVehicles = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await VehicleService.getMyVehicles();
            if (res.ok && res.data) {
                setVehicles(res.data);
            }
        } catch (err: any) {
            setError(err.message || 'Error al sincronizar tu garaje.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles();
    }, []);

    const handleActivateVehicle = async (id: string) => {
        setActionLoadingId(id);
        setError('');
        setSuccess('');
        try {
            const res = await VehicleService.activateVehicle(id);
            if (res.ok) {
                setSuccess(res.message || 'Vehículo configurado como activo para matchmaking.');
                await loadVehicles();
            }
        } catch (err: any) {
            setError(err.message || 'No se pudo cambiar el vehículo principal.');
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleVehicleCreatedSuccess = async () => {
        setSuccess('¡Vehículo guardado e incorporado a tu cuenta con éxito!');
        setShowForm(false);
        await loadVehicles();
    };

    return (
        <div className="min-h-screen bg-race-dark text-white">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-extrabold tracking-tight">Mis Vehículos</h2>
                        <p className="text-xs text-zinc-400 mt-1">
                            Límite de la comunidad: Máximo 3 vehículos por piloto. Solo el marcado como <span className="text-race-accent font-bold">Activo</span> operará en emparejamientos.
                        </p>
                    </div>

                    {vehicles.length < 3 && !showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="rounded bg-race-accent hover:bg-red-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                        >
                            Registrar Vehículo
                        </button>
                    )}
                </div>

                {error && <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">{error}</div>}
                {success && <div className="rounded-lg bg-green-500/10 p-4 text-sm text-green-500 border border-green-500/20">{success}</div>}

                {showForm && (
                    <VehicleForm
                        currentCount={vehicles.length}
                        onVehicleCreated={handleVehicleCreatedSuccess}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                {loading ? (
                    <div className="flex h-32 items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-race-accent" />
                    </div>
                ) : (
                    <VehicleList
                        vehicles={vehicles}
                        onActivateVehicle={handleActivateVehicle}
                        actionLoadingId={actionLoadingId}
                    />
                )}
            </main>
        </div>
    );
};