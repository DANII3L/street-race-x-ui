import apiClient from '../api/client';
import { type ApiResponse, type NotificationListResponse } from '../types';

class NotificationServiceImpl {
  private handleError(error: any): never {
    const message = error.response?.data?.msg || 'Error en el servicio de notificaciones';
    throw new Error(message);
  }

  public async getMyNotifications(): Promise<NotificationListResponse> {
    try {
      const response = await apiClient.get<NotificationListResponse>('/notifications');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async markAsRead(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.patch<ApiResponse<any>>(`/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const NotificationService = new NotificationServiceImpl();