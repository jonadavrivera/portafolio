import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsAnimation() {
  const proyectosSectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const proyectosSection = proyectosSectionRef.current;
    if (!proyectosSection) return;

    function isMobile() {
      return window.innerWidth < 768;
    }

    let proyectosTriggers: ScrollTrigger[] = [];
    let mobileAnimationsSetup = false;
    let mobileObservers: IntersectionObserver[] = [];
    let mobileTouchTweens: Map<HTMLElement, gsap.core.Tween> = new Map();
    let mobileScaleTweens: Map<HTMLElement, gsap.core.Tween> = new Map();

    function setupDesktopAnimations() {
      const wrapper = document.getElementById('cards-wrapper');
      const cards = gsap.utils.toArray('.project-card');
      const introText = document.getElementById('intro-text');
      const outroText = document.getElementById('outro-text');

      if (!wrapper) {
        console.warn('[PROYECTOS] No se encontró cards-wrapper');
        return;
      }

      // Contenedor visual real (para pantallas ultra anchas)
      const viewContainer = wrapper.parentElement;
      const viewWidth = viewContainer?.clientWidth || window.innerWidth;

      // El carrusel empieza tal cual está en el layout
      const initialX = 0;
      gsap.set(wrapper, { x: initialX });

      const totalWidth = wrapper.scrollWidth;
      const outroTextWidth = viewWidth;
      const finalX = -(totalWidth - outroTextWidth);
      const scrollDistance = Math.abs(finalX - initialX);

      // Scroll horizontal principal
      const proyectosElement = document.getElementById('proyectos');
      if (!proyectosElement) {
        console.warn('[PROYECTOS] No se encontró el elemento #proyectos');
        return;
      }

      const horizontalTween = gsap.to(wrapper, {
        x: finalX,
        ease: 'none',
        scrollTrigger: {
          trigger: proyectosElement,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            // Disparar evento personalizado para activar las animaciones
            window.dispatchEvent(new CustomEvent('proyectosCompleted'));
          },
          onEnterBack: () => {
            console.log('proyectos');
          },
        },
      });

      // Guardar referencia al trigger principal
      proyectosTriggers.push(horizontalTween.scrollTrigger!);

      // ---- ONDA VERTICAL (ABAJO -> CENTRO -> ARRIBA) con opacidad rápida ----
      cards.forEach((card) => {
        let amplitude;
        if (window.innerWidth < 640) {
          amplitude = 70;
        } else if (window.innerWidth >= 1600) {
          amplitude = 90;
        } else {
          amplitude = 120;
        }
        const angle = 6;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card as Element,
            containerAnimation: horizontalTween,
            start: 'center 120%',
            end: 'center -20%',
            scrub: 1,
          },
        });

        // Guardar referencia al trigger de la card
        proyectosTriggers.push(tl.scrollTrigger!);

        // 0 → 0.2: de ABAJO a CENTRO + fade rápido
        tl.fromTo(
          card as Element,
          {
            y: amplitude,
            rotateZ: angle,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            rotateZ: 0,
            opacity: 1,
            scale: 1,
            ease: 'sine.inOut',
            duration: 0.2,
          }
        )
          // 0.2 → 1: de CENTRO a ARRIBA (ya con opacidad 1)
          .to(card as Element, {
            y: -amplitude,
            rotateZ: -angle,
            ease: 'sine.inOut',
            duration: 0.8,
          });
      });

      // ---- Intro text ----
      if (introText) {
        const introTrigger = ScrollTrigger.create({
          trigger: introText,
          containerAnimation: horizontalTween,
          start: 'left 50%',
          end: 'left -50%',
          scrub: 1,
        });
        proyectosTriggers.push(introTrigger);
      }

      // ---- Outro text ----
      if (outroText) {
        const outroTrigger = ScrollTrigger.create({
          trigger: outroText,
          containerAnimation: horizontalTween,
          start: 'left 50%',
          end: 'left 0%',
          scrub: 1,
        });
        proyectosTriggers.push(outroTrigger);
      }
    }

    function setupMobileAnimations() {
      if (mobileAnimationsSetup) return;

      const title = document.getElementById('proyectos-mobile-title');
      const introText = document.getElementById('intro-text-mobile');
      const cards = gsap.utils.toArray('.project-card-mobile');
      const outroText = document.getElementById('outro-text-mobile');

      const titleElements = [title, introText].filter(
        (el) => el !== null
      ) as HTMLElement[];

      // Animación del título e intro text - simplificada
      if (title && titleElements.length > 0) {
        const titleTL = gsap.fromTo(
          titleElements,
          {
            opacity: 0,
            y: -30,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
        if (titleTL.scrollTrigger) {
          proyectosTriggers.push(titleTL.scrollTrigger);
        }
      }

      // Optimización: usar will-change para mejor rendimiento
      const validCards = cards.filter((card) => card !== null) as HTMLElement[];
      
      validCards.forEach((card) => {
        if (!card) return;
        card.style.willChange = 'transform, opacity';
      });

      // Animación de las cards - rotación y movimiento vertical (sin scale)
      validCards.forEach((card, index) => {
        if (!card) return;

        const initialRotation = index % 2 === 0 ? -8 : 8;

        // Estado inicial - rotación, opacidad y posición vertical
        gsap.set(card, {
          opacity: 0,
          y: 60,
          rotation: initialRotation,
          transformOrigin: 'center center',
          force3D: true,
        });

        // Timeline con animación de entrada, centrado y salida usando scrub
        const cardTL = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 100%', // Comienza cuando la card está completamente fuera de la vista
            end: 'top -20%', // Termina cuando la card está completamente fuera arriba
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Entrada: de abajo a centro con rotación (0-30% del timeline)
        cardTL.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            rotation: initialRotation,
            force3D: true,
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            ease: 'power2.out',
            force3D: true,
          },
          0
        )
        // Permanecer centrado y visible (30-70% del timeline)
        .to(card, {
          opacity: 1,
          y: 0,
          rotation: 0,
          ease: 'none',
          force3D: true,
        }, 0.3)
        // Salida: de centro hacia arriba con rotación inversa (70-100% del timeline)
        .to(card, {
          opacity: 0,
          y: -80,
          rotation: -initialRotation,
          ease: 'power2.in',
          force3D: true,
        }, 0.7);

        // Guardar referencia al trigger
        if (cardTL.scrollTrigger) {
          proyectosTriggers.push(cardTL.scrollTrigger);
        }

        // Touch interactions simplificadas
        const touchStartHandler = () => {
          const existingTween = mobileTouchTweens.get(card);
          if (existingTween) existingTween.kill();
          const tween = gsap.to(card, {
            scale: 0.97,
            duration: 0.15,
            ease: 'power2.out',
            force3D: true,
          });
          mobileTouchTweens.set(card, tween);
        };

        const touchEndHandler = () => {
          const existingTween = mobileTouchTweens.get(card);
          if (existingTween) existingTween.kill();
          const tween = gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true,
          });
          mobileTouchTweens.set(card, tween);
        };

        card.addEventListener('touchstart', touchStartHandler, { passive: true });
        card.addEventListener('touchend', touchEndHandler, { passive: true });
        
        // Guardar handlers para limpieza
        (card as any).__touchHandlers = { touchStartHandler, touchEndHandler };
      });

      // Animación del outro text
      if (outroText) {
        const outroTL = gsap.fromTo(
          outroText,
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: outroText,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
              onEnter: () => {
                window.dispatchEvent(new CustomEvent('proyectosCompleted'));
              },
            },
          }
        );
        if (outroTL.scrollTrigger) {
          proyectosTriggers.push(outroTL.scrollTrigger);
        }
      } else {
        // Fallback: disparar evento después de un delay
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('proyectosCompleted'));
        }, 2000);
      }

      mobileAnimationsSetup = true;
    }

    function setupAnimations() {
      // Limpiar triggers anteriores
      proyectosTriggers.forEach((trigger) => {
        if (trigger) {
          try {
            trigger.kill();
          } catch (e) {
            // El trigger ya fue eliminado o no existe
          }
        }
      });
      proyectosTriggers = [];
      
      // Limpiar observers móviles
      mobileObservers.forEach((observer) => {
        observer.disconnect();
      });
      mobileObservers = [];
      
      // Limpiar touch tweens
      mobileTouchTweens.forEach((tween) => {
        if (tween) tween.kill();
      });
      mobileTouchTweens.clear();
      
      // Limpiar scale tweens
      mobileScaleTweens.forEach((tween) => {
        if (tween) tween.kill();
      });
      mobileScaleTweens.clear();
      
      // Limpiar event listeners de touch
      const cards = gsap.utils.toArray('.project-card-mobile') as HTMLElement[];
      cards.forEach((card) => {
        const handlers = (card as any).__touchHandlers;
        if (handlers) {
          card.removeEventListener('touchstart', handlers.touchStartHandler);
          card.removeEventListener('touchend', handlers.touchEndHandler);
          delete (card as any).__touchHandlers;
        }
        // Resetear will-change
        card.style.willChange = 'auto';
      });
      
      mobileAnimationsSetup = false;

      if (isMobile()) {
        // Versión móvil
        setupMobileAnimations();
      } else {
        // Versión desktop
        setupDesktopAnimations();
      }
    }

    // Inicializar al cargar - esperar a que el DOM esté completamente listo
    const initAnimations = () => {
      const isMobileView = isMobile();
      
      if (isMobileView) {
        // Para móvil, verificar que las cards móviles existan
        const mobileCards = document.querySelectorAll('.project-card-mobile');
        const proyectosSection = document.getElementById('proyectos');
        
        if (!proyectosSection || mobileCards.length === 0) {
          // Si no están disponibles, intentar de nuevo en el siguiente frame
          requestAnimationFrame(initAnimations);
          return;
        }
        
        // Verificar que al menos una card tenga dimensiones válidas
        const firstCard = mobileCards[0] as HTMLElement;
        if (firstCard && (firstCard.offsetHeight === 0 || firstCard.offsetWidth === 0)) {
          requestAnimationFrame(initAnimations);
          return;
        }
      } else {
        // Para desktop, verificar que el wrapper exista
        const wrapper = document.getElementById('cards-wrapper');
        const proyectosSection = document.getElementById('proyectos');
        
        if (!wrapper || !proyectosSection) {
          requestAnimationFrame(initAnimations);
          return;
        }

        // Verificar que el wrapper tenga un scrollWidth válido
        if (wrapper.scrollWidth === 0 || wrapper.offsetWidth === 0) {
          requestAnimationFrame(initAnimations);
          return;
        }
      }

      setupAnimations();
      // Refrescar ScrollTrigger después de configurar para asegurar que todo esté correcto
      ScrollTrigger.refresh();
    };

    // Esperar a que el componente esté montado y los elementos estén disponibles
    // Usar múltiples requestAnimationFrame para asegurar que React haya renderizado todo
    const startInit = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            initAnimations();
          });
        });
      });
    };

    // Ejecutar después de un pequeño delay para asegurar que React haya renderizado
    // Aumentar el delay para móvil para asegurar que las cards estén renderizadas
    timeoutRef.current = setTimeout(() => {
      startInit();
    }, isMobile() ? 400 : 200);

    // También escuchar el evento load por si acaso
    const loadHandler = () => {
      initAnimations();
    };
    window.addEventListener('load', loadHandler);

    // Reconfigurar al cambiar tamaño
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupAnimations();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('load', loadHandler);
      window.removeEventListener('resize', handleResize);
      
      // Limpiar todos los triggers
      proyectosTriggers.forEach((trigger) => {
        if (trigger) {
          try {
            trigger.kill();
          } catch (e) {
            // El trigger ya fue eliminado o no existe
          }
        }
      });
      proyectosTriggers = [];
      
      // Limpiar observers móviles
      mobileObservers.forEach((observer) => {
        observer.disconnect();
      });
      mobileObservers = [];
      
      // Limpiar touch tweens
      mobileTouchTweens.forEach((tween) => {
        if (tween) tween.kill();
      });
      mobileTouchTweens.clear();
      
      // Limpiar scale tweens
      mobileScaleTweens.forEach((tween) => {
        if (tween) tween.kill();
      });
      mobileScaleTweens.clear();
      
      // Limpiar event listeners de touch
      const cards = gsap.utils.toArray('.project-card-mobile') as HTMLElement[];
      cards.forEach((card) => {
        const handlers = (card as any).__touchHandlers;
        if (handlers) {
          card.removeEventListener('touchstart', handlers.touchStartHandler);
          card.removeEventListener('touchend', handlers.touchEndHandler);
          delete (card as any).__touchHandlers;
        }
        // Resetear will-change
        card.style.willChange = 'auto';
      });
    };
  }, []);

  return { proyectosSectionRef };
}


