import { useEffect, useRef, useState } from 'react';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const btn = menuButtonRef.current;
    const menu = menuRef.current;
    if (!btn || !menu) return;

    function openMenu() {
      if (btn) {
        btn.setAttribute('aria-expanded', 'true');
      }
      if (menu) {
        menu.classList.remove('translate-x-full');
        menu.classList.add('translate-x-0');
      }
      setIsOpen(true);
    }

    function closeMenu() {
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
      }
      if (menu) {
        menu.classList.remove('translate-x-0');
        menu.classList.add('translate-x-full');
      }
      setIsOpen(false);
    }

    const handleClick = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    };

    btn.addEventListener('click', handleClick);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menu &&
        !menu.contains(e.target as Node) &&
        btn &&
        !btn.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    const handleResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };

    window.addEventListener('resize', handleResize);

    const links = menu.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      btn.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      links.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
    };
  }, []);

  return {
    isOpen,
    menuButtonRef,
    menuRef,
  };
}

