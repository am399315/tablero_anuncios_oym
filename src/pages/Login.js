// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../services/AuthService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/');
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos.');
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center align-items-start" style={{ minHeight: '70vh', paddingTop: '2rem' }}>
      <div className="col-sm-10 col-md-7 col-lg-5 col-xl-4">
        {/* Back link */}
        <div className="mb-3">
          <Link to="/" className="d-inline-flex align-items-center gap-1 text-decoration-none"
            style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
            <i className="bi bi-arrow-left"></i>
            Volver al tablero
          </Link>
        </div>

        <div className="card shadow-sm" style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
          {/* Header */}
          <div className="card-header text-white text-center py-4"
            style={{
              background: 'linear-gradient(135deg, var(--oym-dark) 0%, var(--oym-primary) 60%, #1A5A9E 100%)',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}>
            <div style={{
              position: 'absolute', top: '-30%', right: '-10%',
              width: '50%', height: '200%',
              background: 'radial-gradient(ellipse, rgba(228,161,27,.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 64, height: 64,
                background: 'rgba(255,255,255,.15)',
                borderRadius: 'var(--r-xl)',
                backdropFilter: 'blur(8px)',
                fontSize: '1.75rem',
                position: 'relative',
                zIndex: 1,
              }}>
              <i className="bi bi-shield-lock-fill" style={{ color: 'var(--oym-accent)' }}></i>
            </div>
            <h4 className="mb-1 fw-700" style={{ color: '#fff', position: 'relative', zIndex: 1, fontSize: '1.1rem' }}>
              Acceso Administrativo
            </h4>
            <p className="mb-0" style={{ color: 'rgba(255,255,255,.65)', fontSize: '0.8rem', position: 'relative', zIndex: 1 }}>
              Universidad OyM · Panel de Control
            </p>
          </div>

          {/* Form */}
          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3" role="alert"
                style={{ borderRadius: 'var(--r-md)' }}>
                <i className="bi bi-exclamation-circle-fill flex-shrink-0"></i>
                <small>{error}</small>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={loading}
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
                style={{ padding: '0.65rem', fontSize: '0.95rem', fontWeight: 600 }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Verificando…
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar sesión
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="card-footer text-center py-3"
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'var(--surface-alt)' }}>
            <i className="bi bi-shield-check me-1" style={{ color: 'var(--oym-accent)' }}></i>
            Sesión segura · Expira en 24 horas
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
