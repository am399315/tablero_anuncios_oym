// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerAnuncios, eliminarAnuncio, anuncioExpirado } from '../data/anuncios';
import ShareButtons from '../components/ShareButtons';
import { updateLastVisit, isNewAnnouncement } from '../services/NotificationService';
import { isAuthenticated } from '../services/AuthService';

const CATEGORIAS = ['Informativo', 'Evento', 'Administrativo', 'Académico'];

const CAT_CONFIG = {
  Informativo:   { icon: 'bi-info-circle-fill', cls: 'badge-cat-informativo' },
  Evento:        { icon: 'bi-calendar-event-fill', cls: 'badge-cat-evento' },
  Administrativo:{ icon: 'bi-building-fill', cls: 'badge-cat-administrativo' },
  Académico:     { icon: 'bi-book-fill', cls: 'badge-cat-academico' },
};

function getCatConfig(cat) {
  return CAT_CONFIG[cat] || { icon: 'bi-tag-fill', cls: 'badge-cat-informativo' };
}

function CategoryBadge({ categoria, size = '' }) {
  const { icon, cls } = getCatConfig(categoria);
  return (
    <span className={`badge-cat ${cls}`} style={size === 'lg' ? { fontSize: '0.8rem', padding: '0.4em 0.85em' } : {}}>
      <i className={`bi ${icon}`}></i>
      {categoria}
    </span>
  );
}

