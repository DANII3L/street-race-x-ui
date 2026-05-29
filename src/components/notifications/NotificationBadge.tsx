import React, { useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications';

import { BellIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export const NotificationBadge = () => {
  const { notifications, unreadCount, loading, markNotificationAsRead, refresh } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const notificationConfig: Record<string, { border: string; bg: string; dot: string; label: string }> = {
    reto_recibido: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      bg: 'bg-amber-500/5',
      dot: 'bg-amber-500',
      label: 'Nuevo Reto'
    },
    reto_aceptado: {
      border: 'border-blue-500/30 hover:border-blue-500/60',
      bg: 'bg-blue-500/5',
      dot: 'bg-blue-500',
      label: 'Reto Aceptado'
    },
    reto_rechazado: {
      border: 'border-zinc-700 hover:border-zinc-500',
      bg: 'bg-zinc-900/40',
      dot: 'bg-zinc-500',
      label: 'Reto Rechazado'
    },
    resultado: {
      border: 'border-green-500/30 hover:border-green-500/60',
      bg: 'bg-green-500/5',
      dot: 'bg-green-500',
      label: 'Resultado Pista'
    },
    rango_subido: {
      border: 'border-purple-500/30 hover:border-purple-500/60',
      bg: 'bg-purple-500/5',
      dot: 'bg-purple-500 animate-bounce',
      label: 'Ascenso Rango'
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer flex items-center justify-center h-9 w-9"
      >
        <BellIcon className="w-5 h-5" />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-race-accent text-white font-black font-mono text-[9px] items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-race-card border border-zinc-800 p-4 shadow-2xl z-50 space-y-3 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">Notificaciones Pista</h4>
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="text-zinc-500 hover:text-race-accent transition cursor-pointer disabled:opacity-40 p-1 rounded hover:bg-zinc-900/50 flex items-center justify-center"
              title="Sincronizar Alertas"
            >
              <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin text-race-accent' : ''}`} />
            </button>
          </div>

          {loading && notifications.length === 0 ? (
            <div className="flex justify-center py-6">
              <div className="h-4 w-4 animate-spin rounded-full border border-zinc-700 border-t-race-accent" />
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-center py-6 text-xs text-zinc-600">Sin alertas en tu radar por ahora.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif) => {
                const { id, tipo, mensaje, leida, created_at } = notif.props;
                
                const fechaLegible = created_at?._seconds
                  ? new Date(created_at._seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : '--:--';

                const config = notificationConfig[tipo] || {
                  border: 'border-zinc-800',
                  bg: 'bg-zinc-900/20',
                  dot: 'bg-zinc-600',
                  label: 'Aviso'
                };

                return (
                  <div
                    key={id}
                    onClick={() => !leida && markNotificationAsRead(id)}
                    className={`p-3 rounded-lg border text-left transition flex flex-col space-y-1.5 ${
                      leida 
                        ? 'bg-zinc-900/10 border-zinc-900 opacity-50 cursor-default' 
                        : `${config.bg} ${config.border} cursor-pointer`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        {!leida && <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />}
                        <span className={`text-[10px] font-black uppercase tracking-wider ${leida ? 'text-zinc-500' : 'text-zinc-300'}`}>
                          {config.label}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-600">{fechaLegible}</span>
                    </div>

                    <p className={`text-xs leading-normal ${leida ? 'text-zinc-500' : 'text-zinc-200 font-medium'}`}>
                      {mensaje}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};