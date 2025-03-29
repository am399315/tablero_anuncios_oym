// src/pages/CrearAnuncio.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearAnuncio } from '../data/anuncios';

function CrearAnuncio() {
  const navigate = useNavigate();
  
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    autor: '',
    categoria: 'Informativo', // Valor por defecto
    destacado: false, // Por defecto no destacado
    fechaExpiracion: '' // Sin fecha de expiración por defecto
  });
  
  // Estado para manejar errores de validación
  const [errores, setErrores] = useState({});

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Si es un checkbox, usamos el valor de 'checked'
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // Limpiar errores cuando el usuario comienza a corregir
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: null
      });
    }
  };

  // Validar el formulario antes de enviar
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio';
    }
    
    if (!formData.contenido.trim()) {
      nuevosErrores.contenido = 'El contenido es obligatorio';
    }
    
    if (!formData.autor.trim()) {
      nuevosErrores.autor = 'El autor es obligatorio';
    }
    
    setErrores(nuevosErrores);
    
    // Si no hay errores, el formulario es válido
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (validarFormulario()) {
      // Crear nuevo anuncio
      const nuevoAnuncio = crearAnuncio(formData);
      
      // Navegar a la página de detalle del nuevo anuncio
      navigate(`/anuncio/${nuevoAnuncio.id}`);
    }
  };

  // Categorías disponibles
  const categorias = ['Informativo', 'Evento', 'Administrativo', 'Académico'];

  return (
    <div>
      <div className="bg-white rounded shadow-sm p-4 mb-4" 
           style={{ 
             backgroundImage: 'linear-gradient(135deg, rgba(0,51,102,0.95) 0%, rgba(0,31,63,0.9) 100%)',
             borderRadius: '12px',
             color: 'white'
           }}>
        <h2 className="mb-2" style={{ color: 'white' }}>
          <i className="bi bi-plus-circle me-2"></i>
          Crear Nuevo Anuncio
        </h2>
        <p className="lead mb-0">Comparte información importante con la comunidad universitaria.</p>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Campo de título */}
            <div className="mb-4">
              <label htmlFor="titulo" className="form-label">
                <i className="bi bi-type-h1 me-2"></i>
                Título
              </label>
              <input
                type="text"
                className={`form-control form-control-lg ${errores.titulo ? 'is-invalid' : ''}`}
                id="titulo"
                name="titulo"
                placeholder="Escribe un título claro y conciso"
                value={formData.titulo}
                onChange={handleChange}
              />
              {errores.titulo && (
                <div className="invalid-feedback">{errores.titulo}</div>
              )}
            </div>
        
            {/* Campo de contenido */}
            <div className="mb-4">
              <label htmlFor="contenido" className="form-label">
                <i className="bi bi-text-paragraph me-2"></i>
                Contenido
              </label>
              <textarea
                className={`form-control ${errores.contenido ? 'is-invalid' : ''}`}
                id="contenido"
                name="contenido"
                rows="6"
                placeholder="Describe detalladamente el anuncio..."
                value={formData.contenido}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
              ></textarea>
              {errores.contenido && (
                <div className="invalid-feedback">{errores.contenido}</div>
              )}
            </div>
            
            <div className="row">
              {/* Campo de autor */}
              <div className="col-md-6 mb-4">
                <label htmlFor="autor" className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Autor/Departamento
                </label>
                <input
                  type="text"
                  className={`form-control ${errores.autor ? 'is-invalid' : ''}`}
                  id="autor"
                  name="autor"
                  placeholder="Nombre o departamento responsable"
                  value={formData.autor}
                  onChange={handleChange}
                />
                {errores.autor && (
                  <div className="invalid-feedback">{errores.autor}</div>
                )}
              </div>
              
              {/* Campo de categoría */}
              <div className="col-md-6 mb-4">
                <label htmlFor="categoria" className="form-label">
                  <i className="bi bi-tag me-2"></i>
                  Categoría
                </label>
                <select
                  className="form-select"
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                <div className="form-text">Selecciona la categoría más apropiada para tu anuncio.</div>
              </div>
            </div>
            
            {/* Campo de fecha de expiración */}
            <div className="mb-4">
              <label htmlFor="fechaExpiracion" className="form-label">
                <i className="bi bi-calendar-x me-2"></i>
                Fecha de expiración (opcional)
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaExpiracion"
                name="fechaExpiracion"
                value={formData.fechaExpiracion}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // La fecha mínima es hoy
              />
              <div className="form-text">
                Si estableces una fecha de expiración, el anuncio aparecerá marcado como expirado después de esta fecha.
                Si lo dejas en blanco, el anuncio no expirará nunca.
              </div>
            </div>
        
            {/* Botones de acción */}
            <div className="d-flex justify-content-between mt-4">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => navigate('/')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#003366' }}>
                <i className="bi bi-send me-2"></i>
                Publicar Anuncio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearAnuncio;