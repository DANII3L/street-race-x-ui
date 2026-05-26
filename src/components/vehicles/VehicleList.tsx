import React from 'react';
import { VehicleCard } from './VehicleCard';
import { type VehicleItem } from '../../types';

interface VehicleListProps {
  vehicles: VehicleItem[];
  onActivateVehicle: (id: string) => void;
  actionLoadingId: string | null;
}

export const VehicleList: React.FC<VehicleListProps> = ({ 
  vehicles, 
  onActivateVehicle, 
  actionLoadingId 
}) => {
  
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-race-card/40">
        <p className="text-sm text-zinc-500">
          No tienes ningún vehículo registrado en tu garaje todavía.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.props.id}
          vehicle={vehicle}
          onActivate={onActivateVehicle}
          loadingId={actionLoadingId}
        />
      ))}
    </div>
  );
};