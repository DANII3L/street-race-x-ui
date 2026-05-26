export type Rank = 'S' | 'A' | 'B' | 'C' | 'D';
export type VehicleType = 'auto' | 'moto' | 'monopatin_electrico';
export type ChallengeStatus = 'pendiente' | 'aceptado' | 'rechazado' | 'en_curso' | 'completado' | 'cancelado';

export interface User {
  id: string;
  username: string;
  email: string;
  foto_perfil?: string;
  zona_ciudad: string;
  zona_localidad: string;
  rango: Rank;
  victorias: number;
  derrotas: number;
  retos_consecutivos: number;
}

export interface Vehicle {
  id: string;
  user_id: string;
  tipo_vehiculo: VehicleType;
  marca: string;
  modelo: string;
  año: number;
  placa?: string;
  activo: boolean;
}

export interface Challenge {
  id: string;
  retador_id: string;
  retado_id: string;
  tipo_carrera: string;
  vehiculo_retador_id: string;
  vehiculo_retado_id: string;
  ubicacion_acordada: string;
  fecha_acordada: {
    _seconds: number;
    _nanoseconds: number;
  };
  estado: ChallengeStatus;
  ganador_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface ChallengeItem {
  props: Challenge;
}

export interface ChallengeActionResponse {
  ok: boolean;
  message: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T[];
}

export interface RegisterResponse {
  ok: boolean;
  message: string;
  uid: string;
}

export interface LoginResponse {
  ok: boolean;
  token: string;
  user: {
    id: string;
    username: string;
    rango: Rank;
  };
}

export interface PilotProps {
  id: string;
  username: string;
  email: string;
  foto_perfil?: string;
  zona_localidad: string;
  zona_ciudad: string;
  zona_estado: string;
  zona_pais: string;
  rango: Rank;
  categoria: string;
  victorias: number;
  derrotas: number;
  retos_consecutivos: number;
  puntos: number;
  estado: string;
}

export interface DiscoverPilot {
  props: PilotProps;
}

export interface DiscoverResponse {
  ok: boolean;
  data: DiscoverPilot[];
}

export interface VehicleProps {
  id: string;
  user_id: string;
  tipo_vehiculo: string;
  marca: string;
  modelo: string;
  año: number;
  placa: string;
  activo: boolean;
  created_at?: any;
  updated_at?: any;
}

export interface VehicleItem {
  props: VehicleProps;
}

export interface VehicleListResponse {
  ok: boolean;
  data: VehicleItem[];
}

export interface VehicleActionResponse {
  ok: boolean;
  message: string;
  uid?: string;
}

export interface UserProfileResponse {
  ok: boolean;
  data: {
    props: PilotProps;
  };
}