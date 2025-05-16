
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const params = useParams();

  // Получаем язык из URL-параметра или из localStorage
  const urlLang = params.lang as LanguageCode;
  const storedLang = localStorage.getItem('language') as LanguageCode | null;
  const isValidLang = urlLang && Object.keys(translations).includes(urlLang);

  // Приоритет: URL параметр > localStorage > 'en' (по умолчанию)
  const initialLang = isValidLang ? urlLang : (storedLang || 'en');

  const [language, setLanguageState] = useState<LanguageCode>(initialLang);

  // При изменении URL — обновляем язык
  useEffect(() => {
    if (isValidLang && urlLang !== language) {
      setLanguageState(urlLang);
      localStorage.setItem('language', urlLang);
    }
  }, [urlLang, isValidLang]);

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);

    // Перенаправляем пользователя на новую локаль в URL
    const pathParts = location.pathname.split('/');
    
    if (pathParts.length > 1) {
      // Первый элемент после "/" - это код языка
      pathParts[1] = lang;
      const newPath = pathParts.join('/');
      navigate(newPath, { replace: true });
    } else {
      // Если путь короткий (например, "/"), просто добавляем язык
      navigate(`/${lang}`, { replace: true });
    }
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
