import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Error desconocido',
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Error de conexión',
      });
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  return {
    ...state,
    refetch: fetchData,
    setData,
    setError,
    setLoading,
  };
}

// Hook para operaciones POST/PUT/DELETE
export function useApiMutation<T, D = any>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (apiCall: (data?: D) => Promise<ApiResponse<T>>, data?: D) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall(data);
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        });
        return response;
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Error desconocido',
        });
        throw new Error(response.error || 'Error desconocido');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error de conexión';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  }, []);

  return {
    ...state,
    mutate,
  };
} 