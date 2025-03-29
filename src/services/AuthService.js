// src/services/AuthService.js

// Clave para almacenar el estado de autenticación
const AUTH_KEY = 'authState';

// Credenciales del administrador (en una aplicación real, esto estaría en el backend)
// NOTA: En una aplicación real, NUNCA guardes credenciales en el frontend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Esta contraseña es solo para desarrollo, cámbiala por una segura
  password: 'OyM2025',
};

// Verificar si las credenciales son correctas
export const login = (username, password) => {
  if (
    username === ADMIN_CREDENTIALS.username && 
    password === ADMIN_CREDENTIALS.password
  ) {
    // Guardar estado de autenticación
    const authState = {
      isAuthenticated: true,
      user: {
        username: username,
        role: 'admin',
      },
      timestamp: new Date().getTime(),
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
    return true;
  }
  
  return false;
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const authState = localStorage.getItem(AUTH_KEY);
  
  if (!authState) {
    return false;
  }
  
  const parsedState = JSON.parse(authState);
  
  // Verificar si el token ha expirado (24 horas)
  const now = new Date().getTime();
  const timePassed = now - parsedState.timestamp;
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  
  if (timePassed > DAY_IN_MS) {
    // El token ha expirado, cerrar sesión
    logout();
    return false;
  }
  
  return parsedState.isAuthenticated;
};

// Obtener información del usuario autenticado
export const getUser = () => {
  const authState = localStorage.getItem(AUTH_KEY);
  
  if (!authState) {
    return null;
  }
  
  const parsedState = JSON.parse(authState);
  
  if (!parsedState.isAuthenticated) {
    return null;
  }
  
  return parsedState.user;
};