// src/services/NotificationService.js

// Clave para almacenar la última visita en localStorage
const LAST_VISIT_KEY = 'lastVisitTimestamp';
const SEEN_ANNOUNCEMENTS_KEY = 'seenAnnouncementIds';

// Función para guardar la fecha y hora actual como último acceso
export const updateLastVisit = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(LAST_VISIT_KEY, currentTime.toString());
  return currentTime;
};

// Función para obtener la fecha y hora de la última visita
export const getLastVisit = () => {
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  return lastVisit ? parseInt(lastVisit) : null;
};

// Función para verificar si es la primera visita
export const isFirstVisit = () => {
  return getLastVisit() === null;
};

// Función para guardar los IDs de anuncios que ya ha visto el usuario
export const saveSeenAnnouncements = (announcementIds) => {
  localStorage.setItem(SEEN_ANNOUNCEMENTS_KEY, JSON.stringify(announcementIds));
};

// Función para obtener los IDs de anuncios que ya ha visto el usuario
export const getSeenAnnouncements = () => {
  const seenAnnouncements = localStorage.getItem(SEEN_ANNOUNCEMENTS_KEY);
  return seenAnnouncements ? JSON.parse(seenAnnouncements) : [];
};

// Función para marcar un anuncio como visto
export const markAnnouncementAsSeen = (announcementId) => {
  const seenAnnouncements = getSeenAnnouncements();
  if (!seenAnnouncements.includes(announcementId)) {
    seenAnnouncements.push(announcementId);
    saveSeenAnnouncements(seenAnnouncements);
  }
};

// Función para verificar si hay anuncios nuevos desde la última visita
export const getNewAnnouncementsCount = (anuncios) => {
  const lastVisit = getLastVisit();
  
  // Si es la primera visita, no hay anuncios nuevos (todos serán nuevos)
  if (lastVisit === null) {
    return 0;
  }
  
  // Filtrar anuncios creados después de la última visita
  const newAnnouncements = anuncios.filter(anuncio => {
    // Convertir la fecha del anuncio a timestamp para comparar
    const anuncioDate = new Date(anuncio.fecha).getTime();
    return anuncioDate > lastVisit;
  });
  
  return newAnnouncements.length;
};

// Función para identificar qué anuncios son nuevos
export const getNewAnnouncements = (anuncios) => {
  const lastVisit = getLastVisit();
  
  // Si es la primera visita, no hay anuncios nuevos
  if (lastVisit === null) {
    return [];
  }
  
  // Filtrar anuncios creados después de la última visita
  return anuncios.filter(anuncio => {
    const anuncioDate = new Date(anuncio.fecha).getTime();
    return anuncioDate > lastVisit;
  });
};

// Función para verificar si un anuncio específico es nuevo
export const isNewAnnouncement = (anuncio) => {
  const lastVisit = getLastVisit();
  
  // Si es la primera visita, no hay anuncios nuevos
  if (lastVisit === null) {
    return false;
  }
  
  const anuncioDate = new Date(anuncio.fecha).getTime();
  return anuncioDate > lastVisit;
};