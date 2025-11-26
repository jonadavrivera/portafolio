import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useDecorativeCircle() {
  const circleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef.current;

    if (!circle || !container) return;

    gsap.set(circle, {
      transformOrigin: 'center center',
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    });

    let isHovered = false;
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    let currentRotation = 0;

    // Animación continua de giro suave
    const rotationTicker = () => {
      if (!isHovered) {
        currentRotation += 0.3;
        gsap.set(circle, {
          rotation: currentRotation,
          scaleX: 1 + Math.sin(currentRotation * 0.01) * 0.05,
          scaleY: 1 - Math.sin(currentRotation * 0.01) * 0.05,
        });
      }
    };

    gsap.ticker.add(rotationTicker);

    // Calcular posición relativa del mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animar el círculo siguiendo el mouse
    const hoverTicker = () => {
      if (isHovered) {
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;

        const scaleX = 1 + circleX * 0.3;
        const scaleY = 1 - circleY * 0.3;
        const rotate = currentRotation + circleX * 60;

        gsap.set(circle, {
          scaleX: scaleX,
          scaleY: scaleY,
          rotation: rotate,
        });
      }
    };

    gsap.ticker.add(hoverTicker);

    // Efecto al entrar el mouse
    const handleMouseEnter = () => {
      isHovered = true;
      gsap.to(circle, {
        scaleX: 1.2,
        scaleY: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    };

    // Efecto al salir el mouse
    const handleMouseLeave = () => {
      isHovered = false;
      gsap.to(circle, {
        scaleX: 1,
        scaleY: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });

      mouseX = 0;
      mouseY = 0;
      circleX = 0;
      circleY = 0;
    };

    // Efecto al hacer clic
    const handleClick = () => {
      gsap.to(circle, {
        scaleX: 1.4,
        scaleY: 0.6,
        rotation: currentRotation + 180,
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    return () => {
      gsap.ticker.remove(rotationTicker);
      gsap.ticker.remove(hoverTicker);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, []);

  return {
    circleRef,
    containerRef,
  };
}

