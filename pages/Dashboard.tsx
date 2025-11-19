import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingState } from '../types';
import { useStudyStore } from '../store/useStudyStore';

export const Dashboard: React.FC = () => {
  const { studies, status, fetchStudies } = useStudyStore();
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  // Compute unique specialties for the filter dropdown
  const specialties = Array.from(new Set(studies.map(s => s.specialty))).sort();

  // Filter Logic
  const filteredStudies = filterSpecialty === 'all' 
    ? studies 
    : studies.filter(s => s.specialty === filterSpecialty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mis Estudios</h1>
            <p className="text-gray-500 mt-2 text-lg">Historial completo de sus prácticas médicas</p>
        </div>
        
        <div className="w-full md:w-72">
          <label htmlFor="specialty-filter" className="sr-only">Filtrar por especialidad</label>
          <div className="relative">
            <select
                id="specialty-filter"
                className="block w-full pl-4 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-xl shadow-sm bg-white text-gray-700 appearance-none cursor-pointer"
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
            >
                <option value="all">Todas las especialidades</option>
                {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
          </div>
        </div>
      </div>

      {status === LoadingState.LOADING ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 animate-pulse h-64 flex flex-col">
               <div className="flex justify-between mb-6">
                  <div className="h-6 bg-gray-200 rounded-full w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
               </div>
               <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2 mb-auto"></div>
               <div className="h-10 bg-gray-100 rounded-lg w-full mt-6"></div>
            </div>
          ))}
        </div>
      ) : filteredStudies.length > 0 ? (
        <div className="space-y-6">
          <p className="text-sm text-gray-500 font-medium px-1">Mostrando {filteredStudies.length} resultados</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study) => (
              <Link 
                to={`/study/${study.id}`} 
                key={study.id}
                className="group relative block bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-blue-100 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      {study.specialty}
                    </span>
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                       {study.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-tight">
                    {study.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-6 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                       </svg>
                    </div>
                    <span className="text-sm text-gray-600 font-medium line-clamp-1">
                      {study.doctorName}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between group-hover:border-gray-100 transition-colors mt-auto">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Detalle</span>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        Ver estudio
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                       </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed shadow-sm">
          <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Sin resultados</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">No encontramos estudios para la especialidad seleccionada.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setFilterSpecialty('all')}
              className="inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Ver todos los estudios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};