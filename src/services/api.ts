import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:3000';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error en la API:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response.data
      });
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('Error de conexión:', 'No se pudo conectar con el servidor');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error de configuración:', error.message);
    }
    return Promise.reject(error);
  }
);

// Tipos para los datos de surf (ajustados a tu API)
export interface SurfSpot {
  id: number;
  nombre: string;
  ubicacion: string;
  tipo: string;
  dificultad: string;
  mejorEpoca: string;
  alturaPromedio: string;
  descripcion: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
}

export interface CurrentConditions {
  spotId: number;
  spotNombre: string;
  timestamp: string;
  alturaOlas: string;
  direccionViento: string;
  velocidadViento: string;
  temperatura: string;
  calidadOlas: string;
  marea: string;
  recomendacion: string;
}

export interface ForecastDay {
  fecha: string;
  alturaOlas: string;
  direccionViento: string;
  velocidadViento: string;
  temperatura: string;
  calidadOlas: string;
  recomendacion: string;
}

export interface Forecast {
  spotId: number;
  spotNombre: string;
  pronostico: ForecastDay[];
}

export interface DeveloperStats {
  tiempoSurfeando: string;
  spotsVisitados: number;
  olasAtrapadas: number;
  mejorSesion: {
    fecha: string;
    spot: string;
    duracion: string;
    olasAtrapadas: number;
    alturaMaxima: string;
  };
  codigoEscritoEnPlaya: string;
  proyectosCompletados: number;
  balanceVida: string;
}

export interface SurfCodeTip {
  categoria: string;
  consejo: string;
  relacion: string;
}

// Tipos base para las respuestas de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Servicios de la API
export const apiService = {
  // Surf Spots
  async getSurfSpots() {
    const response = await apiClient.get<ApiResponse<SurfSpot[]>>('/api/surf-spots');
    return response.data;
  },

  async getSurfSpot(id: string) {
    const response = await apiClient.get<ApiResponse<SurfSpot>>(`/api/surf-spots/${id}`);
    return response.data;
  },

  // Condiciones actuales
  async getCurrentConditions(spotId: string) {
    const response = await apiClient.get<ApiResponse<CurrentConditions>>(`/api/condiciones-actuales/${spotId}`);
    return response.data;
  },

  // Pronóstico
  async getForecast(spotId: string) {
    const response = await apiClient.get<ApiResponse<Forecast[]>>(`/api/pronostico/${spotId}`);
    return response.data;
  },

  // Estadísticas del desarrollador
  async getDeveloperStats() {
    const response = await apiClient.get<ApiResponse<DeveloperStats>>('/api/estadisticas-desarrollador');
    return response.data;
  },

  // Consejos surf y código
  async getSurfCodeTips() {
    const response = await apiClient.get<ApiResponse<SurfCodeTip[]>>('/api/consejos-surf-codigo');
    return response.data;
  },
};

export default apiClient; 