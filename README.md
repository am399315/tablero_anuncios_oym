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


# 📣 Documentación del Proyecto: Tablero de Anuncios Universidad OyM

## 👨‍🎓 Información del Estudiante

- **Nombre:** Andres Miguel
- **Apellidos:** Escolastico Lara
- **Matrícula:** 23-EISN-2-056
- **Materia:** Programación de Dispositivos Móviles
- **Maestro:** Kervin Marcelino Cruz Curet

---

## 📝 Descripción del Proyecto

El Tablero de Anuncios de la Universidad OyM es una aplicación web moderna e interactiva diseñada para centralizar y distribuir información relevante para la comunidad universitaria. Funciona como un punto único de comunicación oficial donde estudiantes, profesores y personal administrativo pueden acceder a anuncios importantes relacionados con eventos académicos, información administrativa, cambios en horarios, y otras notificaciones relevantes.

La aplicación proporciona una interfaz intuitiva y atractiva, con características avanzadas como:
- Filtrado por categorías
- Búsqueda de texto
- Sistema de notificaciones
- Soporte para compartir anuncios a través de diferentes canales

El sistema también implementa un control de acceso para que solo administradores autorizados puedan crear y gestionar el contenido, garantizando así la integridad y confiabilidad de la información publicada.

## 🔍 Antecedentes del Proyecto

### ❓ Problemática

Antes de la implementación de este proyecto, la Universidad OyM enfrentaba diversos desafíos en la comunicación institucional:

- 📄 **Información dispersa**: Los anuncios se distribuían a través de múltiples canales como correos electrónicos, carteles físicos, y diferentes plataformas digitales, lo que dificultaba el acceso a la información completa.
- 🔎 **Dificultad de búsqueda**: No existía una forma centralizada de buscar anuncios anteriores o filtrar información relevante.
- ⏱️ **Falta de inmediatez**: Los mecanismos tradicionales de comunicación no permitían una distribución rápida de anuncios urgentes.
- 📊 **Ausencia de seguimiento**: No había forma de saber qué anuncios habían sido vistos por los usuarios.
- 🔄 **Gestión descentralizada**: Diferentes departamentos publicaban información sin un formato consistente o control centralizado.

### 💡 Solución Propuesta

Se propuso desarrollar un tablero de anuncios digital con las siguientes características clave:

- 🌐 Centralización de todos los anuncios institucionales
- 📱 Interfaz moderna, accesible desde cualquier dispositivo
- 🗂️ Sistema de categorización y búsqueda avanzada
- 🔐 Gestión centralizada con control de acceso
- 🔔 Notificaciones de nuevos anuncios
- ⭐ Capacidad para destacar información crítica

## 🎯 Alcance del Proyecto

El Tablero de Anuncios de la Universidad OyM abarca:

### ✅ Dentro del Alcance:

- 💻 Desarrollo de una plataforma web responsive con React
- 🎨 Implementación de una interfaz de usuario intuitiva con modo claro/oscuro
- 🔄 Sistema CRUD completo para la gestión de anuncios (Crear, Leer, Actualizar, Eliminar)
- 🔑 Sistema de autenticación para administradores
- 🔍 Funcionalidad de búsqueda y filtrado de anuncios
- 📲 Compartición de anuncios vía redes sociales y correo electrónico
- 🔔 Notificaciones de nuevos anuncios
- 📋 Ordenamiento de anuncios según diferentes criterios
- ⭐ Sistema de anuncios destacados para información importante
- 📅 Fecha de expiración para anuncios temporales
- 💾 Almacenamiento persistente local (localStorage)

### ❌ Fuera del Alcance:

- 🖥️ Implementación de un backend con base de datos
- 💬 Sistema de comentarios o interacción de usuarios
- 📱 Aplicación móvil nativa (aunque es responsive)
- 🔔 Sistema de notificaciones push
- 📊 Analíticas detalladas de visualización de anuncios
- 👥 Sistema de múltiples roles (solo existe rol administrador y visitante)
- 📎 Subida de archivos adjuntos o multimedia

## 📋 Requerimientos del Proyecto

### ⚙️ Requerimientos Funcionales:

#### 📝 Gestión de Anuncios

- **RF1.1**: El sistema debe permitir a los administradores crear nuevos anuncios.
- **RF1.2**: El sistema debe permitir a los administradores editar anuncios existentes.
- **RF1.3**: El sistema debe permitir a los administradores eliminar anuncios.
- **RF1.4**: El sistema debe permitir a los administradores marcar anuncios como destacados.
- **RF1.5**: El sistema debe permitir establecer fechas de expiración para los anuncios.

#### 👁️ Visualización de Anuncios

- **RF2.1**: El sistema debe mostrar todos los anuncios en la página principal.
- **RF2.2**: El sistema debe mostrar anuncios destacados en una sección especial.
- **RF2.3**: El sistema debe permitir ver el detalle completo de cada anuncio.
- **RF2.4**: El sistema debe mostrar visualmente los anuncios expirados con un estilo diferenciado.

