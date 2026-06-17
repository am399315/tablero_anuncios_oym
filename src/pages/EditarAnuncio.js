// src/pages/EditarAnuncio.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerAnuncioPorId, editarAnuncio } from '../data/anuncios';

const CATEGORIAS = ['Informativo', 'Evento', 'Administrativo', 'Académico'];

const CAT_ICONS = {
  Informativo:    'bi-info-circle-fill',
  Evento:         'bi-calendar-event-fill',
  Administrativo: 'bi-building-fill',
  Académico:      'bi-book-fill',
};

function EditarAnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo:          '',
    contenido:       '',
    autor:           '',
    categoria:       '',
    destacado:       false,
    fechaExpiracion: '',
  });

  const [errores, setErrores]               = useState({});
  const [noEncontrado, setNoEncontrado]     = useState(false);

  useEffect(() => {
    const anuncio = obtenerAnuncioPorId(id);
    if (anuncio) {
      setFormData({
        titulo:          anuncio.titulo,
        contenido:       anuncio.contenido,
        autor:           anuncio.autor,
        categoria:       anuncio.categoria,
        destacado:       anuncio.destacado || false,
        fechaExpiracion: anuncio.fechaExpiracion || '',
      });
    } else {
      setNoEncontrado(true);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }));
  };

  const validar = () => {
    const errs = {};
    if (!formData.titulo.trim())    errs.titulo    = 'El título es obligatorio.';
    if (!formData.contenido.trim()) errs.contenido = 'El contenido es obligatorio.';
    if (!formData.autor.trim())     errs.autor     = 'El autor es obligatorio.';
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      const actualizado = editarAnuncio(id, formData);
      if (actualizado) navigate(`/anuncio/${id}`);
    }
  };

  if (noEncontrado) {
    return (
      <div className="card text-center py-5 px-4">
        <div style={{ fontSize: '4rem', opacity: 0.35 }} className="mb-3">
          <i className="bi bi-file-earmark-x"></i>
        </div>
        <h3 style={{ color: 'var(--text-secondary)' }}>Anuncio no encontrado</h3>
        <p className="text-muted mb-4">El anuncio que intentas editar no existe o ha sido eliminado.</p>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i>Volver
          </button>
          <Link to="/" className="btn btn-primary">Ir al Inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="bi bi-house me-1"></i>Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/anuncio/${id}`}>Detalle</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Editar</li>
        </ol>
      </nav>

      {/* Page header */}
      <div className="page-header mb-4">
        <h2>
          <i className="bi bi-pencil-square me-2"></i>
          Editar Anuncio
        </h2>
        <p>Modifica la información del anuncio seleccionado.</p>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>

            {/* Título */}
            <div className="mb-4">
              <label htmlFor="titulo" className="form-label">
                <i className="bi bi-type-h1 me-2 text-oym-secondary"></i>Título
              </label>
              <input
                type="text"
                className={`form-control form-control-lg${errores.titulo ? ' is-invalid' : ''}`}
                id="titulo"
                name="titulo"
                placeholder="Escribe un título claro y conciso"
                value={formData.titulo}
                onChange={handleChange}
                maxLength={120}
              />
              <div className="d-flex justify-content-between">
                {errores.titulo
                  ? <div className="invalid-feedback d-block">{errores.titulo}</div>
                  : <span />}
                <small className="form-text text-end">{formData.titulo.length}/120</small>
              </div>
            </div>

            {/* Contenido */}
            <div className="mb-4">
              <label htmlFor="contenido" className="form-label">
                <i className="bi bi-text-paragraph me-2 text-oym-secondary"></i>Contenido
              </label>
              <textarea
                className={`form-control${errores.contenido ? ' is-invalid' : ''}`}
                id="contenido"
                name="contenido"
                rows="6"
                placeholder="Describe detalladamente el anuncio…"
                value={formData.contenido}
                onChange={handleChange}
                style={{ resize: 'vertical', minHeight: '140px' }}
              />
              <div className="d-flex justify-content-between">
                {errores.contenido
                  ? <div className="invalid-feedback d-block">{errores.contenido}</div>
                  : <span />}
                <small className="form-text text-end">{formData.contenido.length} caracteres</small>
              </div>
            </div>

            <div className="row g-3 mb-4">
              {/* Autor */}
              <div className="col-md-6">
                <label htmlFor="autor" className="form-label">
                  <i className="bi bi-person-fill me-2 text-oym-secondary"></i>Autor / Departamento
                </label>
                <input
                  type="text"
                  className={`form-control${errores.autor ? ' is-invalid' : ''}`}
                  id="autor"
                  name="autor"
                  placeholder="Ej: Departamento de Registro"
                  value={formData.autor}
                  onChange={handleChange}
                />
                {errores.autor && <div className="invalid-feedback">{errores.autor}</div>}
              </div>

              {/* Categoría */}
              <div className="col-md-6">
                <label htmlFor="categoria" className="form-label">
                  <i className="bi bi-tag-fill me-2 text-oym-secondary"></i>Categoría
                </label>
                <select
                  className="form-select"
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  {CATEGORIAS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="form-text">
                  <i className={`bi ${CAT_ICONS[formData.categoria] || 'bi-tag'} me-1`}></i>
                  {formData.categoria}
                </div>
              </div>
            </div>

            {/* Fecha de expiración */}
            <div className="mb-4">
              <label htmlFor="fechaExpiracion" className="form-label">
                <i className="bi bi-calendar-x-fill me-2 text-oym-secondary"></i>
                Fecha de expiración <span className="text-muted fw-normal">(opcional)</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaExpiracion"
                name="fechaExpiracion"
                value={formData.fechaExpiracion}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              <div className="form-text">
                Si dejas este campo vacío, el anuncio no expirará nunca.
              </div>
            </div>

            {/* Destacado */}
            <div className="mb-4">
              <div className="form-check p-3 rounded d-flex align-items-center gap-3"
                style={{ background: 'var(--surface-alt)', border: '1.5px solid var(--border)', cursor: 'pointer' }}
                onClick={() => handleChange({ target: { name: 'destacado', type: 'checkbox', checked: !formData.destacado } })}
              >
                <input
                  className="form-check-input flex-shrink-0"
                  type="checkbox"
                  id="destacado"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  style={{ width: '1.2em', height: '1.2em', cursor: 'pointer' }}
                  onClick={e => e.stopPropagation()}
                />
                <label className="form-check-label d-flex align-items-center gap-2 mb-0" htmlFor="destacado"
                  style={{ cursor: 'pointer' }}>
                  <i className="bi bi-star-fill" style={{ color: 'var(--oym-accent)', fontSize: '1.1rem' }}></i>
                  <span>
                    <strong>Marcar como destacado</strong>
                    <small className="d-block text-muted fw-normal">
                      Los anuncios destacados aparecen en la sección principal del tablero.
                    </small>
                  </span>
                  {formData.destacado && (
                    <span className="badge ms-2"
                      style={{ background: 'linear-gradient(135deg, var(--oym-accent), #C88A0A)', color: '#fff' }}>
                      Destacado
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-between align-items-center pt-2"
              style={{ borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(`/anuncio/${id}`)}>
                <i className="bi bi-arrow-left me-2"></i>Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-4">
                <i className="bi bi-save-fill me-2"></i>Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarAnuncio;
