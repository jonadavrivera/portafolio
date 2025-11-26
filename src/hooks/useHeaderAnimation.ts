import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useHeaderAnimation(loaderComplete: boolean) {
  const headerRef = useRef<HTMLElement>(null);
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const headerNavRef = useRef<HTMLElement>(null);
  const headerRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo inicializar cuando el loader haya terminado
    if (!loaderComplete) return;

    const header = headerRef.current;
    const headerLogo = headerLogoRef.current;
    const headerNav = headerNavRef.current;
    const headerRight = headerRightRef.current;

    if (!header || !headerLogo) return;

    // Esperar a que el DOM esté completamente renderizado
    const initHeader = () => {
      const logoWidth = headerLogo.offsetWidth;
      const padding = 48;

      // Estado inicial: header pequeño, centrado, solo logo visible
      gsap.set(header, {
        opacity: 0,
        width: logoWidth + padding,
        maxWidth: logoWidth + padding,
        left: '50%',
        right: 'auto',
        marginLeft: 0,
        marginRight: 0,
        x: '-50%',
        justifyContent: 'center',
      });

      if (headerNav && headerRight) {
        gsap.set([headerNav, headerRight], {
          opacity: 0,
          width: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        });
      }

      // Aparecer suavemente el header pequeño con logo centrado
      gsap.to(header, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    // Esperar un frame para asegurar que el layout esté listo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initHeader();
      });
    });
  }, [loaderComplete]);

  const expandHeader = () => {
    const header = headerRef.current;
    const headerNav = headerNavRef.current;
    const headerRight = headerRightRef.current;

    if (!header) return;

    // Asegurar que los elementos estén disponibles
    if (!headerNav || !headerRight) {
      // Si no están disponibles, intentar de nuevo en el siguiente frame
      requestAnimationFrame(() => {
        expandHeader();
      });
      return;
    }

    const headerTL = gsap.timeline();

    // Estirar el header al tamaño completo y mostrar el resto del contenido
    headerTL
      .to(header, {
        width: 'calc(100% - 2rem)',
        maxWidth: '1200px',
        left: '50%',
        right: 'auto',
        x: '-50%',
        justifyContent: 'space-between',
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          // Remover la clase initial-small después de que se expanda
          header.classList.remove('initial-small');
        },
      })
      .to(
        [headerNav, headerRight],
        {
          opacity: 1,
          width: 'auto',
          overflow: 'visible',
          pointerEvents: 'auto',
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
  };

  return {
    headerRef,
    headerLogoRef,
    headerNavRef,
    headerRightRef,
    expandHeader,
  };
}