#### 🔍 Búsqueda y Filtrado

- **RF3.1**: El sistema debe permitir buscar anuncios por texto en título, contenido y autor.
- **RF3.2**: El sistema debe permitir filtrar anuncios por categoría.
- **RF3.3**: El sistema debe permitir ordenar anuncios por diferentes criterios (fecha, alfabético, categoría).
- **RF3.4**: El sistema debe mostrar claramente los criterios de filtrado/búsqueda aplicados.

#### 🔐 Autenticación y Autorización

- **RF4.1**: El sistema debe proporcionar una página de inicio de sesión para administradores.
- **RF4.2**: El sistema debe restringir la creación, edición y eliminación de anuncios solo a usuarios autenticados.
- **RF4.3**: El sistema debe mostrar opciones de administración solo a usuarios autenticados.

#### 🖥️ Experiencia de Usuario

- **RF5.1**: El sistema debe proporcionar un modo oscuro/claro para mejorar la accesibilidad.
- **RF5.2**: El sistema debe ser compatible con dispositivos móviles (responsive).
- **RF5.3**: El sistema debe permitir compartir anuncios por correo y redes sociales.
- **RF5.4**: El sistema debe notificar sobre nuevos anuncios desde la última visita.

### 🔧 Requerimientos No Funcionales:

#### 👤 Usabilidad

- **RNF1.1**: La interfaz debe ser intuitiva y fácil de navegar.
- **RNF1.2**: El tiempo de aprendizaje para nuevos usuarios debe ser mínimo.
- **RNF1.3**: La aplicación debe ser compatible con los principales navegadores (Chrome, Firefox, Safari, Edge).

#### ⚡ Rendimiento

- **RNF2.1**: La aplicación debe cargar en menos de 3 segundos en condiciones normales.
- **RNF2.2**: Las operaciones de búsqueda y filtrado deben ejecutarse en tiempo real.

#### 🔒 Seguridad

- **RNF3.1**: Las credenciales de administrador deben almacenarse de forma segura.
- **RNF3.2**: La sesión de administrador debe expirar después de 24 horas.

#### 🛠️ Mantenibilidad

- **RNF4.1**: El código debe estar bien organizado y documentado.
- **RNF4.2**: La arquitectura debe permitir fácil extensión con nuevas funcionalidades.

#### 🌐 Disponibilidad

- **RNF5.1**: La aplicación debe funcionar sin conexión a internet después de la carga inicial.

## 🏗️ Arquitectura del Proyecto

El Tablero de Anuncios de la Universidad OyM sigue una arquitectura de aplicación de una sola página (SPA) basada en componentes, utilizando React como framework principal.

### 📚 Capas de la Aplicación:

#### 🎨 Capa de Presentación (UI)

- Componentes React para cada parte de la interfaz
- Estilos CSS y Bootstrap para diseño responsive
- Contextual UI (ThemeContext) para el modo oscuro/claro

#### ⚙️ Capa de Lógica de Negocio

- Servicios para gestión de autenticación
- Servicios para notificaciones
- Funciones de filtrado, búsqueda y ordenamiento

#### 💾 Capa de Datos

- Almacenamiento local con localStorage
- Funciones CRUD para manipulación de datos

### 📂 Estructura de Carpetas:

```
src/
  ├── components/      # Componentes reutilizables
  │   ├── Navbar.js
  │   ├── NotificationBadge.js
  │   ├── ProtectedRoute.js
  │   ├── ShareButtons.js
  │   └── ThemeToggle.js
  ├── context/         # Contextos de React
  │   └── ThemeContext.js
  ├── data/            # Capa de acceso a datos
  │   └── anuncios.js
  ├── pages/           # Componentes de página
  │   ├── AnuncioDetalle.js
  │   ├── CrearAnuncio.js
  │   ├── EditarAnuncio.js
  │   ├── Home.js
  │   └── Login.js
  ├── services/        # Servicios de la aplicación
  │   ├── AuthService.js
  │   └── NotificationService.js
  ├── App.css          # Estilos globales
  ├── App.js           # Componente principal y rutas
  └── index.js         # Punto de entrada
```

### 🧩 Diagrama de Componentes:

```
App
├── ThemeProvider
│   └── Router
│       ├── Navbar
│       │   ├── ThemeToggle
│       │   └── NotificationBadge
│       │
│       └── Routes
│           ├── Home
│           │   ├── ShareButtons
│           │   └── Modal (confirmación)
│           ├── AnuncioDetalle
│           │   └── ShareButtons
│           ├── CrearAnuncio (Protegido)
│           ├── EditarAnuncio (Protegido)
│           └── Login
```

### 🔄 Flujo de Datos:

- Los datos de anuncios se almacenan en localStorage
- Los servicios proporcionan funciones CRUD para manipular datos
- Las páginas utilizan estas funciones para mostrar y modificar anuncios
- La autenticación controla quién puede modificar datos
- El estado se mantiene en componentes usando React Hooks (useState, useEffect)

## 💻 Tecnologías Utilizadas

