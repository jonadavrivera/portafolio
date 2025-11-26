import { useLanguage as useLanguageContext } from '../contexts/LanguageContext';

export function useLanguage() {
  const { language, toggleLanguage } = useLanguageContext();

  return { 
    lang: language, 
    toggleLang: toggleLanguage 
  };
}

