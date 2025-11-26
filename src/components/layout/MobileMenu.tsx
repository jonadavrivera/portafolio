import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEmailModal } from '../../hooks/useEmailModal';
import { useLanguage as useLanguageContext } from '../../contexts/LanguageContext';
import { scrollToSection } from '../../hooks/useSmoothScroll';

interface MobileMenuProps {
  menuRef: React.RefObject<HTMLElement>;
}

export default function MobileMenu({ menuRef }: MobileMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useEmailModal();
  const { t } = useLanguageContext();

  React.useEffect(() => {
    const contactoLink = document.getElementById('contacto-mobile-nav');
    if (contactoLink) {
      const handleClick = (e: Event) => {
        e.preventDefault();
        openModal();
      };
      contactoLink.addEventListener('click', handleClick);
      return () => {
        contactoLink.removeEventListener('click', handleClick);
      };
    }
  }, [openModal]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      // Si estamos en otra página, navegar primero
      if (location.pathname !== '/') {
        navigate(`/${href.replace('/#', '#')}`);
        // El scroll se manejará automáticamente por useSmoothScroll en Home
      } else {
        const sectionId = href.replace('/#', '#');
        scrollToSection(sectionId);
      }
    } else if (href.startsWith('#')) {
      scrollToSection(href);
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      id="mobileMenu"
      ref={menuRef as React.RefObject<HTMLElement>}
      aria-label="Menú móvil"
      className="fixed top-[88px] right-0 w-full h-[calc(100vh-88px)] bg-[rgba(16,16,16,0.95)] flex flex-col items-center justify-center text-lg font-medium transform translate-x-full transition-transform duration-500 ease-in-out md:hidden z-40 backdrop-blur-[6px]"
    >
      <a
        href="/"
        onClick={(e) => handleNavClick(e, '/')}
        className="block text-white py-4 px-2 w-full text-center hover:bg-[rgba(255,255,255,0.04)]"
      >
        {t('header.nav.inicio')}
      </a>
      <a
        href="/#experiencia"
        onClick={(e) => handleNavClick(e, '/#experiencia')}
        className="block text-white py-4 px-2 w-full text-center hover:bg-[rgba(255,255,255,0.04)]"
      >
        {t('header.nav.experiencia')}
      </a>
      <a
        href="/proyectos"
        onClick={(e) => handleNavClick(e, '/proyectos')}
        className="block text-white py-4 px-2 w-full text-center hover:bg-[rgba(255,255,255,0.04)]"
      >
        {t('header.nav.proyectos')}
      </a>
      <a
        href="#"
        id="contacto-mobile-nav"
        className="block text-white py-4 px-2 w-full text-center hover:bg-[rgba(255,255,255,0.04)] cursor-pointer"
      >
        {t('header.nav.contacto')}
      </a>
    </nav>
  );
}
