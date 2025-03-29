# 🎓 Tablero de Anuncios Universidad Dominicana O&M 🎓

## 📱 Descripción General 📱

Bienvenido a la documentación oficial del **Tablero de Anuncios Digital** de la Universidad Dominicana O&M, una aplicación web de vanguardia desarrollada con React que revoluciona la forma en que nuestra comunidad universitaria se mantiene informada.

![Universidad O&M](https://via.placeholder.com/800x400?text=Universidad+Dominicana+O%26M)

> 🚀 **Versión actual**: 2.0.1 
> 
> 🔗 **URL de producción**: [Ver aplicación en Vercel](https://tablero-anuncios-oym.vercel.app/)

---

## ✨ Características Principales ✨

| Característica | Descripción | Ícono |
|----------------|-------------|-------|
| 🖥️ **Interfaz intuitiva** | Visualización moderna con tarjetas organizadas estratégicamente | 🎯 |
| 🔍 **Búsqueda avanzada** | Encuentra rápidamente lo que necesitas por título, contenido o autor | 🕵️ |
| 🏷️ **Filtrado inteligente** | Organiza anuncios por categorías: Eventos, Administrativos, Académicos e Informativos | 📊 |
| ⏱️ **Ordenamiento flexible** | Personaliza tu vista por fecha, alfabéticamente o por categoría | 📶 |
| 🌟 **Anuncios destacados** | Sección especial para información prioritaria que no puedes perderte | 🔝 |
| 📅 **Control de vigencia** | Sistema automático de fechas de expiración para mantener todo actualizado | ⏰ |
| 🌓 **Tema oscuro/claro** | Adaptación visual según tus preferencias y mejora de accesibilidad | 💡 |
| 🔔 **Sistema de notificaciones** | Indicador visual de anuncios nuevos desde tu última visita | 📣 |
| 📲 **Compartir en redes** | Difunde fácilmente por correo, WhatsApp, Facebook y Twitter | 📤 |
| 📱 **Diseño responsive** | Experiencia óptima en dispositivos móviles, tablets y escritorio | 🖥️ |
| 🔐 **Panel administrativo** | Gestión de contenidos con acceso protegido para personal autorizado | ⚙️ |

---

## 🛠️ Stack Tecnológico 🛠️

```
🔷 React               → Framework principal para UI
🔷 React Router        → Navegación fluida sin recargas
🔷 Bootstrap           → Componentes visuales y responsividad  
🔷 localStorage        → Persistencia de datos en navegador
🔷 Context API         → Gestión eficiente de estados globales
```

---

## 📂 Arquitectura del Proyecto 📂

```
src/
  ├── 📁 components/      # Bloques de construcción reutilizables
  │   ├── 📄 Navbar.js
  │   ├── 📄 NotificationBadge.js
  │   ├── 📄 ProtectedRoute.js
  │   ├── 📄 ShareButtons.js
  │   └── 📄 ThemeToggle.js
  ├── 📁 context/         # Gestión de estados globales
  │   └── 📄 ThemeContext.js
  ├── 📁 data/            # Capa de acceso a información
  │   └── 📄 anuncios.js
  ├── 📁 pages/           # Vistas principales
  │   ├── 📄 AnuncioDetalle.js
  │   ├── 📄 CrearAnuncio.js
  │   ├── 📄 EditarAnuncio.js
  │   ├── 📄 Home.js
  │   └── 📄 Login.js
  ├── 📁 services/        # Lógica de negocio
  │   ├── 📄 AuthService.js
  │   └── 📄 NotificationService.js
  ├── 📄 App.js           # Componente raíz y configuración de rutas
  └── 📄 index.js         # Punto de entrada de la aplicación
```

---

## 🧭 Mapa de Navegación 🧭

| 🔗 Ruta | 📝 Descripción | 🔒 Acceso |
|---------|---------------|-----------|
| **/** | Página principal con listado de anuncios | 👥 Público |
| **/anuncio/:id** | Detalle completo de un anuncio específico | 👥 Público |
| **/login** | Acceso al sistema para administradores | 👥 Público |
| **/crear** | Formulario para creación de nuevos anuncios | 👤 Solo admin |
| **/editar/:id** | Formulario para modificar anuncios existentes | 👤 Solo admin |

---

## 🎯 Funcionalidades por Módulo 🎯

### 🏠 Página Principal (Home)

- 📊 Visualización de anuncios en formato de tarjetas interactivas
- 🌟 Sección destacada para anuncios prioritarios
- 🔍 Barra de búsqueda inteligente por texto
- 🔖 Sistema de filtrado multinivel por categorías
- 📑 Ordenamiento personalizable por múltiples criterios
- 🆕 Indicadores visuales de contenido nuevo y expirado

### 📰 Detalle de Anuncio

- 📝 Visualización completa del contenido y recursos multimedia
- 📲 Suite integrada de botones para compartir en redes sociales
- 🏷️ Indicadores de estado visual (destacado, expirado, etc)
- ✏️ Acciones rápidas de edición y eliminación (administradores)

### ⚙️ Panel de Administración

- 📝 Formularios intuitivos para gestión de contenidos
- 🔝 Herramientas para priorización de anuncios importantes
- 📅 Control avanzado de fechas de publicación y expiración
- 🔐 Sistema de autenticación y autorización por roles

---

## 👩‍💻 Guía de Usuario 👨‍💻

### 🧑‍🎓 Para Visitantes:

1. Explora todos los anuncios disponibles en la página principal
2. Utiliza los filtros y búsqueda para encontrar información específica
3. Accede a los detalles completos haciendo clic en cualquier anuncio
4. Comparte información relevante a través de las redes sociales integradas

### 👨‍💼 Para Administradores:

1. Accede al sistema con tus credenciales:
   - 👤 **Usuario**: `admin`
   - 🔑 **Contraseña**: `OyM2025`

2. Gestiona el contenido con las siguientes opciones:
   - ✅ Crear nuevos anuncios con información completa
   - 📝 Editar anuncios existentes cuando sea necesario
   - 🗑️ Eliminar contenido obsoleto o innecesario
   - 🌟 Marcar/desmarcar anuncios como destacados
   - 📅 Establecer fechas de expiración para contenido temporal

---

## 🔧 Información Técnica Adicional 🔧

- 💾 **Persistencia**: Los anuncios se almacenan en localStorage para mantener sesiones
- 🛡️ **Seguridad**: Autenticación basada en tokens con expiración programada
- 🔔 **Sistema de alertas**: Seguimiento inteligente de última visita para marcar novedades
- ☁️ **Infraestructura**: Despliegue continuo en Vercel con integración a GitHub

---

## 📞 Contacto y Soporte 📞

¿Necesitas ayuda? ¡Estamos para asistirte! 

- 📧 **Email**: soporte-ti@udom.edu.do
- 📱 **WhatsApp**: +1 (809) 555-1234
- 🏢 **Oficina**: Departamento de TI, Edificio Principal, 2do Nivel

---

<div align="center">
  <p>© 2025 Universidad Dominicana O&M. Todos los derechos reservados.</p>
  <p>💙 Desarrollado con pasión por el Estudiante de Ingenieria en Sistemas Andres Escolastico 💙</p>
</div>