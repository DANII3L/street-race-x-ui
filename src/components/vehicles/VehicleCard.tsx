import React from 'react';
import { type VehicleItem } from '../../types';

interface VehicleCardProps {
    vehicle: VehicleItem;
    onActivate: (id: string) => void;
    loadingId: string | null;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onActivate, loadingId }) => {
    const { id, marca, modelo, año, placa, activo } = vehicle.props;
    const isChanging = loadingId === id;

    return (
        <div className={`rounded-xl bg-race-card p-5 border transition flex flex-col justify-between space-y-4 ${activo ? 'border-race-accent bg-race-accent/5' : 'border-zinc-800/85 hover:border-zinc-700'}`}>
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-bold text-zinc-100 text-base">{marca} <span className="text-zinc-400 font-medium">{modelo}</span></h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Modelo: {año} • Placa: {placa.toUpperCase()}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${activo ? 'bg-race-accent text-white' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}`}>
                    {activo ? 'Activo' : 'Garaje'}
                </span>
            </div>

            {!activo && (
                <button
                    type="button"
                    disabled={loadingId !== null}
                    onClick={() => onActivate(id)}
                    className="w-full rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 text-xs font-bold uppercase tracking-wider transition disabled:opacity-50 cursor-pointer"
                >
                    {isChanging ? 'Activando...' : 'Asignar como Activo'}
                </button>
            )}
        </div>
    );
};