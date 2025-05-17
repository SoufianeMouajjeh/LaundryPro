import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/api';
import { auth } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const response = await auth.login({ email, password });
        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });
      },
      register: async (name: string, email: string, password: string) => {
        const response = await auth.register({ name, email, password });
        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });
      },
      logout: async () => {
        await auth.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 