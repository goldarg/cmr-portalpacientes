
import { Study, User } from '../types';

export const api = {
  async login(dni: string): Promise<User | null> {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni }),
      });
      
      if (!response.ok) return null;
      
      const data = await response.json() as { user: User };
      return data.user;
    } catch (e) {
      console.error("Login error", e);
      return null;
    }
  },

  async getStudies(): Promise<Study[]> {
    try {
      const response = await fetch('/api/studies');
      if (!response.ok) return [];
      return await response.json();
    } catch (e) {
      console.error("Fetch studies error", e);
      return [];
    }
  },

  async getStudy(id: string): Promise<Study | null> {
    try {
      const response = await fetch(`/api/studies/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      console.error("Fetch study error", e);
      return null;
    }
  }
};
