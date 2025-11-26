import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevLocationRef = useRef<string>(location.pathname);
  const isFirstRender = useRef(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    
    if (!overlay || !content) return;

    // Si es la primera renderización, solo hacer fade in suave sin overlay
    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(content, { opacity: 0 });
      gsap.to(content, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
      prevLocationRef.current = location.pathname;
      setDisplayChildren(children);
      return;
    }

    // Si es la misma ruta, no hacer transición
    if (prevLocationRef.current === location.pathname) {
      setDisplayChildren(children);
      return;
    }

    // Iniciar transición
    setIsTransitioning(true);
    
    // Ocultar contenido actual
    gsap.set(content, { opacity: 0 });
    
    // Mostrar overlay inmediatamente para cubrir el cambio
    gsap.set(overlay, { opacity: 1 });

    // Scroll al inicio antes de la transición (solo si no hay hash)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Actualizar el contenido después de que el overlay esté visible
    // Esto asegura que el nuevo contenido se renderice pero esté oculto
    setTimeout(() => {
      setDisplayChildren(children);
      
      // Esperar a que React renderice el nuevo contenido
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Asegurar que el nuevo contenido esté oculto
          if (content) {
            gsap.set(content, { opacity: 0 });
          }

          // Animación de transición entre páginas
          const tl = gsap.timeline({
            onComplete: () => {
              setIsTransitioning(false);
            },
          });

          // Mantener overlay visible un momento para ocultar el cambio
          tl.to({}, { duration: 0.15 })
            // Ocultar overlay y mostrar nuevo contenido simultáneamente
            .to(
              overlay,
              {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
              },
              '+=0.05'
            )
            .to(
              content,
              {
                opacity: 1,
                duration: 0.45,
                ease: 'power2.out',
              },
              '-=0.35'
            );

          prevLocationRef.current = location.pathname;
        });
      });
    }, 50); // Pequeño delay para asegurar que el overlay esté visible

    return () => {
      // Cleanup si el componente se desmonta
    };
  }, [location.pathname, location.hash, children]);

  return (
    <>
      {/* Overlay para transición suave */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-white dark:bg-[#212529] z-9999 pointer-events-none opacity-0"
        style={{ willChange: 'opacity' }}
      />
      
      {/* Contenedor del contenido */}
      <div
        ref={contentRef}
        className={`page-transition-container min-h-screen ${isTransitioning ? 'pointer-events-none' : ''}`}
        style={{ willChange: 'opacity' }}
      >
        {displayChildren}
      </div>
    </>
  );
}

