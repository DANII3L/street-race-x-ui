import React from 'react';
import { type DiscoverPilot } from '../types';

interface PilotCardProps {
    pilot: DiscoverPilot;
    onChallengeOpen: (pilotData: DiscoverPilot) => void;
}

export const PilotCard: React.FC<PilotCardProps> = ({ pilot, onChallengeOpen }) => {
    const username = pilot.props.username;
    const zona_ciudad = pilot.props.zona_ciudad;
    const zona_localidad = pilot.props.zona_localidad;
    const rango = pilot.props.rango;
    const victorias = pilot.props.victorias;
    const derrotas = pilot.props.derrotas;

    return (
        <div className="rounded-xl bg-race-card border border-zinc-800/80 p-5 flex flex-col justify-between hover:border-zinc-700 transition space-y-4">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-zinc-100 text-lg">{username}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{zona_ciudad} • {zona_localidad}</p>
                </div>
                <span className="bg-race-accent/10 text-race-accent border border-race-accent/20 px-2.5 py-0.5 rounded text-xs font-black">
                    RANGO {rango}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800 text-center">
                <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500">Victorias</p>
                    <p className="text-base font-black text-green-500">{victorias}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500">Derrotas</p>
                    <p className="text-base font-black text-red-500">{derrotas}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onChallengeOpen(pilot)}
                className="w-full rounded bg-zinc-800 hover:bg-race-accent text-zinc-200 hover:text-white py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
                Retar Piloto
            </button>
        </div>
    );
};