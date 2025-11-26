import { useEffect } from 'react';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { useEmailModal } from '../../hooks/useEmailModal';
import JonathanImage from '../../assets/images/jonathanrivera.webp';

interface HeroSectionProps {
  loaderComplete: boolean;
}

export default function HeroSection({ loaderComplete }: HeroSectionProps) {
  const { openModal } = useEmailModal();
  const expandHeader = () => {
    if ((window as any).expandHeader) {
      (window as any).expandHeader();
    }
  };

  const {
    introGreetingRef,
    introNameRef,
    titleDesarrolladorRef,
    textoSitiosWebRef,
    typingCursorRef,
    profileImageRef,
    availabilityBadgeRef,
    socialDesktopRef,
    socialMobileRef,
    descriptionTextRef,
    buttonProjectsRef,
    aboutMeRef,
    aboutMeTitleRef,
  } = useHeroAnimation({ onHeaderExpand: expandHeader, loaderComplete });

  useEffect(() => {
    const emailLink = document.getElementById('emailLink');
    const emailLinkMobile = document.getElementById('emailLinkMobile');
    const contactoNav = document.getElementById('contacto-nav');

    const handleEmailClick = (e: Event) => {
      e.preventDefault();
      openModal();
    };

    if (emailLink) {
      emailLink.addEventListener('click', handleEmailClick);
    }
    if (emailLinkMobile) {
      emailLinkMobile.addEventListener('click', handleEmailClick);
    }
    if (contactoNav) {
      contactoNav.addEventListener('click', handleEmailClick);
    }

    return () => {
      if (emailLink) emailLink.removeEventListener('click', handleEmailClick);
      if (emailLinkMobile)
        emailLinkMobile.removeEventListener('click', handleEmailClick);
      if (contactoNav) contactoNav.removeEventListener('click', handleEmailClick);
    };
  }, [openModal]);

  return (
    <section
      id="inicio"
      className="flex items-center justify-center relative min-h-[90dvh] px-6"
    >
      <div
        id="inicio-content"
        className="grid grid-cols-1 md:grid-cols-10 gap-8 w-full z-10"
      >
        <div
          id="availability-badge"
          ref={availabilityBadgeRef}
          className="flex items-center gap-3 text-black dark:text-gray-300 md:col-span-10 order-0 mb-4 opacity-0"
        >
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
          <span>Disponible para nuevos proyectos</span>
        </div>

        <div
          id="name-section"
          className="md:col-span-10 order-0.5 md:order-0.5 mb-4 md:mb-0"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                id="profile-image"
                ref={profileImageRef}
                src={JonathanImage}
                alt="Jonathan Rivera"
                loading="lazy"
                className="w-20 h-20 object-cover rounded-full border-2 border-[#ff9800]/50 shadow-lg opacity-0"
              />
              <div>
                <p
                  id="intro-greeting"
                  ref={introGreetingRef}
                  className="text-[#ff9800] uppercase font-semibold tracking-wider text-sm opacity-0"
                >
                  👋 Hola
                </p>
                <h3
                  id="intro-name"
                  ref={introNameRef}
                  className="text-2xl font-bold opacity-0"
                >
                  Soy <span className="text-[#ff9800]">Jonathan Rivera</span>
                </h3>
              </div>
            </div>
            <nav
              id="social-desktop"
              ref={socialDesktopRef}
              className="hidden md:flex items-center justify-end gap-4 flex-wrap opacity-0"
              aria-label="Redes sociales"
            >
              <a
                href="https://www.linkedin.com/in/jonathanrivera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-white text-lg font-semibold flex items-center gap-2 hover:text-[#ff9800] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://github.com/jonadavrivera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white dark:text-white text-lg font-semibold flex items-center gap-2 hover:text-[#ff9800] transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="#"
                id="emailLink"
                className="text-white dark:text-white text-lg font-semibold flex items-center gap-2 hover:text-[#ff9800] transition-colors cursor-pointer"
                aria-label="Ver correo electrónico"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="hidden sm:inline">Correo</span>
              </a>
            </nav>
          </div>
        </div>

        <h1
          id="title-desarrollador"
          ref={titleDesarrolladorRef}
          className="font-bold text-4xl md:text-[clamp(3rem,8vw,6.5em)] leading-none md:col-span-7 order-1 md:order-1 bg-gradient-to-r from-[#ff9800] to-[#ffc107] text-transparent bg-clip-text min-h-[1.2em]"
        >
          <span className="invisible">Desarrollador</span>
        </h1>

        <div
          id="button-projects"
          ref={buttonProjectsRef}
          className="flex md:col-span-3 order-4 md:order-2 items-center justify-start md:justify-end opacity-0"
        >
          <a
            href="#proyectos"
            className="group inline-flex items-center gap-3 dark:bg-white bg-[#ff9800] text-white dark:text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Ver proyectos
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        <p
          id="description-text"
          ref={descriptionTextRef}
          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed md:col-span-4 order-3 md:order-3 opacity-0"
        >
          Desarrollador Web Full Stack con más de 8 años creando plataformas digitales orientadas a facilitar el trabajo de las personas.

        </p>

        <div
          id="title-sitios-web"
          className="md:col-span-6 order-2 md:order-4 flex flex-col gap-4"
        >
          <h2 className="text-4xl md:text-7xl font-extrabold leading-none bg-gradient-to-r from-[#ff9800] to-[#ffc107] text-transparent bg-clip-text">
            <span id="texto-sitios-web" ref={textoSitiosWebRef}></span>
            <span
              id="typing-cursor"
              ref={typingCursorRef}
              className="opacity-0"
            >
              |
            </span>
          </h2>
        </div>

        <nav
          id="social-mobile"
          ref={socialMobileRef}
          className="md:col-span-10 order-5 md:hidden flex items-center justify-center gap-4 flex-wrap mt-4 opacity-0"
          aria-label="Redes sociales"
        >
          <a
            href="https://www.linkedin.com/in/jonathan-david-rivera-ord/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white dark:text-white text-lg font-semibold flex items-center gap-2 hover:text-[#ff9800] transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/jonadavrivera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white dark:text-white text-lg font-semibold flex items-center gap-2 hover:text-[#ff9800] transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="#"
            id="emailLinkMobile"
            className="text-white dark:text-white text-lg font-semibold flex items-center gap-2 hover:text-[#ff9800] transition-colors cursor-pointer"
            aria-label="Ver correo electrónico"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Correo</span>
          </a>
        </nav>
{/* NUEVO BLOQUE SOBRE MÍ */}
<div
  id="about-me"
  ref={aboutMeRef}
  className="md:col-span-12 order-6 mt-4 md:mt-6 mb-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed"
>
  {/* Etiqueta / título pequeño */}
  <div className='text-center'>
  <h2
    id="about-me-title"
    ref={aboutMeTitleRef}
    className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto"
    aria-label="Sobre mí"
  >
    <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
      Sobre
    </span>
    <span className="text-[#ff9800]">mí</span>
  </h2>
  </div>

  {/* Título llamativo */}
  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#ff9800] text-left">
    Más allá del código y las tecnologías
  </h2>

  {/* Contenido en dos columnas (flex en desktop, 1 columna en móvil) */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full text-left">
    {/* Columna 1 */}
    <div className="space-y-3 md:w-1/2">
      <p className='text-lg'>
        Me enfoco en entender el contexto del negocio y transformar esas
        necesidades en productos claros, modernos y fáciles de usar. He
        colaborado tanto con empresas como con clientes freelance, siempre
        buscando equilibrar funcionalidad, diseño y mantenibilidad.
      </p>
    </div>

    {/* Columna 2 */}
    <div className="space-y-3 md:w-1/2">
      <p className='text-lg'>
        Disfruto trabajar en herramientas internas y paneles administrativos que
        facilitan el trabajo de los equipos. Me motiva crear experiencias donde
        la claridad visual y la eficiencia se convierten en parte del día a día.
      </p>
    </div>
  </div>
</div>
  
      </div>
         

    </section>
  );
}
