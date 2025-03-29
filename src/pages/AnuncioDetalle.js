// src/pages/AnuncioDetalle.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerAnuncioPorId, eliminarAnuncio, toggleDestacado, anuncioExpirado } from '../data/anuncios';
import ShareButtons from '../components/ShareButtons';
import { isAuthenticated } from '../services/AuthService';

function AnuncioDetalle() {
  // Obtener el parámetro id de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado para almacenar el anuncio
  const [anuncio, setAnuncio] = useState(null);
  // Estado para manejar errores de carga
  const [error, setError] = useState(false);
  // Estado para confirmar eliminación
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  // Verificar si el usuario es administrador
  const [isAdmin, setIsAdmin] = useState(false);

  // Cargar el anuncio cuando cambia el id
  useEffect(() => {
    // Verificar si el usuario es administrador
    setIsAdmin(isAuthenticated());
    
    // Intentar obtener el anuncio por id
    const anuncioEncontrado = obtenerAnuncioPorId(id);
    
    if (anuncioEncontrado) {
      setAnuncio(anuncioEncontrado);
      setError(false);
    } else {
      setError(true);
    }
  }, [id]);

  // Función para volver a la página anterior
  const volver = () => {
    navigate(-1); // Equivalente a hacer clic en el botón "Atrás" del navegador
  };
  
  // Función para eliminar el anuncio actual
  const handleEliminar = () => {
    if (eliminarAnuncio(id)) {
      // Redirigir al inicio después de eliminar
      navigate('/', { replace: true });
    }
  };
  
  // Función para marcar/desmarcar como destacado
  const handleToggleDestacado = () => {
    const anuncioActualizado = toggleDestacado(id);
    if (anuncioActualizado) {
      setAnuncio(anuncioActualizado);
    }
  };

  // Si hay un error, mostramos un mensaje
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4>El anuncio no fue encontrado</h4>
        <p>El anuncio que estás buscando no existe o ha sido eliminado.</p>
        <button className="btn btn-primary" onClick={volver}>
          Volver
        </button>
      </div>
    );
  }

  // Mientras se carga el anuncio, mostramos un indicador de carga
  if (!anuncio) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div className={`card shadow-sm ${anuncioExpirado(anuncio) ? 'border-secondary' : ''}`} style={{
      opacity: anuncioExpirado(anuncio) ? 0.9 : 1
    }}>
      <div className="card-header py-3" style={{ backgroundColor: 'white' }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Detalle de anuncio</li>
          </ol>
        </nav>
      </div>
      <div className="card-body">
        <h2 className="card-title mb-3">{anuncio.titulo}</h2>
        <div className="d-flex align-items-center mb-4 flex-wrap">
          <span className="badge me-3 mb-2" style={{ 
            backgroundColor: anuncio.categoria === 'Evento' ? '#6B9AC4' : 
                           anuncio.categoria === 'Administrativo' ? '#003366' : 
                           anuncio.categoria === 'Académico' ? '#E4A11B' : 
                           '#6c757d',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}>
            <i className={`me-1 ${
              anuncio.categoria === 'Evento' ? 'bi bi-calendar-event' : 
              anuncio.categoria === 'Administrativo' ? 'bi bi-building' : 
              anuncio.categoria === 'Académico' ? 'bi bi-book' : 
              'bi bi-info-circle'
            }`}></i>
            {anuncio.categoria}
          </span>
          <div className="text-muted me-auto mb-2">
            <i className="bi bi-clock me-1"></i>
            Publicado el {anuncio.fecha}
          </div>
          {anuncio.destacado && (
            <span className="badge bg-warning text-dark ms-2 mb-2">
              <i className="bi bi-star-fill me-1"></i>
              Destacado
            </span>
          )}
          {anuncioExpirado(anuncio) && (
            <span className="badge bg-secondary ms-2 mb-2">
              <i className="bi bi-calendar-x me-1"></i>
              Expirado
            </span>
          )}
          
          {/* Botones de compartir */}
          <div className="ms-2 mb-2">
            <ShareButtons 
              titulo={anuncio.titulo}
              url={window.location.href}
            />
          </div>
        </div>
        
        <div className="bg-light p-4 rounded mb-4">
          <p className="card-text mb-0" style={{ lineHeight: '1.7' }}>{anuncio.contenido}</p>
        </div>
        
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle fs-4 me-2"></i>
          <p className="mb-0">
            <strong>Autor:</strong> {anuncio.autor}
          </p>
        </div>
        
        {anuncio.fechaExpiracion && (
          <div className="d-flex align-items-center mt-3">
            <i className="bi bi-calendar fs-4 me-2"></i>
            <p className="mb-0">
              <strong>Fecha de expiración:</strong> {anuncio.fechaExpiracion}
              {anuncioExpirado(anuncio) && (
                <span className="text-danger ms-2">(Anuncio expirado)</span>
              )}
            </p>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <button className="btn btn-secondary me-2" onClick={volver}>
              Volver
            </button>
            <Link to="/" className="btn btn-primary">
              Ir al Inicio
            </Link>
          </div>
          <div className="col-md-6 text-md-end">
            {isAdmin && (
              <>
                <button 
                  className="btn btn-warning me-2"
                  onClick={handleToggleDestacado}
                >
                  {anuncio.destacado ? 'Quitar de destacados' : 'Destacar anuncio'}
                </button>
                
                <Link to={`/editar/${id}`} className="btn btn-primary me-2">
                  <i className="bi bi-pencil me-1"></i>
                  Editar
                </Link>
                
                {!mostrarConfirmacion ? (
                  <button 
                    className="btn btn-danger" 
                    onClick={() => setMostrarConfirmacion(true)}
                  >
                    Eliminar
                  </button>
                ) : (
                  <div className="mt-2 p-2 bg-light rounded">
                    <p className="mb-2">¿Estás seguro de eliminar este anuncio?</p>
                    <button 
                      className="btn btn-danger btn-sm me-2" 
                      onClick={handleEliminar}
                    >
                      Sí, eliminar
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => setMostrarConfirmacion(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnuncioDetalle;