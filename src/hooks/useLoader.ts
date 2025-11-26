import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseLoaderProps {
  onComplete: () => void;
}

export function useLoader({ onComplete }: UseLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const loaderInnerRef = useRef<HTMLDivElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const loaderInner = loaderInnerRef.current;
    const progressWrapper = progressWrapperRef.current;
    const progressNumber = progressNumberRef.current;

    if (!overlay || !loaderInner || !progressWrapper || !progressNumber) return;

    // Configuración del loader
    const MAX_WAIT_MS = 8000;
    const MIN_VISUAL_MS = 400;
    const REAL_PHASE_MAX = 50;
    const EXTRA_PHASE_MS = 900;

    const startTime = performance.now();

    // Esperar fuentes
    const waitForFonts = document.fonts
      ? document.fonts.ready.catch(() => {
          console.warn('[loader] Error en fonts.ready, continuando.');
        })
      : Promise.resolve();

    // Esperar imágenes críticas
    function waitForCriticalImages() {
      const imgs = Array.from(
        document.querySelectorAll('img[data-priority="high"]')
      );

      if (imgs.length === 0) return Promise.resolve();

      return Promise.allSettled(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              if ((img as HTMLImageElement).complete) return resolve();
              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
            })
        )
      );
    }

    const waitImages = waitForCriticalImages();

    // Datos iniciales opcionales
    const waitForData =
      (window as any).__INITIAL_DATA_PROMISE__ || Promise.resolve();

    // Combinar todo + timeout
    const allReady = Promise.allSettled([
      waitForFonts,
      waitImages,
      waitForData,
    ]);

    const timeout = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('[loader] Tiempo máximo alcanzado, mostrando app.');
        resolve();
      }, MAX_WAIT_MS);
    });

    const resourcesPromise = Promise.race([allReady, timeout]);

    // Animación del porcentaje (GSAP)
    const vh = window.innerHeight || loaderInner.getBoundingClientRect().height;
    const elRect = progressWrapper.getBoundingClientRect();
    const elHeight = elRect.height;

    const centerWhenBottomAtBottom = vh / 2 - elHeight / 2;
    const centerWhenTopAtTop = -((vh / 2 - elHeight / 2) - 10);

    const startY = centerWhenBottomAtBottom;
    const endY = centerWhenTopAtTop;

    const minScale = 0.7;
    const maxScale = 1.8;

    const state = { value: 0 };

    function updateVisual(v: number) {
      const safe = Math.max(0, Math.min(100, v));
      if (progressNumber) {
        progressNumber.textContent = Math.round(safe).toString();
      }

      const t = safe / 100;
      const currentY = gsap.utils.interpolate(startY, endY, t);
      const currentScale = gsap.utils.interpolate(minScale, maxScale, t);

      gsap.set(progressWrapper, {
        y: currentY,
        scale: currentScale,
      });
    }

    // Estado inicial
    gsap.set(progressWrapper, { y: startY, scale: minScale });
    updateVisual(0);

    // Fase 1: 0 → REAL_PHASE_MAX
    const animStart = performance.now();
    const easeFn = gsap.parseEase('power2.out');

    const tick = () => {
      const elapsed = performance.now() - animStart;
      const t = Math.min(elapsed / MAX_WAIT_MS, 0.99);
      const eased = easeFn(t);

      const target = eased * (REAL_PHASE_MAX * 0.98);

      if (target > state.value) {
        state.value = target;
        updateVisual(state.value);
      }
    };

    gsap.ticker.add(tick);

    // Cuando los recursos estén listos
    resourcesPromise.then(() => {
      const elapsed = performance.now() - startTime;
      const extraDelay = Math.max(MIN_VISUAL_MS - elapsed, 0);

      setTimeout(() => {
        gsap.ticker.remove(tick);

        // Asegurar que llegue al 50%
        gsap.to(state, {
          value: REAL_PHASE_MAX,
          duration: 0.3,
          ease: 'power2.out',
          onUpdate: () => updateVisual(state.value),
          onComplete: () => {
            // De 50% a 100%
            gsap.to(state, {
              value: 100,
              duration: EXTRA_PHASE_MS / 1000,
              ease: 'power2.inOut',
              onUpdate: () => updateVisual(state.value),
              onComplete: () => {
                showContent();
              },
            });
          },
        });
      }, extraDelay);
    });

    // Mostrar contenido
    function showContent() {
      const tl = gsap.timeline();

      tl.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          if (overlay) {
            overlay.style.display = 'none';
          }
          onComplete();
        },
      });
    }

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [onComplete]);

  return {
    overlayRef,
    loaderInnerRef,
    progressWrapperRef,
    progressNumberRef,
  };
}

