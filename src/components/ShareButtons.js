// src/components/ShareButtons.js
import React, { useState } from 'react';

function ShareButtons({ titulo, url }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Función para compartir por correo electrónico
  const shareByEmail = () => {
    // Crear el enlace para correo con el asunto y cuerpo predefinidos
    const subject = encodeURIComponent(`Anuncio de Universidad OyM: ${titulo}`);
    const body = encodeURIComponent(`He encontrado este anuncio que podría interesarte:\n\n${titulo}\n\nPuedes verlo aquí: ${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
  
  // Función para compartir en WhatsApp
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`*${titulo}*\nPuedes verlo aquí: ${url}`);
    window.open(`https://wa.me/?text=${text}`);
  };
  
  // Función para compartir en Facebook
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };
  
  // Función para compartir en Twitter
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${titulo} - Universidad OyM`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`);
  };
  
  // Función para copiar el enlace al portapapeles
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      // Mostrar mensaje de éxito
      setShowTooltip(true);
      // Ocultar después de 2 segundos
      setTimeout(() => setShowTooltip(false), 2000);
    });
  };
  
  return (
    <div className="share-buttons">
      <div className="dropdown">
        <button 
          className="btn btn-sm btn-outline-info dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-share-fill me-1"></i>
          Compartir
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" onClick={shareByEmail}>
              <i className="bi bi-envelope me-2 text-secondary"></i>
              Correo electrónico
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={shareOnWhatsApp}>
              <i className="bi bi-whatsapp me-2 text-success"></i>
              WhatsApp
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={shareOnFacebook}>
              <i className="bi bi-facebook me-2 text-primary"></i>
              Facebook
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={shareOnTwitter}>
              <i className="bi bi-twitter-x me-2"></i>
              Twitter
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item position-relative" onClick={copyLink}>
              <i className="bi bi-clipboard me-2 text-secondary"></i>
              Copiar enlace
              {showTooltip && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  ¡Copiado!
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ShareButtons;