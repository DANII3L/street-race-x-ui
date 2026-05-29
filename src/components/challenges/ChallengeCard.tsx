import React from 'react';
import { type ChallengeItem } from '../../types';

interface ChallengeCardProps {
  challenge: ChallengeItem;
  currentUserId: string;
  onRespond: (challengeId : string, aceptar: 'aceptado' | 'rechazado') => void;
  onComplete: (id: string, winnerId: string) => void;
  actionLoadingId: string | null;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  challenge, 
  currentUserId, 
  onRespond, 
  onComplete,
  actionLoadingId 
}) => {
  const { id, retador_id, retado_id, tipo_carrera, ubicacion_acordada, fecha_acordada, estado, ganador_id } = challenge.props;
  const isLoader = actionLoadingId === id;
  const fechaMilisegundos = fecha_acordada._seconds * 1000;
  const fechaLegible = new Date(fechaMilisegundos).toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const amIRetador = currentUserId === retador_id;

  const statusStyles: Record<string, string> = {
    pendiente: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    aceptado: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    rechazado: 'bg-zinc-800 text-zinc-500 border-zinc-700',
    completado: 'bg-green-500/10 text-green-500 border-green-500/20'
  };

  return (
    <div className={`rounded-xl bg-race-card p-5 border border-zinc-800/80 space-y-4 transition ${estado === 'aceptado' ? 'border-blue-500/30' : ''}`}>
      <div className="flex items-start justify-between border-b border-zinc-900 pb-3">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Modalidad</span>
          <h4 className="font-black text-white uppercase text-sm tracking-wide">{tipo_carrera.replace('_', ' ')}</h4>
        </div>
        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${statusStyles[estado] || 'bg-zinc-800 text-zinc-400'}`}>
          {estado}
        </span>
      </div>

      <div className="space-y-1 text-xs text-zinc-400">
        <p><span className="text-zinc-600 font-medium">Ubicación:</span> <span className="text-zinc-200 font-semibold">{ubicacion_acordada}</span></p>
        <p><span className="text-zinc-600 font-medium">Fecha programada:</span> <span className="text-zinc-300 font-mono">{fechaLegible}</span></p>
        <p><span className="text-zinc-600 font-medium">Rol en el Reto:</span> <span className={amIRetador ? 'text-race-accent font-bold' : 'text-amber-500 font-bold'}>{amIRetador ? 'Atacante (Retador)' : 'Defensor (Retado)'}</span></p>
      </div>

      {estado === 'pendiente' && !amIRetador && (
        <div className="flex space-x-2 pt-2">
          <button
            type="button"
            disabled={actionLoadingId !== null}
            onClick={() => onRespond(id, 'rechazado')}
            className="w-1/2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Rechazar
          </button>
          <button
            type="button"
            disabled={actionLoadingId !== null}
            onClick={() => onRespond(id, 'aceptado')}
            className="w-1/2 rounded bg-race-accent hover:bg-red-700 text-white py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            {isLoader ? '...' : 'Aceptar Reto'}
          </button>
        </div>
      )}

      {estado === 'aceptado' && (
        <div className="pt-2 space-y-2">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Declarar Ganador de la Carrera</p>
          <div className="flex space-x-2">
            <button
              type="button"
              disabled={actionLoadingId !== null}
              onClick={() => onComplete(id, retador_id)}
              className="w-1/2 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 py-1.5 text-xs font-bold uppercase hover:bg-zinc-800 transition cursor-pointer"
            >
              Ganó Retador
            </button>
            <button
              type="button"
              disabled={actionLoadingId !== null}
              onClick={() => onComplete(id, retado_id)}
              className="w-1/2 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 py-1.5 text-xs font-bold uppercase hover:bg-zinc-800 transition cursor-pointer"
            >
              Ganó Retado
            </button>
          </div>
        </div>
      )}

      {estado === 'completado' && (
        <div className="bg-zinc-900/60 rounded p-2 text-center text-xs border border-zinc-850">
          <span className="text-zinc-500 font-medium">Ganador oficial:</span>{' '}
          <span className="text-green-400 font-black tracking-wide font-mono">
            {ganador_id === currentUserId ? '¡TÚ VICTORIA!' : 'OPONENTE'}
          </span>
        </div>
      )}
    </div>
  );
};