
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { enTranslations } from './locales/en';
import { ruTranslations } from './locales/ru';
import { zhTranslations } from './locales/zh';

// Тип для наших языковых данных
export type LanguageCode = 'en' | 'ru' | 'zh';

// Тип для всех доступных переводов
type Translations = {
  [key in LanguageCode]: typeof enTranslations;
};

// Все доступные переводы
const translations: Translations = {
  en: enTranslations,
  ru: ruTranslations,
  zh: zhTranslations,
};

// Имена языков для отображения
export const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  ru: 'Русский',
  zh: '中文',
};

// Флаги для выбора языка
export const languageFlags: Record<LanguageCode, string> = {
  en: '🇺🇸',
  ru: '🇷🇺',
  zh: '🇨🇳',
};

// Тип для нашего контекста
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  allLanguages: LanguageCode[];
}

// Создаем контекст
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Провайдер локализации
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Проверяем, сохранен ли язык в localStorage
    const savedLanguage = localStorage.getItem('language') as LanguageCode;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Если нет, пытаемся определить предпочтительный язык браузера
    const browserLang = navigator.language.split('-')[0] as LanguageCode;
    if (Object.keys(translations).includes(browserLang)) {
      return browserLang;
    }
    
    // По умолчанию - английский
    return 'en';
  });

  // Сохраняем выбранный язык в localStorage
  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  // Устанавливаем язык документа для SEO
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Функция для получения перевода по ключу
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Разделяем ключ на части, например "home.title" -> ["home", "title"]
    const parts = key.split('.');
    
    // Начинаем с корня переводов для текущего языка
    let value: any = translations[language];
    
    // Проходим по частям ключа, чтобы добраться до нужного перевода
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        // Если перевода нет, возвращаем ключ
        return key;
      }
    }
    
    // Если значение - строка, обрабатываем параметры
    if (typeof value === 'string' && params) {
      // Заменяем параметры {name} на их значения
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      }, value);
    }
    
    // Если значение - массив, возвращаем его как есть
    return value;
  };

  // Получаем все доступные языки
  const allLanguages = Object.keys(translations) as LanguageCode[];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, allLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования в компонентах
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
