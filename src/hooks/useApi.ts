import { useState, useCallback } from 'react';
import { ApiError } from '../types/api';
import { useAuthStore } from '../store/auth';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  execute: (...args: any[]) => Promise<void>;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<{ data: T }>
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(...args);
        setData(response.data);
      } catch (err: any) {
        setError({
          message: err.response?.data?.message || 'An error occurred',
          code: err.response?.data?.code,
          status: err.response?.status || 500,
        });
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
}

const { user, isAuthenticated, login, logout } = useAuthStore();

const { data, loading, error, execute } = useApi(orders.getAll); 