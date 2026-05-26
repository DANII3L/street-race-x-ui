import React, { useState } from 'react';
import { VehicleService } from '../../services/vehicle.service';

interface VehicleFormProps {
    onVehicleCreated: () => void;
    onCancel: () => void;
    currentCount: number;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ onVehicleCreated, onCancel, currentCount }) => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState<number>(new Date().getFullYear());
    const [placa, setPlaca] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('9db4ca5b-68c7-4b78-aed3-1c795c02dac0');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                marca,
                modelo,
                año: Number(año),
                placa,
                tipo_vehiculo: tipoVehiculo,
                activo: currentCount === 0
            };

            const response = await VehicleService.createVehicle(payload);
            if (response.ok) {
                setMarca('');
                setModelo('');
                setPlaca('');
                onVehicleCreated();
            } else {
                setError('No se pudo registrar el vehículo.');
            }
        } catch (err: any) {
            setError(err.message || 'Error al procesar el registro del vehículo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-xl bg-race-card border border-zinc-800 p-6 space-y-4 max-w-xl animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-race-accent">Registrar Nuevo Vehículo</h3>

            {error && (
                <div className="rounded bg-red-500/10 p-2.5 text-xs text-red-500 border border-red-500/20">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Marca</label>
                    <input
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                        placeholder="Ej. KTM, Mazda"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Modelo / Línea</label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                        placeholder="Ej. Duke 200, 3 NGP"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Año</label>
                    <input
                        type="number"
                        value={año}
                        onChange={(e) => setAño(Number(e.target.value))}
                        className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Placa</label>
                    <input
                        type="text"
                        placeholder="Ej. KMX23F"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tipo de Vehículo</label>
                <select
                    value={tipoVehiculo}
                    onChange={(e) => setTipoVehiculo(e.target.value)}
                    className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-white focus:border-race-accent focus:outline-none"
                >
                    <option value="9db4ca5b-68c7-4b78-aed3-1c795c02dac0">Motocicleta (Moto)</option>
                    <option value="automovil_categoria_id">Automóvil (Carro)</option>
                </select>
            </div>

            <div className="flex space-x-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-1/2 rounded bg-zinc-800 p-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 rounded bg-race-accent p-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Guardando...' : 'Guardar en Garaje'}
                </button>
            </div>
        </form>
    );
};