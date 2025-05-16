
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { enTranslations } from './locales/en';

export type LanguageCode = 'en';

type Translations = {
  [key in LanguageCode]: typeof enTranslations;
};

const translations: Translations = {
  en: enTranslations,
};

export const languageNames: Record<LanguageCode, string> = {
  en: 'English',
};

export const languageFlags: Record<LanguageCode, string> = {
  en: '🇺🇸',
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  allLanguages: LanguageCode[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Default language is English
  const [language, setLanguageState] = useState<LanguageCode>('en');
  
  // Function to translate keys
  const t = (key: string, params?: Record<string, string | number>): string => {
    const parts = key.split('.');
    let value: any = translations[language];

    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      }, value);
    }

    return typeof value === 'string' ? value : key;
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const allLanguages = Object.keys(translations) as LanguageCode[];

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, allLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
