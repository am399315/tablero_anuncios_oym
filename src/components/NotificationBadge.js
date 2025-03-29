// src/components/NotificationBadge.js
import React from 'react';

function NotificationBadge({ count }) {
  // No mostrar el badge si no hay notificaciones
  if (count <= 0) {
    return null;
  }
  
  return (
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
      {count > 99 ? '99+' : count}
      <span className="visually-hidden">anuncios nuevos</span>
    </span>
  );
}

export default NotificationBadge;