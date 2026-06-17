// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-md-4">
            <div className="footer-brand d-flex align-items-center gap-2 mb-3">
              <div className="logo-icon">OyM</div>
              <div>
                <div style={{ color: 'rgba(255,255,255,.90)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
                  Universidad OyM
                </div>
                <div style={{ color: 'rgba(255,255,255,.50)', fontSize: '0.72rem' }}>
                  Tablero de Anuncios
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 0 }}>
              Mantente informado sobre todos los eventos, noticias y comunicados
              importantes de la Universidad OyM en un solo lugar.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-2 offset-md-1">
            <h6>Navegación</h6>
            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/login">Administrador</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-2">
            <h6>Categorías</h6>
            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
              <li><Link to="/?cat=Informativo">Informativos</Link></li>
              <li><Link to="/?cat=Evento">Eventos</Link></li>
              <li><Link to="/?cat=Administrativo">Administrativos</Link></li>
              <li><Link to="/?cat=Académico">Académicos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6>Contacto</h6>
            <ul className="list-unstyled mb-0" style={{ lineHeight: 2, color: 'rgba(255,255,255,.55)', fontSize: '0.82rem' }}>
              <li>
                <i className="bi bi-geo-alt me-2" style={{ color: 'rgba(255,255,255,.4)' }}></i>
                República Dominicana
              </li>
              <li>
                <i className="bi bi-envelope me-2" style={{ color: 'rgba(255,255,255,.4)' }}></i>
                info@oym.edu.do
              </li>
              <li>
                <i className="bi bi-globe me-2" style={{ color: 'rgba(255,255,255,.4)' }}></i>
                www.oym.edu.do
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 footer-bottom">
          <span>
            &copy; {year} Universidad OyM — Todos los derechos reservados.
          </span>
          <span>
            Desarrollado con&nbsp;
            <i className="bi bi-heart-fill" style={{ color: '#E4A11B', fontSize: '0.75rem' }}></i>
            &nbsp;para la comunidad universitaria
          </span>
        </div>

        {/* Developer credit */}
        <div className="text-center mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,.06)',
            border: '1px solid rgba(228,161,27,.25)',
            borderRadius: '999px',
            padding: '0.35rem 1.1rem',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,.60)',
            letterSpacing: '0.02em',
          }}>
            <i className="bi bi-code-slash" style={{ color: '#E4A11B' }}></i>
            Desarrollado por el
            <strong style={{ color: 'rgba(255,255,255,.88)', fontWeight: 600 }}>
              Ing. Andres Escolastico
            </strong>
            <i className="bi bi-mortarboard-fill" style={{ color: '#E4A11B' }}></i>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
