import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('site-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const header = document.getElementById('header');
    const logoEl = header?.querySelector('a[aria-label="Ir al inicio"]');
    const langBtn = document.getElementById('langBtn');
    const themeBtn = document.getElementById('themeBtn');
    const hamburgerBars = header?.querySelectorAll('.hamburger span');

    if (theme === 'light') {
      root.classList.remove('dark');
      if (themeBtn) {
        const icon = themeBtn.querySelector('#themeIcon');
        if (icon) {
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>`;
        }
      }
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#0f0f0f';
      if (header) {
        header.style.background = 'rgba(255,255,255,0.6)';
        header.style.border = '1px solid rgba(0,0,0,0.08)';
      }
      if (logoEl) (logoEl as HTMLElement).style.color = '#0f0f0f';
      if (langBtn) (langBtn as HTMLElement).style.color = '#0f0f0f';
      if (themeBtn) (themeBtn as HTMLElement).style.color = '#0f0f0f';
      hamburgerBars?.forEach((b) => ((b as HTMLElement).style.background = '#0f0f0f'));
    } else {
      root.classList.add('dark');
      if (themeBtn) {
        const icon = themeBtn.querySelector('#themeIcon');
        if (icon) {
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>`;
        }

      }
      body.style.backgroundColor = '#212529';
      body.style.color = '#ffffff';
      if (header) {
        header.style.background = 'rgba(189,189,189,0.14)';
        header.style.border = '1px solid rgba(189,189,189,0.22)';
      }
      if (logoEl) (logoEl as HTMLElement).style.color = '#ffffff';
      if (langBtn) (langBtn as HTMLElement).style.color = '#ffffff';
      if (themeBtn) (themeBtn as HTMLElement).style.color = '#ffffff';
      hamburgerBars?.forEach((b) => ((b as HTMLElement).style.background = '#ffffff'));
    }

    localStorage.setItem('site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}


