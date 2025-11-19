import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LoadingState } from '../types';
import { Button } from '../components/Button';
import { useStudyStore } from '../store/useStudyStore';

export const StudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Usamos el store en lugar de estado local
  const { currentStudy, status, fetchStudyById, clearCurrentStudy } = useStudyStore();

  useEffect(() => {
    if (id) {
      fetchStudyById(id);
    }
    return () => {
      clearCurrentStudy();
    };
  }, [id, fetchStudyById, clearCurrentStudy]);

  if (status === LoadingState.LOADING) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
         <div className="bg-white rounded-xl shadow p-8 animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded w-full mt-8"></div>
         </div>
      </div>
    );
  }

  if (status === LoadingState.ERROR || !currentStudy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Estudio no encontrado</h2>
        <p className="text-gray-500 mt-2">El estudio que busca no existe o no tiene permisos para verlo.</p>
        <Button onClick={() => navigate('/dashboard')} variant="secondary" className="mt-4 mx-auto">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const study = currentStudy;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <svg className="mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Volver al listado
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-50 px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase mb-1 block">
              {study.specialty}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 leading-7">{study.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Realizado el {study.date}</p>
          </div>
          <div className="flex-shrink-0">
             <a 
               href={study.documentUrl} 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
             >
                <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Ver Documento
             </a>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Informe Médico</h3>
              <div className="prose prose-blue max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p>{study.description}</p>
              </div>
            </div>

            <div className="md:col-span-1 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Profesional</h4>
                <p className="mt-1 text-sm text-gray-900 font-medium">{study.doctorName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};