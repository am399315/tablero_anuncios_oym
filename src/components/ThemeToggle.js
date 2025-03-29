// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-outline-secondary rounded-circle p-2" 
      title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? (
        <i className="bi bi-moon-stars-fill"></i>
      ) : (
        <i className="bi bi-brightness-high-fill"></i>
      )}
    </button>
  );
}

export default ThemeToggle;