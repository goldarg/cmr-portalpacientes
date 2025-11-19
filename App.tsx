import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { StudyDetail } from './pages/StudyDetail';
import { Header } from './components/Header';
import { useAuthStore } from './store/useAuthStore';

// Layout Component for Protected Routes
const ProtectedLayout: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study/:id" element={<StudyDetail />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SaludConnect. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

const AppRoutes: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    
    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
    );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;