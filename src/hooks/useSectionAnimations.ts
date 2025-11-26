import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useExperienceAnimation() {
  const experienciaTitleRef = useRef<HTMLHeadingElement>(null);
  const experienciaCardRef = useRef<HTMLDivElement>(null);
  const experienciaLeftRef = useRef<HTMLDivElement>(null);
  const experienciaRightRef = useRef<HTMLDivElement>(null);
  const experienciaFreelanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const experienciaTitle = experienciaTitleRef.current;
    const experienciaCard = experienciaCardRef.current;
    const experienciaLeft = experienciaLeftRef.current;
    const experienciaRight = experienciaRightRef.current;
    const experienciaFreelance = experienciaFreelanceRef.current;

    if (!experienciaTitle || !experienciaCard) return;

    gsap.set([experienciaTitle, experienciaCard], {
      opacity: 0,
    });

    gsap.set(experienciaTitle, {
      y: -30,
      scale: 0.95,
    });

    gsap.set(experienciaCard, {
      y: 50,
      scale: 0.96,
    });

    if (experienciaLeft && experienciaRight) {
      gsap.set([experienciaLeft, experienciaRight], {
        opacity: 0,
        x: -20,
      });
    }

    gsap.to(experienciaTitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: experienciaTitle,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
    });

    gsap.to(experienciaCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: experienciaCard,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    });

    if (experienciaLeft && experienciaRight) {
      gsap.to([experienciaLeft, experienciaRight], {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: experienciaCard,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // Animación para la card freelance
    if (experienciaFreelance) {
      gsap.set(experienciaFreelance, {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      gsap.to(experienciaFreelance, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: experienciaFreelance,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars?.trigger === experienciaTitle ||
          trigger.vars?.trigger === experienciaCard ||
          trigger.vars?.trigger === experienciaFreelance
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return {
    experienciaTitleRef,
    experienciaCardRef,
    experienciaLeftRef,
    experienciaRightRef,
    experienciaFreelanceRef,
  };
}

export function useCareerAnimation() {
  const estudiosTitleRef = useRef<HTMLHeadingElement>(null);
  const estudiosDescriptionRef = useRef<HTMLParagraphElement>(null);
  const cardMaestriaRef = useRef<HTMLDivElement>(null);
  const cardCertificadoRef = useRef<HTMLDivElement>(null);
  const cardIngenieriaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const estudiosTitle = estudiosTitleRef.current;
    const estudiosDescription = estudiosDescriptionRef.current;
    const cardMaestria = cardMaestriaRef.current;
    const cardCertificado = cardCertificadoRef.current;
    const cardIngenieria = cardIngenieriaRef.current;

    if (!estudiosTitle || !estudiosDescription) return;

    gsap.set(estudiosTitle, {
      opacity: 0,
      y: -30,
      scale: 0.95,
    });

    gsap.set(estudiosDescription, {
      opacity: 0,
      y: 20,
      scale: 0.97,
    });

    gsap.to(estudiosTitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: estudiosTitle,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
    });

    gsap.to(estudiosDescription, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: estudiosDescription,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    });

    const cards = [cardMaestria, cardCertificado, cardIngenieria];

    cards.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

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
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars?.trigger === estudiosTitle ||
          trigger.vars?.trigger === estudiosDescription ||
          cards.includes(trigger.vars?.trigger as HTMLDivElement)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return {
    estudiosTitleRef,
    estudiosDescriptionRef,
    cardMaestriaRef,
    cardCertificadoRef,
    cardIngenieriaRef,
  };
}