### 🖥️ Frontend:

- **React**: Framework principal para la construcción de la interfaz de usuario
- **React Router**: Para la navegación entre páginas sin recargar
- **Bootstrap**: Framework CSS para diseño responsive
- **Bootstrap Icons**: Biblioteca de iconos

### 💾 Almacenamiento:

- **localStorage**: Para persistencia de datos en el navegador

### 🧰 Utilidades y Herramientas:

- **Create React App**: Para la configuración inicial del proyecto
- **npm**: Gestor de paquetes para dependencias
- **Git/GitHub**: Control de versiones
- **Visual Studio Code**: Editor de código

### 📚 Librerías Principales:

- **react-router-dom**: Navegación entre páginas
- **bootstrap**: Estilos y componentes
- **bootstrap-icons**: Iconografía

## 📊 Diagramas del Proyecto

### 🔄 Diagrama de Flujo de Usuario:

```
                  +----------------+
                  |   Inicio       |
                  +-------+--------+
                          |
                          v
             +------------+-----------+
             |  Ver Lista de Anuncios |
             +------------+-----------+
                          |
            +-------------+-------------+
            |                           |
            v                           v
   +--------+--------+         +--------+---------+
   | Buscar/Filtrar  |         | Ver Detalle      |
   +--------+--------+         +--------+---------+
            |                           |
            v                           v
   +--------+--------+         +--------+---------+
   | Ver Resultados  |         | Compartir Anuncio|
   +-----------------+         +---------+--------+
                                         |
           +--------------------------+  |
           |  Solo Administradores    |  |
           +--------------------------+  |
                      |                  |
      +---------------v---+              |
      |  Iniciar Sesión   |              |
      +---------------+---+              |
                      |                  |
    +------+------+---+----+----+        |
    |             |        |    |        |
    v             v        v    v        v
+---+---+  +------+--+ +---+--+ +-+------+-+
|Crear  |  |Editar   | |Borrar| |Destacar  |
+-------+  +---------+ +------+ +----------+
```

### 🏗️ Diagrama de Arquitectura:

```
+------------------------------------------------------+
|                     Cliente (Browser)                 |
+------------------------------------------------------+
                           |
                           v
+------------------------------------------------------+
|                    React Application                  |
|                                                      |
|  +------------+  +------------+  +----------------+  |
|  | Componentes|  | Páginas    |  | Rutas          |  |
|  +------------+  +------------+  +----------------+  |
|                                                      |
|  +------------+  +------------+  +----------------+  |
|  | Servicios  |  | Contextos  |  | Hooks          |  |
|  +------------+  +------------+  +----------------+  |
|                                                      |
+------------------------|----------------------------+
                         |
                         v
+------------------------------------------------------+
|                  Browser Storage                      |
|                                                      |
|   +------------+  +------------+  +---------------+  |
|   | Anuncios   |  | Usuarios   |  | Preferencias  |  |
|   +------------+  +------------+  +---------------+  |
|                                                      |
+------------------------------------------------------+
```

## 💰 Monetización

El Tablero de Anuncios de la Universidad OyM está diseñado como una herramienta institucional sin fines de lucro directos. No está destinado para cobrar a los usuarios finales (estudiantes, profesores, personal) por su uso.

### 💸 Modelo de Financiamiento:

- **Financiamiento Institucional**: El desarrollo y mantenimiento del proyecto es financiado por el presupuesto de TI de la Universidad OyM como parte de la mejora de sus servicios digitales.
- **Valor Indirecto**: Aunque no genera ingresos directamente, el proyecto proporciona valor a la institución mediante:
  - ⏱️ Mejora en la eficiencia de comunicación
  - 💲 Reducción de costos asociados con métodos tradicionales de comunicación (impresión, distribución)
  - 😊 Mejora en la satisfacción de estudiantes y personal
  - 🏢 Fortalecimiento de la imagen digital de la universidad

### 🚀 Potenciales Extensiones Futuras:

Si en el futuro se considerara una extensión comercial, podría incluir:

#### 🏆 Versión Enterprise:
Ofrecer una versión avanzada para otras instituciones educativas con características adicionales como:

- 🔄 Integración con sistemas de gestión académica
- 📊 Análisis avanzado de engagement
- 🎨 Personalización con marca institucional

#### 🛠️ Servicios Adicionales:

- ⚙️ Implementación y configuración personalizada
- 🆘 Soporte técnico premium
- 👨‍🏫 Capacitación para administradores

#### 📢 Anuncios Patrocinados:

- 💼 Espacio para anuncios de servicios relevantes para la comunidad universitaria
- 🎭 Promoción destacada de eventos de socios de la universidad

---

**Elaborado por: Andres Miguel Escolastico Lara | 23-EISN-2-056**

---

<div align="center">
  <p>© 2025 Universidad Dominicana O&M. Todos los derechos reservados.</p>
  <p>💙 Desarrollado con pasión por el Estudiante de Ingenieria en Sistemas Andres Escolastico 💙</p>
</div>