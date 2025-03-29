// Función para verificar si un anuncio ha expirado
export const anuncioExpirado = (anuncio) => {
  // Si no tiene fecha de expiración, nunca expira
  if (!anuncio.fechaExpiracion) {
    return false;
  }
  
  const hoy = new Date();
  const fechaExp = new Date(anuncio.fechaExpiracion);
  
  // Eliminar la hora para comparar solo las fechas
  hoy.setHours(0, 0, 0, 0);
  fechaExp.setHours(0, 0, 0, 0);
  
  return fechaExp < hoy;
};// src/data/anuncios.js

// Datos de ejemplo iniciales para nuestro tablero de anuncios
const datosIniciales = [
  {
    id: 1,
    titulo: "Inscripciones abiertas para el semestre 2025-1",
    contenido: "Las inscripciones para el próximo semestre estarán abiertas del 1 al 15 de abril. No olvides completar tu proceso a tiempo.",
    autor: "Departamento de Admisiones",
    fecha: "2025-03-25",
    fechaExpiracion: "2025-04-16", // Un día después del cierre de inscripciones
    categoria: "Administrativo",
    destacado: true
  },
  {
    id: 2,
    titulo: "Conferencia: Inteligencia Artificial en la Educación",
    contenido: "Te invitamos a la conferencia sobre IA en la educación que se llevará a cabo el próximo viernes en el auditorio principal a las 3:00 PM.",
    autor: "Facultad de Ingeniería",
    fecha: "2025-03-26",
    fechaExpiracion: "2025-04-05", // Un día después de la conferencia
    categoria: "Evento",
    destacado: false
  },
  {
    id: 3,
    titulo: "Cambio de horario en biblioteca",
    contenido: "La biblioteca estará abierta en horario extendido durante la semana de exámenes finales, de 7:00 AM a 10:00 PM.",
    autor: "Biblioteca Central",
    fecha: "2025-03-27",
    fechaExpiracion: "", // Sin fecha de expiración
    categoria: "Informativo",
    destacado: false
  }
];

// Función para inicializar el localStorage si es necesario
const inicializarStorage = () => {
  // Comprobar si ya existen anuncios en localStorage
  if (!localStorage.getItem('anuncios')) {
    // Si no existen, guardamos los datos iniciales
    localStorage.setItem('anuncios', JSON.stringify(datosIniciales));
  }
};

// Inicializar al cargar este módulo
inicializarStorage();

// Función para obtener todos los anuncios
export const obtenerAnuncios = () => {
  const anunciosGuardados = localStorage.getItem('anuncios');
  return JSON.parse(anunciosGuardados || '[]');
};

// Función para obtener un anuncio por su ID
export const obtenerAnuncioPorId = (id) => {
  const anuncios = obtenerAnuncios();
  return anuncios.find(anuncio => anuncio.id === parseInt(id));
};

// Función para crear un nuevo anuncio
export const crearAnuncio = (nuevoAnuncio) => {
  // Obtenemos los anuncios actuales
  const anuncios = obtenerAnuncios();
  
  // Generamos un ID único
  const id = anuncios.length > 0 ? Math.max(...anuncios.map(a => a.id)) + 1 : 1;
  
  // Añadimos el nuevo anuncio con su ID, fecha actual y campo destacado
  const anuncioCompleto = {
    ...nuevoAnuncio,
    id,
    fecha: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    destacado: nuevoAnuncio.destacado || false,
    fechaExpiracion: nuevoAnuncio.fechaExpiracion || ""
  };
  
  // Añadimos al inicio del array de anuncios
  anuncios.unshift(anuncioCompleto);
  
  // Guardamos en localStorage
  localStorage.setItem('anuncios', JSON.stringify(anuncios));
  
  return anuncioCompleto;
};

// Función para eliminar un anuncio
export const eliminarAnuncio = (id) => {
  let anuncios = obtenerAnuncios();
  anuncios = anuncios.filter(anuncio => anuncio.id !== parseInt(id));
  localStorage.setItem('anuncios', JSON.stringify(anuncios));
  return true;
};

// Función para editar un anuncio
export const editarAnuncio = (id, anuncioActualizado) => {
  let anuncios = obtenerAnuncios();
  const indice = anuncios.findIndex(anuncio => anuncio.id === parseInt(id));
  
  if (indice !== -1) {
    // Mantener el ID y la fecha original
    anuncios[indice] = {
      ...anuncioActualizado,
      id: parseInt(id),
      fecha: anuncios[indice].fecha
    };
    
    localStorage.setItem('anuncios', JSON.stringify(anuncios));
    return anuncios[indice];
  }
  
  return null;
};

// Función para marcar/desmarcar un anuncio como destacado
export const toggleDestacado = (id) => {
  let anuncios = obtenerAnuncios();
  const indice = anuncios.findIndex(anuncio => anuncio.id === parseInt(id));
  
  if (indice !== -1) {
    // Invertir el valor actual de destacado
    anuncios[indice].destacado = !anuncios[indice].destacado;
    
    localStorage.setItem('anuncios', JSON.stringify(anuncios));
    return anuncios[indice];
  }
  
  return null;
};