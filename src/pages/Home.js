// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerAnuncios, eliminarAnuncio, anuncioExpirado } from '../data/anuncios';
import ShareButtons from '../components/ShareButtons';
import { updateLastVisit, isNewAnnouncement } from '../services/NotificationService';
import { isAuthenticated } from '../services/AuthService';

function Home() {
  // Estado para almacenar la lista de anuncios
  const [anuncios, setAnuncios] = useState([]);
  // Estado para almacenar el filtro de categoría
  const [filtroCategoria, setFiltroCategoria] = useState('');
  // Estado para almacenar el ID del anuncio a eliminar (para confirmación)
  const [anuncioAEliminar, setAnuncioAEliminar] = useState(null);
  // Estado para almacenar el término de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  // Estado para criterio de ordenamiento
  const [ordenamiento, setOrdenamiento] = useState('recientes');
  // Estado para verificar si el usuario es administrador
  const [isAdmin, setIsAdmin] = useState(false);

  // Cargar anuncios cuando el componente se monta
  useEffect(() => {
    // Verificar si el usuario es administrador
    setIsAdmin(isAuthenticated());
    
    // Obtenemos los anuncios de nuestro "backend" simulado
    const listaAnuncios = obtenerAnuncios();
    setAnuncios(listaAnuncios);
    
    // Actualizar la fecha de última visita
    updateLastVisit();
  }, []);
  
  // Función para manejar la eliminación de un anuncio
  const handleEliminarAnuncio = (id) => {
    eliminarAnuncio(id);
    // Actualizar la lista de anuncios después de eliminar
    setAnuncios(obtenerAnuncios());
    // Cerrar el diálogo de confirmación
    setAnuncioAEliminar(null);
  };

  // Función para manejar la búsqueda
  const handleBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  // Función para limpiar los filtros
  const limpiarFiltros = () => {
    setTerminoBusqueda('');
    setFiltroCategoria('');
    // Mantenemos el ordenamiento actual
  };

  // Función para ordenar los anuncios según el criterio seleccionado
  const ordenarAnuncios = (listaAnuncios) => {
    switch (ordenamiento) {
      case 'recientes':
        return [...listaAnuncios].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      case 'antiguos':
        return [...listaAnuncios].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      case 'alfabetico':
        return [...listaAnuncios].sort((a, b) => a.titulo.localeCompare(b.titulo));
      case 'categoria':
        return [...listaAnuncios].sort((a, b) => a.categoria.localeCompare(b.categoria));
      default:
        return listaAnuncios;
    }
  };

  // Lista de categorías únicas para el filtro
  const categorias = [...new Set(anuncios.map(anuncio => anuncio.categoria))];

  // Función para filtrar anuncios por categoría y término de búsqueda
  const anunciosFiltrados = anuncios.filter(anuncio => {
    // Primero filtramos por categoría si hay un filtro seleccionado
    const coincideCategoria = filtroCategoria 
      ? anuncio.categoria === filtroCategoria
      : true;
    
    // Luego filtramos por término de búsqueda si hay uno
    const coincideBusqueda = terminoBusqueda 
      ? anuncio.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
        anuncio.contenido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        anuncio.autor.toLowerCase().includes(terminoBusqueda.toLowerCase())
      : true;
    
    // El anuncio debe cumplir ambas condiciones
    return coincideCategoria && coincideBusqueda;
  });

  // Aplicar ordenamiento a los anuncios filtrados
  const anunciosOrdenados = ordenarAnuncios(anunciosFiltrados);

  // Separamos los anuncios destacados y no destacados
  const anunciosDestacados = anunciosOrdenados.filter(anuncio => anuncio.destacado === true);
  const anunciosNoDestacados = anunciosOrdenados.filter(anuncio => anuncio.destacado !== true);

  return (
    <div>
      {/* Banner principal */}
      <div className="mb-4 rounded shadow-sm p-4" 
           style={{ 
             backgroundImage: 'linear-gradient(135deg, rgba(0,51,102,0.95) 0%, rgba(0,31,63,0.9) 100%)',
             borderRadius: '12px',
             color: 'white'
           }}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="mb-2" style={{ color: 'white' }}>Tablero de Anuncios</h1>
            <p className="lead mb-0">
              Mantente informado sobre todos los eventos, noticias y anuncios importantes
              de la Universidad OyM en un solo lugar.
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            {isAdmin && (
              <Link to="/crear" className="btn" style={{ 
                backgroundColor: '#E4A11B', 
                color: 'white',
                fontWeight: '600',
                padding: '0.6rem 1.2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo Anuncio
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Buscar anuncios por título, contenido o autor..."
                    value={terminoBusqueda}
                    onChange={handleBusqueda}
                  />
                  {terminoBusqueda && (
                    <button
                      className="btn btn-outline-secondary border-start-0"
                      type="button"
                      onClick={() => setTerminoBusqueda('')}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-md-end flex-wrap">
                  {(terminoBusqueda || filtroCategoria) && (
                    <button
                      className="btn btn-outline-secondary me-2 mb-2 mb-md-0"
                      onClick={limpiarFiltros}
                    >
                      <i className="bi bi-funnel-fill me-1"></i>
                      Limpiar filtros
                    </button>
                  )}
                  
                  {/* Dropdown para ordenamiento */}
                  <div className="dropdown me-2">
                    <button 
                      className="btn btn-outline-success dropdown-toggle" 
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-sort-down me-1"></i>
                      Ordenar por
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button 
                          className={`dropdown-item ${ordenamiento === 'recientes' ? 'active' : ''}`} 
                          onClick={() => setOrdenamiento('recientes')}
                        >
                          <i className="bi bi-calendar-check me-2"></i>
                          Más recientes primero
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`dropdown-item ${ordenamiento === 'antiguos' ? 'active' : ''}`} 
                          onClick={() => setOrdenamiento('antiguos')}
                        >
                          <i className="bi bi-calendar me-2"></i>
                          Más antiguos primero
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`dropdown-item ${ordenamiento === 'alfabetico' ? 'active' : ''}`} 
                          onClick={() => setOrdenamiento('alfabetico')}
                        >
                          <i className="bi bi-sort-alpha-down me-2"></i>
                          Alfabéticamente (A-Z)
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`dropdown-item ${ordenamiento === 'categoria' ? 'active' : ''}`} 
                          onClick={() => setOrdenamiento('categoria')}
                        >
                          <i className="bi bi-tags me-2"></i>
                          Por categoría
                        </button>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Dropdown para filtrar por categoría */}
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-primary dropdown-toggle" 
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-funnel me-1"></i>
                      Filtrar por categoría
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button 
                          className={`dropdown-item ${!filtroCategoria ? 'active' : ''}`} 
                          onClick={() => setFiltroCategoria('')}
                        >
                          Todos
                        </button>
                      </li>
                      {categorias.map(categoria => (
                        <li key={categoria}>
                          <button 
                            className={`dropdown-item ${filtroCategoria === categoria ? 'active' : ''}`} 
                            onClick={() => setFiltroCategoria(categoria)}
                          >
                            {categoria}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar resultados de búsqueda o filtrado */}
      {(terminoBusqueda || filtroCategoria || ordenamiento !== 'recientes') && (
        <div className="alert alert-info mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-info-circle me-2 fs-5"></i>
            <div>
              {(filtroCategoria || terminoBusqueda) && (
                <span>
                  {filtroCategoria && !terminoBusqueda && (
                    <span>Mostrando anuncios de la categoría <strong>{filtroCategoria}</strong></span>
                  )}
                  {terminoBusqueda && !filtroCategoria && (
                    <span>Resultados de búsqueda para: <strong>"{terminoBusqueda}"</strong></span>
                  )}
                  {filtroCategoria && terminoBusqueda && (
                    <span>
                      Resultados de búsqueda para <strong>"{terminoBusqueda}"</strong> en la categoría <strong>{filtroCategoria}</strong>
                    </span>
                  )}
                </span>
              )}
              
              {/* Mostrar el criterio de ordenamiento */}
              {ordenamiento !== 'recientes' && (
                <span>
                  {(filtroCategoria || terminoBusqueda) ? ' • ' : ''}
                  Ordenados por: <strong>
                    {ordenamiento === 'antiguos' && 'Más antiguos primero'}
                    {ordenamiento === 'alfabetico' && 'Alfabéticamente (A-Z)'}
                    {ordenamiento === 'categoria' && 'Categoría'}
                  </strong>
                </span>
              )}
              
              <span className="ms-2">({anunciosOrdenados.length} {anunciosOrdenados.length === 1 ? 'anuncio' : 'anuncios'})</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Sección de anuncios destacados (solo si no hay búsqueda activa) */}
      {!terminoBusqueda && !filtroCategoria && anunciosDestacados.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-3">
            <i className="bi bi-star-fill text-warning me-2"></i>
            Anuncios Destacados
          </h3>
          <div className="row">
            {anunciosDestacados.map(anuncio => (
              <div key={`destacado-${anuncio.id}`} className="col-md-6 mb-4">
                <div className={`card h-100 border-warning ${anuncioExpirado(anuncio) ? 'border-secondary' : ''} ${isNewAnnouncement(anuncio) ? 'border-success new-announcement' : ''}`} style={{ 
                  borderWidth: '2px',
                  opacity: anuncioExpirado(anuncio) ? 0.8 : 1
                }}>
                  <div className="card-header bg-warning bg-opacity-10 d-flex justify-content-between align-items-center">
                    <span className="badge" style={{ 
                      backgroundColor: anuncio.categoria === 'Evento' ? '#6B9AC4' : 
                                      anuncio.categoria === 'Administrativo' ? '#003366' : 
                                      anuncio.categoria === 'Académico' ? '#E4A11B' : 
                                      '#6c757d'
                    }}>
                      <i className={`me-1 ${
                        anuncio.categoria === 'Evento' ? 'bi bi-calendar-event' : 
                        anuncio.categoria === 'Administrativo' ? 'bi bi-building' : 
                        anuncio.categoria === 'Académico' ? 'bi bi-book' : 
                        'bi bi-info-circle'
                      }`}></i>
                      {anuncio.categoria}
                    </span>
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-star-fill me-1"></i>
                      Destacado
                    </span>
                    {anuncioExpirado(anuncio) && (
                      <span className="badge bg-secondary ms-2">
                        <i className="bi bi-calendar-x me-1"></i>
                        Expirado
                      </span>
                    )}
                    {isNewAnnouncement(anuncio) && (
                      <span className="badge bg-success ms-2 new-badge">
                        <i className="bi bi-bell-fill me-1"></i>
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{anuncio.titulo}</h5>
                    <p className="card-text">
                      {anuncio.contenido.length > 150
                        ? `${anuncio.contenido.substring(0, 150)}...`
                        : anuncio.contenido}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                    <small className="text-muted">Publicado: {anuncio.fecha}</small>
                    <div className="d-flex">
                      <ShareButtons 
                        titulo={anuncio.titulo}
                        url={`${window.location.origin}/anuncio/${anuncio.id}`}
                      />
                      {isAdmin && (
                        <Link to={`/editar/${anuncio.id}`} className="btn btn-sm btn-outline-secondary mx-1">
                          <i className="bi bi-pencil"></i>
                        </Link>
                      )}
                      <Link to={`/anuncio/${anuncio.id}`} className="btn btn-sm btn-warning">
                        Leer más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Separador */}
          {anunciosNoDestacados.length > 0 && (
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <h3 className="mx-3 mb-0">Todos los anuncios</h3>
              <hr className="flex-grow-1" />
            </div>
          )}
        </div>
      )}

      {/* Lista de anuncios normales */}
      {anunciosOrdenados.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-search display-1 text-muted mb-3"></i>
            <h3>No se encontraron anuncios</h3>
            <p className="text-muted mb-4">
              {(terminoBusqueda || filtroCategoria) ? (
                <>No hay anuncios que coincidan con los criterios de búsqueda.</>
              ) : (
                <>Aún no hay anuncios publicados.</>
              )}
            </p>
            {(terminoBusqueda || filtroCategoria) && (
              <button 
                className="btn btn-primary"
                onClick={limpiarFiltros}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Mostrar todos los anuncios
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="row">
          {/* Si hay búsqueda o filtro activo, mostrar todos los resultados */}
          {/* Si no hay búsqueda ni filtro, y hay destacados, mostrar solo los no destacados */}
          {(terminoBusqueda || filtroCategoria 
            ? anunciosOrdenados 
            : anunciosNoDestacados).map(anuncio => (
            <div key={anuncio.id} className="col-md-6 col-lg-4 mb-4">
              <div className={`card h-100 ${anuncioExpirado(anuncio) ? 'border-secondary' : ''} ${isNewAnnouncement(anuncio) ? 'border-success new-announcement' : ''}`} style={{
                opacity: anuncioExpirado(anuncio) ? 0.8 : 1
              }}>
                <div className="card-body">
                  {/* Categoría con icono */}
                  <div className="mb-2 d-flex align-items-center">
                    <span className="badge" style={{ 
                      backgroundColor: anuncio.categoria === 'Evento' ? '#6B9AC4' : 
                                      anuncio.categoria === 'Administrativo' ? '#003366' : 
                                      anuncio.categoria === 'Académico' ? '#E4A11B' : 
                                      '#6c757d'
                    }}>
                      {/* Icono según categoría */}
                      <i className={`me-1 ${
                        anuncio.categoria === 'Evento' ? 'bi bi-calendar-event' : 
                        anuncio.categoria === 'Administrativo' ? 'bi bi-building' : 
                        anuncio.categoria === 'Académico' ? 'bi bi-book' : 
                        'bi bi-info-circle'
                      }`}></i>
                      {anuncio.categoria}
                    </span>
                    <small className="text-muted ms-2">{anuncio.fecha}</small>
                    
                    {/* Indicador de expiración */}
                    {anuncioExpirado(anuncio) && (
                      <span className="badge bg-secondary ms-2">
                        <i className="bi bi-calendar-x me-1"></i>
                        Expirado
                      </span>
                    )}
                    
                    {/* Indicador de anuncio nuevo */}
                    {isNewAnnouncement(anuncio) && (
                      <span className="badge bg-success ms-2 new-badge">
                        <i className="bi bi-bell-fill me-1"></i>
                        Nuevo
                      </span>
                    )}
                  </div>
                  
                  <h5 className="card-title">{anuncio.titulo}</h5>
                  <p className="card-text">
                    {anuncio.contenido.length > 100
                      ? `${anuncio.contenido.substring(0, 100)}...`
                      : anuncio.contenido}
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <p className="text-muted mb-2">Publicado por: {anuncio.autor}</p>
                  <div className="d-flex flex-wrap">
                    <Link to={`/anuncio/${anuncio.id}`} className="btn btn-sm btn-outline-primary me-1 mb-1">
                      Leer más
                    </Link>
                    <ShareButtons 
                      titulo={anuncio.titulo}
                      url={`${window.location.origin}/anuncio/${anuncio.id}`}
                    />
                    {isAdmin && (
                      <>
                        <Link to={`/editar/${anuncio.id}`} className="btn btn-sm btn-outline-secondary mx-1 mb-1">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button 
                          className="btn btn-sm btn-outline-danger mb-1"
                          onClick={() => setAnuncioAEliminar(anuncio.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modal de confirmación para eliminar */}
      {anuncioAEliminar && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setAnuncioAEliminar(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este anuncio?</p>
                <p className="text-danger">Esta acción no se puede deshacer.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setAnuncioAEliminar(null)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => handleEliminarAnuncio(anuncioAEliminar)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;