function Home() {
  const [anuncios, setAnuncios] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [anuncioAEliminar, setAnuncioAEliminar] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('recientes');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAuthenticated());
    setAnuncios(obtenerAnuncios());
    updateLastVisit();
  }, []);

  const handleEliminarAnuncio = (id) => {
    eliminarAnuncio(id);
    setAnuncios(obtenerAnuncios());
    setAnuncioAEliminar(null);
  };

  const limpiarFiltros = () => {
    setTerminoBusqueda('');
    setFiltroCategoria('');
  };

  const ordenarAnuncios = (lista) => {
    switch (ordenamiento) {
      case 'recientes':  return [...lista].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      case 'antiguos':   return [...lista].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      case 'alfabetico': return [...lista].sort((a, b) => a.titulo.localeCompare(b.titulo));
      case 'categoria':  return [...lista].sort((a, b) => a.categoria.localeCompare(b.categoria));
      default:           return lista;
    }
  };

  const anunciosFiltrados = anuncios.filter(a => {
    const coincideCategoria = filtroCategoria ? a.categoria === filtroCategoria : true;
    const coincideBusqueda  = terminoBusqueda
      ? a.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        a.contenido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        a.autor.toLowerCase().includes(terminoBusqueda.toLowerCase())
      : true;
    return coincideCategoria && coincideBusqueda;
  });

  const anunciosOrdenados  = ordenarAnuncios(anunciosFiltrados);
  const anunciosDestacados = anunciosOrdenados.filter(a => a.destacado === true);
  const anunciosNormales   = anunciosOrdenados.filter(a => a.destacado !== true);

  const hayFiltroActivo = terminoBusqueda || filtroCategoria;

  const ordenLabels = {
    recientes:  'Más recientes',
    antiguos:   'Más antiguos',
    alfabetico: 'A–Z',
    categoria:  'Categoría',
  };

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div className="hero-banner">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-megaphone-fill" style={{ color: 'var(--oym-accent)', fontSize: '1.4rem' }}></i>
              <span style={{ color: 'rgba(255,255,255,.65)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Universidad OyM
              </span>
            </div>
            <h1 className="mb-2">Tablero de Anuncios</h1>
            <p className="lead">
              Mantente informado sobre todos los eventos, noticias y comunicados
              importantes de la comunidad universitaria.
            </p>
          </div>
          <div className="col-md-4 hero-actions text-md-end mt-3 mt-md-0">
            {anuncios.length > 0 && (
              <div className="d-flex justify-content-md-end gap-3 mb-3">
                <div className="text-center" style={{ color: 'rgba(255,255,255,.80)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, color: '#fff' }}>
                    {anuncios.length}
                  </div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>ANUNCIOS</div>
                </div>
                <div className="text-center" style={{ color: 'rgba(255,255,255,.80)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, color: 'var(--oym-accent)' }}>
                    {anuncios.filter(a => a.destacado).length}
                  </div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>DESTACADOS</div>
                </div>
              </div>
            )}
            {isAdmin && (
              <Link
                to="/crear"
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, var(--oym-accent) 0%, #C88A0A 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '0.6rem 1.4rem',
                  boxShadow: 'var(--shadow-accent)',
                  borderRadius: 'var(--r-lg)',
                }}
              >
                <i className="bi bi-plus-circle-fill me-2"></i>
                Nuevo Anuncio
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="card filter-card mb-4">
        <div className="card-body">
          {/* Search row */}
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por título, contenido o autor..."
                  value={terminoBusqueda}
                  onChange={e => setTerminoBusqueda(e.target.value)}
                />
                {terminoBusqueda && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setTerminoBusqueda('')}
                    title="Limpiar búsqueda"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-5 d-flex justify-content-md-end gap-2 flex-wrap">
              {hayFiltroActivo && (
                <button className="btn btn-outline-secondary btn-sm" onClick={limpiarFiltros}>
                  <i className="bi bi-funnel-fill me-1"></i>
                  Limpiar
                </button>
              )}
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-sort-down me-1"></i>
                  {ordenLabels[ordenamiento]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {Object.entries(ordenLabels).map(([key, label]) => (
                    <li key={key}>
                      <button
                        className={`dropdown-item${ordenamiento === key ? ' active' : ''}`}
                        onClick={() => setOrdenamiento(key)}
                      >
                        <i className={`bi me-2 ${
                          key === 'recientes'  ? 'bi-calendar-check' :
                          key === 'antiguos'   ? 'bi-calendar' :
                          key === 'alfabetico' ? 'bi-sort-alpha-down' :
                                                 'bi-tags'
                        }`}></i>
                        {key === 'recientes'  ? 'Más recientes primero' :
                         key === 'antiguos'   ? 'Más antiguos primero' :
                         key === 'alfabetico' ? 'Alfabéticamente (A–Z)' :
                                                'Por categoría'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="filter-pills">
            <button
              className={`filter-pill${!filtroCategoria ? ' active' : ''}`}
              onClick={() => setFiltroCategoria('')}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
              Todos
            </button>
            {CATEGORIAS.map(cat => {
              const { icon } = getCatConfig(cat);
              return (
                <button
                  key={cat}
                  className={`filter-pill${filtroCategoria === cat ? ' active' : ''}`}
                  onClick={() => setFiltroCategoria(cat)}
                >
                  <i className={`bi ${icon}`}></i>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active filter info ── */}
      {(hayFiltroActivo || ordenamiento !== 'recientes') && (
        <div className="alert alert-info d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-funnel-fill fs-5 flex-shrink-0"></i>
          <div>
            {filtroCategoria && !terminoBusqueda && (
              <span>Categoría: <strong>{filtroCategoria}</strong></span>
            )}
            {terminoBusqueda && !filtroCategoria && (
              <span>Búsqueda: <strong>"{terminoBusqueda}"</strong></span>
            )}
            {filtroCategoria && terminoBusqueda && (
              <span>
                <strong>"{terminoBusqueda}"</strong> en <strong>{filtroCategoria}</strong>
              </span>
            )}
            {ordenamiento !== 'recientes' && (
              <span>
                {hayFiltroActivo ? ' · ' : ''}
                Orden: <strong>{ordenLabels[ordenamiento]}</strong>
              </span>
            )}
            <span className="ms-2 text-muted">
              ({anunciosOrdenados.length} {anunciosOrdenados.length === 1 ? 'resultado' : 'resultados'})
            </span>
          </div>
        </div>
      )}

      {/* ── Featured announcements ── */}
      {!hayFiltroActivo && anunciosDestacados.length > 0 && (
        <section className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-star-fill" style={{ color: 'var(--oym-accent)', fontSize: '1.1rem' }}></i>
            <h3 className="mb-0" style={{ fontSize: '1.1rem' }}>Anuncios Destacados</h3>
          </div>
          <div className="row card-grid">
            {anunciosDestacados.map(anuncio => (
              <div key={`dest-${anuncio.id}`} className="col-md-6 mb-4">
                <div className={`card destacado h-100${anuncioExpirado(anuncio) ? ' border-secondary' : ''}${isNewAnnouncement(anuncio) ? ' new-announcement' : ''}`}
                  style={{ opacity: anuncioExpirado(anuncio) ? 0.78 : 1 }}>
                  <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <CategoryBadge categoria={anuncio.categoria} />
                      {anuncioExpirado(anuncio) && (
                        <span className="badge bg-secondary">
                          <i className="bi bi-calendar-x me-1"></i>Expirado
                        </span>
                      )}
                      {isNewAnnouncement(anuncio) && (
                        <span className="badge bg-success new-badge">
                          <i className="bi bi-bell-fill me-1"></i>Nuevo
                        </span>
                      )}
                    </div>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, var(--oym-accent), #C88A0A)', color: '#fff' }}>
                      <i className="bi bi-star-fill me-1"></i>Destacado
                    </span>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{anuncio.titulo}</h5>
                    <p className="card-text">
                      {anuncio.contenido.length > 160
                        ? `${anuncio.contenido.substring(0, 160)}…`
                        : anuncio.contenido}
                    </p>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      <i className="bi bi-clock me-1"></i>{anuncio.fecha}
                    </small>
                    <div className="d-flex gap-1 flex-wrap">
                      <ShareButtons titulo={anuncio.titulo} url={`${window.location.origin}/anuncio/${anuncio.id}`} />
                      {isAdmin && (
                        <Link to={`/editar/${anuncio.id}`} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </Link>
                      )}
                      <Link to={`/anuncio/${anuncio.id}`} className="btn btn-sm btn-warning">
                        Leer más <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {anunciosNormales.length > 0 && (
            <div className="section-divider">
              <span><i className="bi bi-grid-3x3-gap me-2"></i>Todos los anuncios</span>
            </div>
          )}
        </section>
      )}

      {/* ── Announcement grid ── */}
      {anunciosOrdenados.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">
              <i className="bi bi-search"></i>
            </div>
            <h3>Sin resultados</h3>
            <p>
              {hayFiltroActivo
                ? 'No se encontraron anuncios con los criterios actuales.'
                : 'Aún no hay anuncios publicados.'}
            </p>
            {hayFiltroActivo && (
              <button className="btn btn-primary" onClick={limpiarFiltros}>
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Ver todos los anuncios
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="row card-grid">
          {(hayFiltroActivo ? anunciosOrdenados : anunciosNormales).map(anuncio => (
            <div key={anuncio.id} className="col-md-6 col-lg-4 mb-4">
              <div
                className={`card h-100${anuncioExpirado(anuncio) ? ' border-secondary' : ''}${isNewAnnouncement(anuncio) ? ' new-announcement' : ''}`}
                style={{ opacity: anuncioExpirado(anuncio) ? 0.78 : 1 }}
              >
                <div className="card-body d-flex flex-column">
                  {/* Meta row */}
                  <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-1">
                    <CategoryBadge categoria={anuncio.categoria} />
                    <div className="d-flex align-items-center gap-1">
                      {anuncioExpirado(anuncio) && (
                        <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>
                          <i className="bi bi-calendar-x me-1"></i>Expirado
                        </span>
                      )}
                      {isNewAnnouncement(anuncio) && (
                        <span className="badge bg-success new-badge" style={{ fontSize: '0.65rem' }}>
                          <i className="bi bi-bell-fill me-1"></i>Nuevo
                        </span>
                      )}
                    </div>
                  </div>

                  <h5 className="card-title">{anuncio.titulo}</h5>
                  <p className="card-text flex-grow-1">
                    {anuncio.contenido.length > 110
                      ? `${anuncio.contenido.substring(0, 110)}…`
                      : anuncio.contenido}
                  </p>

                  <div className="mt-auto pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
                      <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        <i className="bi bi-person me-1"></i>{anuncio.autor}
                      </small>
                      <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {anuncio.fecha}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="card-footer d-flex gap-1 flex-wrap">
                  <Link to={`/anuncio/${anuncio.id}`} className="btn btn-sm btn-outline-primary me-auto">
                    Leer más
                  </Link>
                  <ShareButtons titulo={anuncio.titulo} url={`${window.location.origin}/anuncio/${anuncio.id}`} />
                  {isAdmin && (
                    <>
                      <Link to={`/editar/${anuncio.id}`} className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setAnuncioAEliminar(anuncio.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete confirmation modal ── */}
      {anuncioAEliminar && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,.55)' }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Confirmar eliminación
                </h5>
                <button type="button" className="btn-close" onClick={() => setAnuncioAEliminar(null)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-1">¿Estás seguro de que deseas eliminar este anuncio?</p>
                <p className="text-danger mb-0" style={{ fontSize: '0.875rem' }}>
                  <i className="bi bi-exclamation-circle me-1"></i>
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setAnuncioAEliminar(null)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleEliminarAnuncio(anuncioAEliminar)}>
                  <i className="bi bi-trash-fill me-1"></i>
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
