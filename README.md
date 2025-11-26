# Portfolio Personal

Portfolio web personal desarrollado con React, TypeScript y Vite. Una aplicación moderna y responsive que muestra proyectos, experiencia profesional, tecnologías y proceso de trabajo, con animaciones fluidas y una experiencia de usuario optimizada.

## 🚀 Características

- **Diseño Responsive**: Adaptado para dispositivos móviles, tablets y desktop
- **Modo Oscuro/Claro**: Soporte completo para temas dark y light
- **Multiidioma (i18n)**: Sistema de traducción completo con soporte para Español e Inglés
- **Animaciones Fluidas**: Implementadas con GSAP para transiciones suaves
- **Navegación SPA**: Routing con React Router DOM
- **Modales Interactivos**: Modal para proyectos con navegación entre ellos
- **Loader Animado**: Pantalla de carga inicial con animaciones
- **Scroll Suave**: Navegación suave entre secciones
- **Optimización de Imágenes**: Carga optimizada de imágenes con formato WebP
- **SEO Friendly**: Estructura semántica y accesible

## 🛠️ Tecnologías Utilizadas

### Core
- **React 19.2.0**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript 5.9.3**: Superset de JavaScript con tipado estático
- **Vite 7.2.4**: Build tool y dev server de próxima generación

### Estilos
- **Tailwind CSS 4.1.17**: Framework de CSS utility-first
- **CSS Personalizado**: Estilos adicionales y animaciones

### Animaciones
- **GSAP 3.13.0**: Biblioteca de animaciones de alto rendimiento

### Routing
- **React Router DOM 7.9.6**: Enrutamiento para aplicaciones React

### Fuentes
- **Fira Code**: Fuente monoespaciada para código

## 📁 Estructura del Proyecto

```
portfolio/
├── public/                 # Archivos estáticos públicos
│   ├── assets/
│   │   └── images/        # Imágenes de proyectos
│   └── vite.svg
│
├── src/
│   ├── assets/            # Recursos de la aplicación
│   │   ├── fonts/         # Fuentes personalizadas (Fira Code)
│   │   └── images/         # Imágenes e iconos
│   │       ├── iconos/    # Iconos de tecnologías
│   │       ├── logo.svg
│   │       └── jonathanrivera.webp
│   │
│   ├── components/         # Componentes React
│   │   ├── layout/        # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   ├── EmailModal.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   └── DecarativeCircle.tsx
│   │   │
│   │   └── sections/      # Secciones de la página
│   │       ├── HeroSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── CareerSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       ├── TechnologiesSection.tsx
│   │       ├── WorkProcess.tsx
│   │       └── ConclusionSection.tsx
│   │
│   ├── contexts/           # Context API de React
│   │   ├── AppContext.tsx  # Contexto global de la aplicación
│   │   └── LanguageContext.tsx  # Contexto de idioma e i18n
│   │
│   ├── data/               # Datos estáticos
│   │   └── projects.json   # Información de proyectos (soporta multiidioma)
│   │
│   ├── i18n/               # Archivos de traducción
│   │   ├── es.json         # Traducciones en español
│   │   └── en.json         # Traducciones en inglés
│   │
│   ├── hooks/              # Custom React Hooks
│   │   ├── useTheme.ts
│   │   ├── useLanguage.ts
│   │   ├── useLoader.ts
│   │   ├── useSmoothScroll.ts
│   │   ├── useProjectModal.ts
│   │   ├── useEmailModal.ts
│   │   ├── useMobileMenu.ts
│   │   └── [otros hooks de animación]
│   │
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.tsx        # Página principal
│   │   ├── Proyectos.tsx  # Página de proyectos
│   │   └── NotFound.tsx   # Página 404
│   │
│   ├── router/             # Configuración de rutas
│   │   └── index.tsx
│   │
│   ├── styles/             # Estilos globales
│   │   └── fonts.css      # Configuración de fuentes
│   │
│   ├── utils/              # Utilidades
│   │   └── imageLoader.ts # Cargador de imágenes
│   │
│   ├── index.css           # Estilos globales principales
│   └── main.tsx            # Punto de entrada de la aplicación
│
├── dist/                   # Build de producción (generado)
├── node_modules/           # Dependencias (generado)
│
├── index.html              # HTML principal
├── package.json            # Configuración del proyecto y dependencias
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Este archivo
```

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** (gestor de paquetes)

