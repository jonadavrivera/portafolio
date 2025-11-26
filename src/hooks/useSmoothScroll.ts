import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useSmoothScroll() {
  const location = useLocation();

  useEffect(() => {
    // Esperar a que el DOM esté listo
    const handleScroll = () => {
      const hash = location.hash;
      if (hash) {
        // Buscar primero el anchor específico, luego la sección
        const anchor = document.querySelector(`${hash}-anchor`);
        const element = anchor || document.querySelector(hash);
        
        if (element) {
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight + 40 : 140; // altura del header + padding extra
          
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      }
    };

    // Si hay hash, esperar un momento para que la página cargue
    if (location.hash) {
      // Si estamos en la misma página, hacer scroll inmediatamente
      if (window.location.pathname === '/') {
        setTimeout(handleScroll, 100);
      } else {
        // Si venimos de otra página, esperar más tiempo
        setTimeout(handleScroll, 500);
      }
    }
  }, [location]);
}

export function scrollToSection(sectionId: string) {
  // Buscar primero el anchor específico, luego la sección
  const anchor = document.querySelector(`${sectionId}-anchor`);
  const element = anchor || document.querySelector(sectionId);
  
  if (element) {
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight + 40 : 140; // altura del header + padding extra
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
  }
}

