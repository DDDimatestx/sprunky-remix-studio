
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Получаем язык для редиректа при первом запуске
const getInitialLanguage = () => {
  const savedLang = localStorage.getItem('language');
  if (savedLang && ['en', 'ru', 'zh'].includes(savedLang)) {
    return savedLang;
  }
  
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'ru', 'zh'].includes(browserLang)) {
    return browserLang;
  }
  
  return 'en'; // Язык по умолчанию
};

// Если открыта страница по корню, перенаправляем на страницу с языком
if (window.location.pathname === '/') {
  window.location.replace(`/${getInitialLanguage()}`);
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
