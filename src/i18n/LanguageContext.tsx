import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { enTranslations } from './locales/en';
import { ruTranslations } from './locales/ru';
import { zhTranslations } from './locales/zh';

export type LanguageCode = 'en' | 'ru' | 'zh';

type Translations = {
  [key in LanguageCode]: typeof enTranslations;
};

const translations: Translations = {
  en: enTranslations,
  ru: ruTranslations,
  zh: zhTranslations,
};

export const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  ru: 'Русский',
  zh: '中文',
};

export const languageFlags: Record<LanguageCode, string> = {
  en: '🇺🇸',
  ru: '🇷🇺',
  zh: '🇨🇳',
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
  const location = useLocation();
  const navigate = useNavigate();

  const urlLang = location.pathname.split('/')[1] as LanguageCode;
  const isValidLang = Object.keys(translations).includes(urlLang);

  const [language, setLanguageState] = useState<LanguageCode>(
    isValidLang ? urlLang : 'en'
  );

  // При изменении URL — обновляем язык
  useEffect(() => {
    if (isValidLang && urlLang !== language) {
      setLanguageState(urlLang);
      localStorage.setItem('language', urlLang);
    }
  }, [urlLang]);

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);

    // Перенаправляем пользователя на новую локаль в URL
    const pathParts = location.pathname.split('/');
    pathParts[1] = lang;
    const newPath = pathParts.join('/') || '/';
    navigate(newPath, { replace: true });
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const parts = key.split('.');
    let value: any = translations[language];

    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      }, value);
    }

    return value;
  };

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
