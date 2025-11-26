import { useEffect, useState } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState<'es' | 'en'>(() => {
    const saved = localStorage.getItem('site-lang');
    return (saved as 'es' | 'en') || 'es';
  });

  useEffect(() => {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.textContent = lang.toUpperCase();
    }
    localStorage.setItem('site-lang', lang);
    // TODO: Cambiar contenido de texto / hrefs si tienes rutas o etiquetas localizadas
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return { lang, toggleLang };
}

