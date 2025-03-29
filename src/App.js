// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importamos los componentes de páginas
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AnuncioDetalle from './pages/AnuncioDetalle';
import CrearAnuncio from './pages/CrearAnuncio';
import EditarAnuncio from './pages/EditarAnuncio';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Importamos el proveedor de tema
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Navbar estará presente en todas las páginas */}
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Ruta para la página principal */}
            <Route path="/" element={<Home />} />
            
            {/* Ruta para ver un anuncio específico */}
            <Route path="/anuncio/:id" element={<AnuncioDetalle />} />
            
            {/* Ruta para el login de administrador */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas (solo administradores) */}
            <Route path="/crear" element={
              <ProtectedRoute>
                <CrearAnuncio />
              </ProtectedRoute>
            } />
            
            <Route path="/editar/:id" element={
              <ProtectedRoute>
                <EditarAnuncio />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;