Puedes verificar las versiones instaladas ejecutando:

```bash
node --version
npm --version
```

## 🔧 Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd portfolio
```

### 2. Instalar dependencias

Usando npm:

```bash
npm install
```

O usando yarn:

```bash
yarn install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

O con yarn:

```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`
Inicia el servidor de desarrollo de Vite. La aplicación se recargará automáticamente cuando modifiques archivos.

### `npm run build`
Compila la aplicación para producción. Los archivos optimizados se generan en la carpeta `dist/`.

```bash
npm run build
```

### `npm run preview`
Previsualiza la build de producción localmente antes de desplegarla.

```bash
npm run preview
```

### `npm run lint`
Ejecuta ESLint para verificar y corregir problemas de código.

```bash
npm run lint
```

## 🎨 Características de Desarrollo

### Sistema de Traducción (i18n)
La aplicación incluye un sistema completo de internacionalización:
- **Archivos de traducción**: JSON estructurados en `src/i18n/` (es.json, en.json)
- **LanguageContext**: Context API para gestionar el idioma globalmente
- **Función `t()`**: Para obtener traducciones simples
- **Función `tHtml()`**: Para traducciones con marcadores HTML/React (ej: `<tech>Laravel</tech>`)
- **Persistencia**: El idioma seleccionado se guarda en localStorage
- **Proyectos multiidioma**: Los proyectos en `projects.json` soportan textos en ambos idiomas

**Marcadores disponibles en traducciones:**
- `<tech>texto</tech>` → Resalta tecnologías con estilo naranja
- `<highlight>texto</highlight>` → Resalta texto importante
- `<strong>texto</strong>` → Texto en negrita

### Context API
La aplicación utiliza React Context para manejar el estado global:
- **AppContext**: Controla si es la primera carga de la aplicación (útil para mostrar el loader)
- **LanguageContext**: Gestiona el idioma actual y las traducciones

### Custom Hooks
El proyecto incluye múltiples custom hooks para:
- Gestión de temas (dark/light mode)
- Gestión de idioma (i18n)
- Animaciones con GSAP
- Modales (proyectos, email)
- Scroll suave
- Menú móvil
- Y más...

### Optimización de Imágenes
Las imágenes se cargan de forma optimizada usando un utility (`imageLoader.ts`) que maneja diferentes formatos y rutas.

### Animaciones
Las animaciones están implementadas con GSAP y se organizan en hooks personalizados para mantener el código limpio y reutilizable. Las animaciones se adaptan al idioma seleccionado.

## 🚀 Compilación para Producción

Para compilar el proyecto para producción:

```bash
npm run build
```

Este comando:
- Compila TypeScript y verifica tipos
- Optimiza y minifica el código
- Genera los archivos estáticos en la carpeta `dist/`
- Incluye todas las traducciones y assets optimizados

Los archivos listos para desplegar estarán en la carpeta `dist/`.

## 📝 Notas Adicionales

- El proyecto utiliza **TypeScript** para mayor seguridad de tipos
- **Tailwind CSS 4** está configurado con Vite plugin para mejor rendimiento
- **Sistema i18n completo**: Soporte para múltiples idiomas con cambio dinámico
- Las animaciones están optimizadas para rendimiento con GSAP y se adaptan al idioma
- El proyecto es completamente responsive y funciona en todos los dispositivos
- Se utiliza `sessionStorage` para mejorar la experiencia del usuario (evitar mostrar el loader en cada navegación)
- Se utiliza `localStorage` para persistir la preferencia de idioma del usuario
- Los proyectos en `projects.json` soportan estructura multiidioma para todos sus campos de texto

## 📄 Licencia

Este proyecto es de uso personal.

---

Desarrollado con ❤️ por Jonathan Rivera

