// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  // Obtener el tema del localStorage o usar 'light' por defecto
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Aplicar el tema al documento HTML
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-bs-theme', theme);
    
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Proporcionar el tema y la función de cambio a los componentes hijos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};