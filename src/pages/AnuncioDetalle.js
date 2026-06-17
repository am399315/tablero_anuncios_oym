// src/pages/AnuncioDetalle.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerAnuncioPorId, eliminarAnuncio, toggleDestacado, anuncioExpirado } from '../data/anuncios';
import ShareButtons from '../components/ShareButtons';
import { isAuthenticated } from '../services/AuthService';

const CAT_CONFIG = {
  Informativo:    { icon: 'bi-info-circle-fill', cls: 'badge-cat-informativo' },
  Evento:         { icon: 'bi-calendar-event-fill', cls: 'badge-cat-evento' },
  Administrativo: { icon: 'bi-building-fill', cls: 'badge-cat-administrativo' },
  Académico:      { icon: 'bi-book-fill', cls: 'badge-cat-academico' },
};

function getCatConfig(cat) {
  return CAT_CONFIG[cat] || { icon: 'bi-tag-fill', cls: 'badge-cat-informativo' };
}

function AnuncioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anuncio, setAnuncio] = useState(null);
  const [error, setError]     = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAuthenticated());
    const found = obtenerAnuncioPorId(id);
    if (found) {
      setAnuncio(found);
      setError(false);
    } else {
      setError(true);
    }
  }, [id]);

  const handleEliminar = () => {
    if (eliminarAnuncio(id)) navigate('/', { replace: true });
  };

  const handleToggleDestacado = () => {
    const updated = toggleDestacado(id);
    if (updated) setAnuncio(updated);
  };

  if (error) {
    return (
      <div className="card text-center py-5 px-4">
        <div className="empty-icon mb-3" style={{ fontSize: '4rem', opacity: 0.4 }}>
          <i className="bi bi-file-earmark-x"></i>
        </div>
        <h3 style={{ color: 'var(--text-secondary)' }}>Anuncio no encontrado</h3>
        <p className="text-muted mb-4">El anuncio que buscas no existe o ha sido eliminado.</p>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i>Volver
          </button>
          <Link to="/" className="btn btn-primary">Ir al Inicio</Link>
        </div>
      </div>
    );
  }

  if (!anuncio) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando…</span>
        </div>
        <p className="mt-3 text-muted">Cargando anuncio…</p>
      </div>
    );
  }

  const { icon, cls } = getCatConfig(anuncio.categoria);
  const expirado = anuncioExpirado(anuncio);

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="bi bi-house me-1"></i>Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Detalle de anuncio
          </li>
        </ol>
      </nav>

      <div className={`card shadow-sm${expirado ? ' border-secondary' : ''}`} style={{ opacity: expirado ? 0.9 : 1 }}>
        {/* Card header — category & meta */}
        <div className="card-header py-3" style={{ background: 'var(--surface-alt)' }}>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className={`badge-cat ${cls}`} style={{ fontSize: '0.82rem', padding: '0.4em 0.9em' }}>
                <i className={`bi ${icon}`}></i>
                {anuncio.categoria}
              </span>
              {anuncio.destacado && (
                <span className="badge" style={{ background: 'linear-gradient(135deg, var(--oym-accent), #C88A0A)', color: '#fff' }}>
                  <i className="bi bi-star-fill me-1"></i>Destacado
                </span>
              )}
              {expirado && (
                <span className="badge bg-secondary">
                  <i className="bi bi-calendar-x me-1"></i>Expirado
                </span>
              )}
            </div>
            <ShareButtons titulo={anuncio.titulo} url={window.location.href} />
          </div>
        </div>

        <div className="card-body p-4">
          {/* Title */}
          <h2 className="mb-3">{anuncio.titulo}</h2>

          {/* Meta info */}
          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap"
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>
              <i className="bi bi-clock me-1"></i>
              Publicado el {anuncio.fecha}
            </span>
            <span>
              <i className="bi bi-person-circle me-1"></i>
              {anuncio.autor}
            </span>
            {anuncio.fechaExpiracion && (
              <span className={expirado ? 'text-danger' : ''}>
                <i className="bi bi-calendar-event me-1"></i>
                Expira: {anuncio.fechaExpiracion}
                {expirado && <strong className="ms-1">(Expirado)</strong>}
              </span>
            )}
          </div>

          {/* Content */}
          <div
            className="p-4 rounded mb-0"
            style={{
              background: 'var(--surface-alt)',
              borderLeft: '4px solid var(--oym-secondary)',
              lineHeight: 1.8,
              fontSize: '0.975rem',
              color: 'var(--text-primary)',
            }}
          >
            {anuncio.contenido}
          </div>
        </div>

        {/* Footer — navigation & admin actions */}
        <div className="card-footer">
          <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center justify-content-between">
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-1"></i>Volver
              </button>
              <Link to="/" className="btn btn-primary btn-sm">
                <i className="bi bi-house me-1"></i>Inicio
              </Link>
            </div>

            {isAdmin && (
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-sm btn-outline-warning" onClick={handleToggleDestacado}>
                  <i className={`bi ${anuncio.destacado ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                  {anuncio.destacado ? 'Quitar destacado' : 'Destacar'}
                </button>
                <Link to={`/editar/${id}`} className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-pencil me-1"></i>Editar
                </Link>
                {!confirmDelete ? (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmDelete(true)}>
                    <i className="bi bi-trash me-1"></i>Eliminar
                  </button>
                ) : (
                  <div className="d-flex align-items-center gap-2 p-2 rounded"
                    style={{ background: 'rgba(220,53,69,.08)', border: '1px solid rgba(220,53,69,.25)' }}>
                    <small className="text-danger fw-semibold">¿Eliminar?</small>
                    <button className="btn btn-danger btn-sm" onClick={handleEliminar}>
                      Sí
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setConfirmDelete(false)}>
                      No
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnuncioDetalle;
