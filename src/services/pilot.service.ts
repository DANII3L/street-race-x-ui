import apiClient from '../api/client';
import { type DiscoverResponse, type UserProfileResponse } from '../types';

class PilotServiceImpl {
  private handleError(error: any): never {
    const message = error.response?.data?.message || 'Error inesperado en el servicio de pilotos';
    throw new Error(message);
  }

  public async getDiscoverPilots(params?: { zona?: string }): Promise<DiscoverResponse> {
    try {
      const response = await apiClient.get<DiscoverResponse>('/users/discover', { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getMyProfile(): Promise<UserProfileResponse> {
    try {
      const response = await apiClient.get<UserProfileResponse>('/users/me');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  } 
}

export const PilotService = new PilotServiceImpl();