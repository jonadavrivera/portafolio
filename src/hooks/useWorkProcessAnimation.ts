import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useWorkProcessAnimation() {
  const procesoTitleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let triggersCreated = false;

    function setupWorkProcessAnimation() {
      if (triggersCreated) {
        return;
      }

      const procesoTitle = procesoTitleRef.current;
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (!procesoTitle) {
        return;
      }

      // Estado inicial del título
      gsap.set(procesoTitle, {
        opacity: 0,
        y: -30,
        scale: 0.95,
      });

      // Estado inicial de las cards
      const cards = [card1, card2, card3];
      cards.forEach((card) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.95,
          });
        }
      });

      // Animación del título
      let titleAnimated = false;
      ScrollTrigger.create({
        trigger: procesoTitle,
        start: 'top 80%',
        onEnter: () => {
          if (!titleAnimated) {
            titleAnimated = true;
            gsap.to(procesoTitle, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            });
          }
        },
        onEnterBack: () => {
          if (!titleAnimated) {
            titleAnimated = true;
            gsap.to(procesoTitle, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            });
          }
        },
      });

      // Animación de las cards con delay escalonado
      cards.forEach((card, index) => {
        if (!card) return;

        let cardAnimated = false;
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            if (!cardAnimated) {
              cardAnimated = true;
              gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                delay: index * 0.15,
              });
            }
          },
          onEnterBack: () => {
            if (!cardAnimated) {
              cardAnimated = true;
              gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                delay: index * 0.15,
              });
            }
          },
        });

        // Efecto hover en las cards
        if (!card.hasAttribute('data-hover-listener')) {
          card.setAttribute('data-hover-listener', 'true');
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.02,
              y: -5,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });

      triggersCreated = true;
    }

    // Función para inicializar animaciones
    const initAnimations = () => {
      setTimeout(() => {
        setupWorkProcessAnimation();
        ScrollTrigger.refresh();
      }, 100);
    };

    // Ocultar elementos inicialmente
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const procesoTitle = procesoTitleRef.current;
        const card1 = card1Ref.current;
        const card2 = card2Ref.current;
        const card3 = card3Ref.current;

        if (procesoTitle)
          gsap.set(procesoTitle, { opacity: 0, y: -30, scale: 0.95 });
        [card1, card2, card3].forEach((card) => {
          if (card) gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
        });
      });
    } else {
      const procesoTitle = procesoTitleRef.current;
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (procesoTitle)
        gsap.set(procesoTitle, { opacity: 0, y: -30, scale: 0.95 });
      [card1, card2, card3].forEach((card) => {
        if (card) gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
      });
    }

    // Fallback: Inicializar animaciones después de un tiempo
    const fallbackTimeout = setTimeout(() => {
      if (!triggersCreated) {
        initAnimations();
      }
    }, 2000);

    // Verificar visibilidad al hacer scroll
    const checkVisibility = () => {
      const procesoTitle = procesoTitleRef.current;
      if (procesoTitle && !triggersCreated) {
        const rect = procesoTitle.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          initAnimations();
        }
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    
    // Verificar visibilidad inicial después de un delay
    setTimeout(checkVisibility, 1500);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return {
    procesoTitleRef,
    card1Ref,
    card2Ref,
    card3Ref,
  };
}

