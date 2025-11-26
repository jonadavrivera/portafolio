import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsPageAnimation(projectCount?: number) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const description = descriptionRef.current;
    const container = projectsContainerRef.current;

    if (!title || !description || !container) return;

    // Obtener todas las cards de proyectos
    const projectCards = container.querySelectorAll('.project-card-item');

    // Configurar estado inicial solo en el primer render
    if (projectCards.length > 0) {
      gsap.set(projectCards, {
        opacity: 0,
        y: 30,
        scale: 0.95,
      });
    }

    // Animación del título (solo una vez)
    if (title.style.opacity === '') {
      gsap.set([title, description], {
        opacity: 0,
        y: -30,
      });

      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Animación de la descripción
      gsap.to(description, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: description,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Animación de las cards con stagger (se actualiza cuando cambian los filtros)
    if (projectCards.length > 0) {
      const tl = gsap.timeline();
      
      projectCards.forEach((card, index) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          index * 0.05
        );

        // Efecto hover con GSAP
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.03,
            y: -8,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars?.trigger === title ||
          trigger.vars?.trigger === description
        ) {
          // No matar los triggers del título y descripción
        }
      });
    };
  }, [projectCount]);

  return {
    titleRef,
    descriptionRef,
    projectsContainerRef,
  };
}

