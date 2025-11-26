import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, ReactElement } from 'react';
import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';

export type Language = 'es' | 'en';

type Translations = typeof esTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tHtml: (key: string) => ReactElement | string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  es: esTranslations,
  en: enTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('site-lang');
    return (saved as Language) || 'es';
  });

  useEffect(() => {
    localStorage.setItem('site-lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  // Función para obtener traducciones usando notación de punto (ej: "hero.greeting")
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Si no encuentra la clave, devolver la clave original
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Función para obtener traducciones con soporte para HTML/React components
  // Soporta marcadores: <highlight>texto</highlight>, <tech>texto</tech>, <strong>texto</strong>
  const tHtml = (key: string): ReactElement | string => {
    const text = t(key);
    
    // Si no contiene marcadores, devolver como string
    if (!text.includes('<') || !text.includes('>')) {
      return text;
    }

    // Parsear el texto y convertir marcadores en componentes React
    const parts: (string | ReactElement)[] = [];
    let currentIndex = 0;
    const regex = /<(\w+)>(.*?)<\/\1>/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Agregar texto antes del marcador
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }

      const tagName = match[1];
      const content = match[2];

      // Crear componente según el tipo de marcador
      if (tagName === 'highlight' || tagName === 'tech') {
        parts.push(
          <span key={match.index} className="text-[#ff9800] font-semibold">
            {content}
          </span>
        );
      } else if (tagName === 'strong') {
        parts.push(
          <strong key={match.index}>
            {content}
          </strong>
        );
      } else {
        // Marcador desconocido, mantener como texto
        parts.push(match[0]);
      }

      currentIndex = regex.lastIndex;
    }

    // Agregar texto restante
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    // Si solo hay un elemento, devolverlo directamente, sino envolver en fragment
    if (parts.length === 1) {
      return parts[0] as ReactElement | string;
    }

    return <>{parts}</>;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tHtml }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

