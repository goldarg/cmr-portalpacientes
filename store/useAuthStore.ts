import { create } from 'zustand';
import { api } from '../services/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (dni: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (dni) => {
    set({ isLoading: true });
    try {
      const user = await api.login(dni);
      if (user) {
        set({ user, isLoading: false });
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    set({ isLoading: false, user: null });
    return false;
  },
  logout: () => set({ user: null }),
}));