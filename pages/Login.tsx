import React, { useState } from 'react';
import { APP_NAME } from '../constants';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';

export const Login: React.FC = () => {
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();

  const validateInput = (value: string) => {
    if (!value) return "El DNI es requerido.";
    if (!/^\d+$/.test(value)) return "El DNI debe contener solo números.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateInput(dni);
    if (validationError) {
      setError(validationError);
      return;
    }

    const success = await login(dni);
    if (!success) {
      setError('No se encontró un paciente con ese documento. Intente con 12345678.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.28 3.6-1.28 3.6-1.28"/>
                <path d="M23 13a9.16 9.16 0 0 1-1.8 3.4"/>
                <path d="M11 13c1.81-2 2-4.5 2-4.5V6a2 2 0 0 0-2-2c-2 0-2 2-2 2v2.5C9 11 11 13 11 13z"/>
                <path d="M13.919 13.854A15.91 15.91 0 0 1 11 23c-1.115-1.715-1.622-3.867-1.39-6.18"/>
                <path d="M1 13a9.16 9.16 0 0 0 1.8 3.4"/>
                <path d="M5 14c-1.49-1.28-3.6-1.28-3.6-1.28"/>
             </svg>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Bienvenido</h2>
          <p className="mt-2 text-sm text-gray-600">
            Portal de Pacientes {APP_NAME}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                Documento de Identidad
              </label>
              <input
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                autoComplete="username"
                required
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-400 text-gray-900 focus:outline-none focus:z-10 sm:text-sm transition-colors`}
                placeholder="Ingrese su DNI sin puntos"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                   {error}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full flex justify-center py-3" isLoading={isLoading}>
              Ingresar
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Al ingresar, usted acepta nuestros términos y condiciones de uso de datos sensibles.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};