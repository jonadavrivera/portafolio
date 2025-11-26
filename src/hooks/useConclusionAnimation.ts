import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useConclusionAnimation() {
  const conclusionTitleRef = useRef<HTMLHeadingElement>(null);
  const conclusionTextRef = useRef<HTMLParagraphElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let triggersCreated = false;

    function setupConclusionAnimation() {
      if (triggersCreated) {
        return;
      }

      const conclusionTitle = conclusionTitleRef.current;
      const conclusionText = conclusionTextRef.current;
      const contactButton = contactButtonRef.current;

      if (!conclusionTitle) {
        console.error('❌ [CONCLUSIÓN] No se encontró conclusion-title');
        return;
      }

      gsap.set([conclusionTitle, conclusionText, contactButton], {
        opacity: 0,
        y: 30,
      });

      const proyectosSection = document.getElementById('proyectos');
      let proyectosEndScroll = 0;
      let conclusionAnimated = false;

      setTimeout(() => {
        const proyectosTrigger = ScrollTrigger.getAll().find((st) => {
          const trigger = st.vars?.trigger;
          return (
            trigger === proyectosSection ||
            trigger === '#proyectos' ||
            (typeof trigger === 'string' && trigger.includes('proyectos'))
          );
        });
        if (proyectosTrigger && proyectosTrigger.end) {
          proyectosEndScroll = proyectosTrigger.end;
        }
      }, 500);

      ScrollTrigger.create({
        trigger: conclusionTitle,
        start: 'top 80%',
        onEnter: () => {
          const currentScroll = window.scrollY || window.pageYOffset;
          const rect = conclusionTitle.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

          if (
            isVisible &&
            (!proyectosSection ||
              currentScroll >= proyectosEndScroll ||
              proyectosEndScroll === 0)
          ) {
            if (!conclusionAnimated) {
              conclusionAnimated = true;

              gsap.to([conclusionTitle, conclusionText, contactButton], {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.2,
              });
            }
          }
        },
        onEnterBack: () => {
          if (!conclusionAnimated) {
            conclusionAnimated = true;

            gsap.to([conclusionTitle, conclusionText, contactButton], {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              stagger: 0.2,
            });
          }
        },
      });

      triggersCreated = true;
    }

    // Función para inicializar animaciones
    const initAnimations = () => {
      setTimeout(() => {
        setupConclusionAnimation();
        ScrollTrigger.refresh();
      }, 100);
    };

    // Escuchar el evento de proyectos completados
    window.addEventListener('proyectosCompleted', initAnimations);

    // Ocultar elementos inicialmente
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const conclusionTitle = conclusionTitleRef.current;
        const conclusionText = conclusionTextRef.current;
        const contactButton = contactButtonRef.current;

        if (conclusionTitle)
          gsap.set([conclusionTitle, conclusionText, contactButton], {
            opacity: 0,
            y: 30,
          });
      });
    } else {
      const conclusionTitle = conclusionTitleRef.current;
      const conclusionText = conclusionTextRef.current;
      const contactButton = contactButtonRef.current;

      if (conclusionTitle)
        gsap.set([conclusionTitle, conclusionText, contactButton], {
          opacity: 0,
          y: 30,
        });
    }

    // Fallback: Inicializar animaciones después de un tiempo si el evento no se disparó
    // Esto es especialmente importante para móvil donde el evento podría no dispararse
    const fallbackTimeout = setTimeout(() => {
      if (!triggersCreated) {
        initAnimations();
      }
    }, 2000);

    // También intentar inicializar cuando la sección sea visible
    const checkVisibility = () => {
      const conclusionTitle = conclusionTitleRef.current;
      if (conclusionTitle && !triggersCreated) {
        const rect = conclusionTitle.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          initAnimations();
        }
      }
    };

    // Verificar visibilidad al hacer scroll
    window.addEventListener('scroll', checkVisibility, { passive: true });
    
    // Verificar visibilidad inicial después de un delay
    setTimeout(checkVisibility, 1500);

    return () => {
      window.removeEventListener('proyectosCompleted', initAnimations);
      window.removeEventListener('scroll', checkVisibility);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return {
    conclusionTitleRef,
    conclusionTextRef,
    contactButtonRef,
  };
}

