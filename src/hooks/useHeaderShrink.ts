import { useEffect } from 'react';
import type { RefObject } from 'react';

interface UseHeaderShrinkProps {
  headerRef: RefObject<HTMLElement | null>;
}

export function useHeaderShrink({ headerRef }: UseHeaderShrinkProps) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const cs = getComputedStyle(header);
    const initialTop =
      (cs.top && cs.top !== 'auto')
        ? cs.top
        : header.offsetTop
          ? `${header.offsetTop}px`
          : '32px';
    const initialMax = cs.maxWidth || '';

    const parsedMax = parseFloat(initialMax) || null;
    const shrunkMax = parsedMax
      ? `${Math.max(320, Math.round(parsedMax * 0.6))}px`
      : '';
    const parsedTop = parseFloat(initialTop) || 0;
    const targetTop = 5;
    const shrunkTop = parsedTop ? `${targetTop}px` : '';

    const threshold = 30;
    let ticking = false;
    let lastState = false;

    function setShrunk(on: boolean) {
      const currentHeader = headerRef.current;
      if (!currentHeader) return;
      
      if (on) {
        currentHeader.classList.add('shrunk');
        if (shrunkMax) currentHeader.style.maxWidth = shrunkMax;
        if (shrunkTop) currentHeader.style.top = shrunkTop;
      } else {
        currentHeader.classList.remove('shrunk');
        currentHeader.style.maxWidth = initialMax || '';
        currentHeader.style.top = initialTop || '';
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const should = window.scrollY > threshold;
          if (should !== lastState) {
            lastState = should;
            setShrunk(should);
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    setShrunk(window.scrollY > threshold);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headerRef]);
}

