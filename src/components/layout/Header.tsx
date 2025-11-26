import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHeaderAnimation } from '../../hooks/useHeaderAnimation';
import { useHeaderShrink } from '../../hooks/useHeaderShrink';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { scrollToSection } from '../../hooks/useSmoothScroll';
import MobileMenu from './MobileMenu';
import logoLight from '../../assets/images/logobn.svg';
import logoDark from '../../assets/images/logo.svg';

interface HeaderProps {
  loaderComplete: boolean;
}

export default function Header({ loaderComplete }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    headerRef,
    headerLogoRef,
    headerNavRef,
    headerRightRef,
    expandHeader,
  } = useHeaderAnimation(loaderComplete);
  useHeaderShrink({ headerRef });
  const { menuButtonRef, menuRef } = useMobileMenu();
  const { toggleTheme } = useTheme();
  const { toggleLang, lang } = useLanguage();

  // Exponer expandHeader para que HeroSection lo pueda usar
  React.useEffect(() => {
    (window as any).expandHeader = expandHeader;
    return () => {
      delete (window as any).expandHeader;
    };
  }, [expandHeader]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      // Si estamos en otra página, navegar primero
      if (location.pathname !== '/') {
        navigate(`/${href.replace('/#', '#')}`);
        // El scroll se manejará automáticamente por useSmoothScroll en Home
      } else {
        // Si ya estamos en home, hacer scroll directamente
        const sectionId = href.replace('/#', '#');
        scrollToSection(sectionId);
      }
    } else if (href.startsWith('#')) {
      // Hash simple, hacer scroll
      scrollToSection(href);
    } else {
      // Navegación normal
      navigate(href);
    }
  };

  return (
    <>
      <header
        id="header"
        ref={headerRef}
        className=" fixed left-4 right-4 top-8 mx-auto max-w-[1200px] flex items-center justify-between px-6 py-3 rounded-[150px] bg-[rgba(189,189,189,0.14)] border border-[rgba(189,189,189,0.22)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.3px] transition-all duration-300 ease-in-out z-50 opacity-0"
      >
        <div id="header-logo" ref={headerLogoRef} className="flex items-center gap-4">
          <a
            href="/"
            aria-label="Ir al inicio"
            className="flex items-center no-underline"
          >
            {/* Logo para modo light */}
            <img
              src={logoLight}
              alt="Jonathan Rivera"
              className="h-[2.3em] w-auto dark:hidden"
            />
            {/* Logo para modo dark */}
            <img
              src={logoDark}
              alt="Jonathan Rivera"
              className="h-[2.3em] w-auto hidden dark:block"
            />
          </a>
        </div>

        <nav
          id="header-nav"
          ref={headerNavRef}
          aria-label="Navegación principal"
          className="hidden md:flex space-x-8 text-sm font-medium mx-auto opacity-0"
        >
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="hover:text-[#ff9800] transition-colors"
          >
            Inicio
          </a>
          <a
            href="/#experiencia"
            onClick={(e) => handleNavClick(e, '/#experiencia')}
            className="hover:text-[#ff9800] transition-colors"
          >
            Experiencia
          </a>
          <a
            href="/proyectos"
            onClick={(e) => handleNavClick(e, '/proyectos')}
            className="hover:text-[#ff9800] transition-colors"
          >
            Proyectos
          </a>
          <a
            href="#"
            id="contacto-nav"
            className="hover:text-[#ff9800] transition-colors cursor-pointer"
          >
            Contacto
          </a>
        </nav>

        <div
          id="header-right"
          ref={headerRightRef}
          className="flex items-center gap-3 opacity-0"
        >
          <button
            id="langBtn"
            type="button"
            onClick={toggleLang}
            className="text-black dark:text-white text-sm px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.04)]"
          >
            {lang.toUpperCase()}
          </button>

          <button
            id="themeBtn"
            type="button"
            onClick={toggleTheme}
            className="flex items-center text-black dark:text-white text-sm px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.04)]"
            aria-label="Cambiar tema"
          >
            <span id="themeIcon" aria-hidden="true"></span>
          </button>

          <button
            id="menuButton"
            ref={menuButtonRef}
            type="button"
            className="md:hidden ml-2 flex items-center justify-center p-2 rounded-full text-black dark:text-white focus:outline-none transition-transform duration-200"
            aria-expanded="false"
            aria-controls="mobileMenu"
            aria-label="Abrir menú"
          >
            <span className="hamburger flex flex-col justify-between w-5 h-3" aria-hidden="true">
              <span className="block h-[2px] bg-black dark:bg-white rounded"></span>
              <span className="block h-[2px] bg-black dark:bg-white rounded"></span>
              <span className="block h-[2px] bg-black dark:bg-white rounded"></span>
            </span>
          </button>
        </div>
      </header>

      <MobileMenu menuRef={menuRef as React.RefObject<HTMLElement>} />
    </>
  );
}
