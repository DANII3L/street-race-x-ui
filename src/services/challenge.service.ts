import apiClient from '../api/client';
import { type ApiResponse, type ChallengeItem, type ChallengeActionResponse } from '../types';

class ChallengeServiceImpl {
  private handleError(error: any): never {
    const message = error.response?.data?.msg || 'Error inesperado en el servicio de retos';
    throw new Error(message);
  }

  public async createChallenge(payload: { 
    retado_id: string; 
    tipo_carrera: string; 
    ubicacion_acordada: string; 
    fecha_acordada: string; 
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post<ApiResponse<any>>('/challenges', payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getHistory(): Promise<ApiResponse<ChallengeItem>> {
    try {
      const response = await apiClient.get<ApiResponse<ChallengeItem>>('/challenges/history');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async respondToChallenge(challengeId: string, aceptar: 'aceptado' | 'rechazado'): Promise<ChallengeActionResponse> {
    try {
      const response = await apiClient.patch<ChallengeActionResponse>(`/challenges/${challengeId}/respond`, { aceptar });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async completeChallenge(challengeId: string, ganadorId: string): Promise<ChallengeActionResponse> {
    try {
      console.log(ganadorId)
      const response = await apiClient.post<ChallengeActionResponse>(`/challenges/${challengeId}/complete`, { ganadorId: ganadorId });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const ChallengeService = new ChallengeServiceImpl();