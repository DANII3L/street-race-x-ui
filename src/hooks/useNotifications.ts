import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NotificationService } from '../services/notification.service';
import { useAuthStore } from '../context/authStore';
import { type NotificationItem } from '../types';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';

let globalSocket: Socket | null = null;

export const useNotifications = () => {
  const { token, user } = useAuthStore();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await NotificationService.getMyNotifications();
      if (res.ok && res.data) {
        setNotifications(res.data);
        const unread = res.data.filter(n => !n.props.leida).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  useEffect(() => {
    if (!token || !user?.id) return;

    if (!globalSocket) {
      globalSocket = io(SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: false,
        query: {
          userId: user.id
        }
      });
    }

    globalSocket.off('notification');
    globalSocket.on('notification', (data: any) => {
      const normalizedNotification: NotificationItem = {
        props: {
          id: data.id || crypto.randomUUID(),
          user_id: user.id,
          tipo: data.tipo,
          mensaje: data.mensaje,
          leida: false,
          referencia_id: data.referencia_id || null,
          created_at: {
            _seconds: Math.floor(Date.now() / 1000),
            _nanoseconds: 0
          }
        }
      };

      setNotifications((prev) => {
        if (prev.some(n => n.props.mensaje === normalizedNotification.props.mensaje && n.props.referencia_id === normalizedNotification.props.referencia_id)) {
          return prev;
        }
        return [normalizedNotification, ...prev];
      });
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      if (globalSocket) {
        globalSocket.off('notification');
      }
    };
  }, [user?.id, token]);

  const markNotificationAsRead = async (id: string) => {
    try {
      const res = await NotificationService.markAsRead(id);
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.props.id === id ? { ...n, props: { ...n.props, leida: true } } : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markNotificationAsRead,
    refresh: fetchNotifications
  };
};