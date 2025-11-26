import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useTechnologiesAnimation() {
  const tecnologiasTitleRef = useRef<HTMLHeadingElement>(null);
  const techFrontendRef = useRef<HTMLDivElement>(null);
  const techBackendRef = useRef<HTMLDivElement>(null);
  const techDatabasesRef = useRef<HTMLDivElement>(null);
  const techToolsRef = useRef<HTMLDivElement>(null);
  const techTestingRef = useRef<HTMLDivElement>(null);
  const techOthersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let triggersCreated = false;

    function setupTecnologiasAnimation() {
      if (triggersCreated) {
        return;
      }

      const tecnologiasTitle = tecnologiasTitleRef.current;
      const techFrontend = techFrontendRef.current;
      const techBackend = techBackendRef.current;
      const techDatabases = techDatabasesRef.current;
      const techTools = techToolsRef.current;
      const techTesting = techTestingRef.current;
      const techOthers = techOthersRef.current;

      if (!tecnologiasTitle) {
        console.error('❌ [TECNOLOGÍAS] No se encontró tecnologias-title');
        return;
      }

      gsap.set(tecnologiasTitle, {
        opacity: 0,
        y: -30,
        scale: 0.95,
      });

      const techCategories = [
        techFrontend,
        techBackend,
        techDatabases,
        techTools,
        techTesting,
      ];

      techCategories.forEach((category) => {
        if (category) {
          gsap.set(category, {
            opacity: 0,
            y: 60,
            scale: 0.95,
          });
        }
      });

      if (techOthers) {
        gsap.set(techOthers, {
          opacity: 0,
          y: 20,
        });
      }

      const proyectosSection = document.getElementById('proyectos');
      let proyectosEndScroll = 0;
      let titleAnimated = false;

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
        trigger: tecnologiasTitle,
        start: 'top 80%',
        onEnter: () => {
          const currentScroll = window.scrollY || window.pageYOffset;
          const rect = tecnologiasTitle.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

          if (
            isVisible &&
            (!proyectosSection ||
              currentScroll >= proyectosEndScroll ||
              proyectosEndScroll === 0)
          ) {
            if (!titleAnimated) {
              titleAnimated = true;
              gsap.to(tecnologiasTitle, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
              });
            }
          }
        },
        onEnterBack: () => {
          if (!titleAnimated) {
            titleAnimated = true;
            gsap.to(tecnologiasTitle, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            });
          }
        },
      });

      techCategories.forEach((category, index) => {
        if (!category) {
          console.warn(`⚠️ [TECNOLOGÍAS] Categoría ${index} no encontrada`);
          return;
        }

        let categoryAnimated = false;
        ScrollTrigger.create({
          trigger: category,
          start: 'top 85%',
          onEnter: () => {
            const currentScroll = window.scrollY || window.pageYOffset;
            const rect = category.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (
              isVisible &&
              (!proyectosSection ||
                currentScroll >= proyectosEndScroll ||
                proyectosEndScroll === 0)
            ) {
              if (!categoryAnimated) {
                categoryAnimated = true;
                gsap.to(category, {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1,
                  ease: 'power2.out',
                  delay: index * 0.15,
                });

                if (category === techTools && techOthers) {
                  gsap.to(techOthers, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.15 + 0.3,
                  });
                }
              }
            }
          },
          onEnterBack: () => {
            if (!categoryAnimated) {
              categoryAnimated = true;
              gsap.to(category, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                delay: index * 0.15,
              });

              if (category === techTools && techOthers) {
                gsap.to(techOthers, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  delay: index * 0.15 + 0.3,
                });
              }
            }
          },
        });

        if (!category.hasAttribute('data-hover-listener')) {
          category.setAttribute('data-hover-listener', 'true');
          category.addEventListener('mouseenter', () => {
            gsap.to(category, {
              scale: 1.02,
              y: -5,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          category.addEventListener('mouseleave', () => {
            gsap.to(category, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });

      // Animación de iconos
      const techIcons = document.querySelectorAll('.tech-icon');

      techIcons.forEach((icon, index) => {
        if (!icon) return;

        gsap.set(icon, {
          y: 0,
        });

        const movementAmount = 8;
        const duration = 2 + (index % 3) * 0.5;
        const delay = (index % 4) * 0.2;

        gsap.to(icon, {
          y: movementAmount,
          duration: duration,
          ease: 'sine.inOut',
          delay: delay,
          yoyo: true,
          repeat: -1,
        });
      });

      triggersCreated = true;
    }

    // Función para inicializar animaciones
    const initAnimations = () => {
      setTimeout(() => {
        setupTecnologiasAnimation();
        ScrollTrigger.refresh();
      }, 100);
    };

    // Escuchar el evento de proyectos completados
    window.addEventListener('proyectosCompleted', initAnimations);

    // Ocultar elementos inicialmente
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const tecnologiasTitle = tecnologiasTitleRef.current;
        const techFrontend = techFrontendRef.current;
        const techBackend = techBackendRef.current;
        const techDatabases = techDatabasesRef.current;
        const techTools = techToolsRef.current;
        const techOthers = techOthersRef.current;
        const techTesting = techTestingRef.current;

        if (tecnologiasTitle)
          gsap.set(tecnologiasTitle, { opacity: 0, y: -30, scale: 0.95 });
        [techFrontend, techBackend, techDatabases, techTools, techTesting].forEach(
          (cat) => {
            if (cat) gsap.set(cat, { opacity: 0, y: 60, scale: 0.95 });
          }
        );
        if (techOthers) gsap.set(techOthers, { opacity: 0, y: 20 });
      });
    } else {
      const tecnologiasTitle = tecnologiasTitleRef.current;
      const techFrontend = techFrontendRef.current;
      const techBackend = techBackendRef.current;
      const techDatabases = techDatabasesRef.current;
      const techTools = techToolsRef.current;
      const techOthers = techOthersRef.current;
      const techTesting = techTestingRef.current;

      if (tecnologiasTitle)
        gsap.set(tecnologiasTitle, { opacity: 0, y: -30, scale: 0.95 });
      [techFrontend, techBackend, techDatabases, techTools, techTesting].forEach(
        (cat) => {
          if (cat) gsap.set(cat, { opacity: 0, y: 60, scale: 0.95 });
        }
      );
      if (techOthers) gsap.set(techOthers, { opacity: 0, y: 20 });
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
      const tecnologiasTitle = tecnologiasTitleRef.current;
      if (tecnologiasTitle && !triggersCreated) {
        const rect = tecnologiasTitle.getBoundingClientRect();
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
    tecnologiasTitleRef,
    techFrontendRef,
    techBackendRef,
    techDatabasesRef,
    techToolsRef,
    techTestingRef,
    techOthersRef,
  };
}

