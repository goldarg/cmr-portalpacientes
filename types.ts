export interface User {
    dni: string;
    fullName: string;
    email?: string;
  }
  
  export interface Study {
    id: string;
    title: string;
    specialty: string;
    date: string;
    description: string; // Full medical report content
    summary?: string; // AI Generated summary
    documentUrl: string;
    doctorName: string;
  }
  
  export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }