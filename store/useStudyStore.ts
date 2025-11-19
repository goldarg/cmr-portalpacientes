import { create } from 'zustand';
import { api } from '../services/api';
import { Study, LoadingState } from '../types';

interface StudyState {
  studies: Study[];
  currentStudy: Study | null;
  status: LoadingState;
  
  fetchStudies: () => Promise<void>;
  fetchStudyById: (id: string) => Promise<void>;
  clearCurrentStudy: () => void;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  studies: [],
  currentStudy: null,
  status: LoadingState.IDLE,

  fetchStudies: async () => {
    set({ status: LoadingState.LOADING });
    try {
      const studies = await api.getStudies();
      set({ studies, status: LoadingState.SUCCESS });
    } catch (error) {
      set({ status: LoadingState.ERROR });
    }
  },

  fetchStudyById: async (id: string) => {
    set({ status: LoadingState.LOADING, currentStudy: null });
    
    // Opcional: Buscar primero en la lista ya cargada para UX instantánea
    const existingStudy = get().studies.find(s => s.id === id);
    if (existingStudy) {
       set({ currentStudy: existingStudy, status: LoadingState.SUCCESS });
       return; // O podemos seguir haciendo fetch en background para actualizar
    }

    try {
      const study = await api.getStudy(id);
      if (study) {
        set({ currentStudy: study, status: LoadingState.SUCCESS });
      } else {
        set({ status: LoadingState.ERROR });
      }
    } catch (error) {
      set({ status: LoadingState.ERROR });
    }
  },

  clearCurrentStudy: () => set({ currentStudy: null, status: LoadingState.IDLE })
}));