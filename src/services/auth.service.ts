import apiClient from '../api/client';
import { type RegisterResponse, type LoginResponse } from '../types';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  foto_perfil: string;
  zona_localidad: string;
  zona_ciudad: string;
  zona_estado: string;
  zona_pais: string;
}

class AuthServiceImpl {
  private handleError(error: any): never {
    const message = error.response?.data?.msg || 'Error inesperado en el servicio de autenticación';
    throw new Error(message);
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { 
        email, 
        password 
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async register(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const AuthService = new AuthServiceImpl();