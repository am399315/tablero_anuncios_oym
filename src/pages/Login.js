// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../services/AuthService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!username || !password) {
      setError('Por favor, completa todos los campos');
      setLoading(false);
      return;
    }
    
    // Intentar iniciar sesión
    const success = login(username, password);
    
    if (success) {
      // Redireccionar al inicio
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
      setLoading(false);
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white text-center py-3">
            <h3 className="mb-0">Acceso Administrativo</h3>
          </div>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '40px' }}>
                <i className="bi bi-person"></i>
              </div>
              <p className="text-muted">Ingresa tus credenciales para administrar el tablero de anuncios</p>
            </div>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Ingresa tu nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  <i className="bi bi-lock me-2"></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Iniciando sesión...
                  </span>
                ) : (
                  <span>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar sesión
                  </span>
                )}
              </button>
            </form>
          </div>
          <div className="card-footer text-center text-muted py-3">
            Universidad OyM - Panel Administrativo
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;