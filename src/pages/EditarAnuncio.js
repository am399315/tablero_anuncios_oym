// src/pages/EditarAnuncio.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerAnuncioPorId, editarAnuncio } from '../data/anuncios';

function EditarAnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    autor: '',
    categoria: '',
    destacado: false,
    fechaExpiracion: ''
  });
  
  // Estado para manejar errores de validación
  const [errores, setErrores] = useState({});
  
  // Estado para manejar si el anuncio no existe
  const [anuncioNoEncontrado, setAnuncioNoEncontrado] = useState(false);

  // Cargar los datos del anuncio al montar el componente
  useEffect(() => {
    const anuncio = obtenerAnuncioPorId(id);
    
    if (anuncio) {
      setFormData({
        titulo: anuncio.titulo,
        contenido: anuncio.contenido,
        autor: anuncio.autor,
        categoria: anuncio.categoria,
        destacado: anuncio.destacado || false,
        fechaExpiracion: anuncio.fechaExpiracion || ''
      });
    } else {
      setAnuncioNoEncontrado(true);
    }
  }, [id]);

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
      // Editar anuncio
      const anuncioActualizado = editarAnuncio(id, formData);
      
      if (anuncioActualizado) {
        // Navegar a la página de detalle del anuncio
        navigate(`/anuncio/${id}`);
      }
    }
  };

  // Si el anuncio no existe, mostrar un mensaje
  if (anuncioNoEncontrado) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4>El anuncio no fue encontrado</h4>
        <p>El anuncio que intentas editar no existe o ha sido eliminado.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  // Categorías disponibles
  const categorias = ['Informativo', 'Evento', 'Administrativo', 'Académico'];

  return (
    <div>
      <div className="rounded shadow-sm p-4 mb-4" 
           style={{ 
             backgroundImage: 'linear-gradient(135deg, rgba(0,51,102,0.95) 0%, rgba(0,31,63,0.9) 100%)',
             borderRadius: '12px',
             color: 'white'
           }}>
        <h2 className="mb-2" style={{ color: 'white' }}>
          <i className="bi bi-pencil-square me-2"></i>
          Editar Anuncio
        </h2>
        <p className="lead mb-0">Modifica la información del anuncio seleccionado.</p>
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
            
            {/* Opción de destacar anuncio */}
            <div className="mb-4">
              <div className="form-check form-check-inline p-3 border rounded bg-light">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="destacado"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  style={{ transform: 'scale(1.2)' }}
                />
                <label className="form-check-label d-flex align-items-center" htmlFor="destacado">
                  <i className="bi bi-star-fill text-warning me-2 fs-5"></i>
                  <strong>Marcar como anuncio destacado</strong>
                  <span className="ms-2 badge bg-warning text-dark">Destacado</span>
                </label>
                <div className="form-text mt-2">
                  Los anuncios destacados aparecen en una sección especial en la parte superior de la página principal.
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="d-flex justify-content-between mt-4">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/anuncio/${id}`)}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#003366' }}>
                <i className="bi bi-save me-2"></i>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarAnuncio;