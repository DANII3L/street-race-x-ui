import apiClient from '../api/client';
import { type VehicleListResponse, type VehicleActionResponse } from '../types';

export interface CreateVehiclePayload {
  marca: string;
  modelo: string;
  año: number;
  placa: string;
  tipo_vehiculo: string;
  activo: boolean;
}

class VehicleServiceImpl {
  private handleError(error: any): never {
    const message = error.response?.data?.message || 'Error inesperado en el servicio de vehículos';
    throw new Error(message);
  }

  public async getMyVehicles(): Promise<VehicleListResponse> {
    try {
      const response = await apiClient.get<VehicleListResponse>('/vehicles');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createVehicle(payload: CreateVehiclePayload): Promise<VehicleActionResponse> {
    try {
      const response = await apiClient.post<VehicleActionResponse>('/vehicles', payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async activateVehicle(vehicleId: string): Promise<VehicleActionResponse> {
    try {
      const response = await apiClient.patch<VehicleActionResponse>(`/vehicles/${vehicleId}/activate`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const VehicleService = new VehicleServiceImpl();