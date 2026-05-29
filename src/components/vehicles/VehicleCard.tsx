import React from 'react';
import { type VehicleItem } from '../../types';
import { WrenchIcon, CalendarDaysIcon, IdentificationIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

interface VehicleCardProps {
    vehicle: VehicleItem;
    onActivate: (id: string) => void;
    loadingId: string | null;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onActivate, loadingId }) => {
    const { 
        id, 
        marca, 
        modelo, 
        año, 
        placa, 
        activo, 
        tipo_vehiculo, 
        color, 
        modificaciones 
    } = vehicle.props;
    
    const isChanging = loadingId === id;

    const renderTipoVehiculoBadge = (tipo: string) => {
        const estiloBase = "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ";
        
        if (tipo === '9db4ca5b-68c7-4b78-aed3-1c795c02dac0' || tipo === 'moto') {
            return <span className={`${estiloBase} bg-amber-500/10 text-amber-400 border-amber-500/20`}>Moto</span>;
        }
        if (tipo === 'auto') {
            return <span className={`${estiloBase} bg-blue-500/10 text-blue-400 border-blue-500/20`}>Carro</span>;
        }
        if (tipo === 'monopatin_electrico') {
            return <span className={`${estiloBase} bg-purple-500/10 text-purple-400 border-purple-500/20`}>Monopatín</span>;
        }
        return <span className={`${estiloBase} bg-zinc-800 text-zinc-400 border-zinc-700`}>Pista</span>;
    };

    return (
        <div className={`rounded-xl bg-race-card border overflow-hidden transition flex flex-col justify-between ${activo ? 'border-race-accent ring-1 ring-race-accent/30' : 'border-zinc-800 hover:border-zinc-700'}`}>
            
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-4 border-b border-zinc-850 flex items-center justify-between">
                <div className="flex space-x-1.5">
                    {renderTipoVehiculoBadge(tipo_vehiculo)}
                </div>
                <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${activo ? 'bg-race-accent text-white' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}`}>
                        {activo ? 'Activo' : 'En Garaje'}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                    <div>
                        <h4 className="font-black text-white text-base tracking-wide uppercase">{marca} <span className="text-zinc-400 font-medium normal-case">{modelo}</span></h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                        <div className="flex items-center space-x-1.5 bg-zinc-900/40 p-2 rounded border border-zinc-850">
                            <CalendarDaysIcon className="w-4 h-4 text-zinc-600 shrink-0" />
                            <span>Año: <strong className="text-zinc-200 font-mono">{año}</strong></span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-zinc-900/40 p-2 rounded border border-zinc-850">
                            <IdentificationIcon className="w-4 h-4 text-zinc-600 shrink-0" />
                            <span className="truncate">Placa: <strong className="text-zinc-200 font-mono">{placa ? placa.toUpperCase() : 'N/A'}</strong></span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-zinc-900/40 p-2 rounded border border-zinc-850 col-span-2">
                            <PaintBrushIcon className="w-4 h-4 text-zinc-600 shrink-0" />
                            <span className="truncate">Color: <strong className="text-zinc-200">{color || 'No especificado'}</strong></span>
                        </div>
                    </div>
                    {modificaciones && (
                        <div className="mt-2 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-850 flex items-start space-x-2">
                            <WrenchIcon className="w-3.5 h-3.5 text-race-accent mt-0.5 shrink-0" />
                            <div className="text-[11px] leading-relaxed text-zinc-400">
                                <span className="text-[10px] font-black text-zinc-500 uppercase block tracking-wider mb-0.5">Specs / Modificaciones</span>
                                {modificaciones}
                            </div>
                        </div>
                    )}
                </div>
                {!activo && (
                    <button
                        type="button"
                        disabled={loadingId !== null}
                        onClick={() => onActivate(id)}
                        className="w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 text-xs font-bold uppercase tracking-wider transition disabled:opacity-40 cursor-pointer flex items-center justify-center space-x-1"
                    >
                        {isChanging ? (
                            <>
                                <div className="h-3 w-3 animate-spin rounded-full border border-zinc-500 border-t-white" />
                                <span>Configurando...</span>
                            </>
                        ) : (
                            <span>Asignar como Activo</span>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};