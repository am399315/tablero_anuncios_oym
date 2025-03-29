// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NotificationBadge from './NotificationBadge';
import { getNewAnnouncementsCount, updateLastVisit } from '../services/NotificationService';
import { obtenerAnuncios } from '../data/anuncios';
import { isAuthenticated, logout } from '../services/AuthService';

function Navbar() {
  const [newAnnouncementsCount, setNewAnnouncementsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  // Verificar autenticación y anuncios nuevos al cargar
  useEffect(() => {
    setIsAdmin(isAuthenticated());
    
    const anuncios = obtenerAnuncios();
    const count = getNewAnnouncementsCount(anuncios);
    setNewAnnouncementsCount(count);
  }, []);
  
  // Marcar como visitado cuando se abre el menú en móviles
  const handleNavbarToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      updateLastVisit();
      setNewAnnouncementsCount(0);
    }
  };
  
  // Actualizar último acceso cuando se navega al inicio
  const handleHomeClick = () => {
    updateLastVisit();
    setNewAnnouncementsCount(0);
  };
  
  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    setIsAdmin(false);
    navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Logo y nombre de la universidad */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="me-2 d-flex align-items-center justify-content-center" 
               style={{ 
                 width: '40px', 
                 height: '40px', 
                 backgroundColor: '#E4A11B', 
                 borderRadius: '50%',
                 color: 'white',
                 fontWeight: 'bold',
                 fontSize: '18px'
               }}>
            OyM
          </div>
          <span>Tablero de Anuncios - Universidad OyM</span>
        </Link>
        
        {/* Botón para navegación en dispositivos móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3 d-flex align-items-center">
              <ThemeToggle />
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/" onClick={handleHomeClick}>
                Inicio
                <NotificationBadge count={newAnnouncementsCount} />
              </Link>
            </li>
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/crear">
                    Crear Anuncio
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="bi bi-person-lock me-1"></i>
                  Administrador
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;