// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NotificationBadge from './NotificationBadge';
import { getNewAnnouncementsCount, updateLastVisit } from '../services/NotificationService';
import { obtenerAnuncios } from '../data/anuncios';
import { isAuthenticated, logout } from '../services/AuthService';

function Navbar() {
  const [newAnnouncementsCount, setNewAnnouncementsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(isAuthenticated());
    const anuncios = obtenerAnuncios();
    const count = getNewAnnouncementsCount(anuncios);
    setNewAnnouncementsCount(count);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavbarToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      updateLastVisit();
      setNewAnnouncementsCount(0);
    }
  };

  const handleHomeClick = () => {
    updateLastVisit();
    setNewAnnouncementsCount(0);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/" onClick={handleHomeClick}>
          <div className="logo-icon">OyM</div>
          <div className="logo-text">
            <span className="brand-main">Tablero de Anuncios</span>
            <span className="brand-sub">Universidad OyM</span>
          </div>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Abrir menú"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item d-flex align-items-center">
              <ThemeToggle />
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link position-relative${location.pathname === '/' ? ' active' : ''}`}
                to="/"
                onClick={handleHomeClick}
              >
                <i className="bi bi-house me-1"></i>
                Inicio
                <NotificationBadge count={newAnnouncementsCount} />
              </Link>
            </li>

            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === '/crear' ? ' active' : ''}`}
                    to="/crear"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Crear Anuncio
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link border-0"
                    style={{ textDecoration: 'none' }}
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link${location.pathname === '/login' ? ' active' : ''}`}
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
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
