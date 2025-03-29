// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';

// Este componente protege las rutas que requieren autenticación
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;