import React from 'react';
import { type PilotProps } from '../../types';

interface ProfileCardProps {
    profile: PilotProps;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const {
        username,
        email,
        rango,
        puntos,
        victorias,
        derrotas,
        retos_consecutivos,
        zona_ciudad,
        zona_localidad,
        zona_estado,
        zona_pais,
        estado
    } = profile;

    return (
        <div className="w-full max-w-2xl bg-race-card border border-zinc-800 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-zinc-800 gap-4">
                <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-zinc-900 border-2 border-race-accent flex items-center justify-center text-xl font-black text-zinc-400">
                        {username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-wide">{username}</h3>
                        <p className="text-xs text-zinc-400 font-medium">{email}</p>
                    </div>
                </div>
                <div className="text-left sm:text-right">
                    <span className="inline-block bg-race-accent text-white px-3 py-1 rounded text-xs font-black tracking-widest uppercase">
                        RANGO {rango}
                    </span>
                    <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">Estado: {estado}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Puntos</p>
                    <p className="text-xl font-black text-white mt-1">{puntos}</p>
                </div>
                <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Victorias</p>
                    <p className="text-xl font-black text-green-500 mt-1">{victorias}</p>
                </div>
                <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Derrotas</p>
                    <p className="text-xl font-black text-red-500 mt-1">{derrotas}</p>
                </div>
                <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Racha Activa</p>
                    <p className="text-xl font-black text-amber-500 mt-1">{retos_consecutivos} 🔥</p>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-1">Ubicación de Operación</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between p-2.5 rounded bg-zinc-900/20 border border-zinc-850">
                        <span className="text-zinc-500 font-medium">Localidad / Barrio:</span>
                        <span className="text-zinc-200 font-semibold">{zona_localidad}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded bg-zinc-900/20 border border-zinc-850">
                        <span className="text-zinc-500 font-medium">Ciudad:</span>
                        <span className="text-zinc-200 font-semibold">{zona_ciudad}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded bg-zinc-900/20 border border-zinc-850">
                        <span className="text-zinc-500 font-medium">Estado / Dpto:</span>
                        <span className="text-zinc-200 font-semibold">{zona_estado}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded bg-zinc-900/20 border border-zinc-850">
                        <span className="text-zinc-500 font-medium">País:</span>
                        <span className="text-zinc-200 font-semibold">{zona_pais}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};