
# Руководство администратора CryptoHeroes

Это руководство содержит информацию о том, как настраивать и изменять приложение CryptoHeroes.

## Содержание

1. [Добавление новых персонажей](#добавление-новых-персонажей)
2. [Добавление звуковых эффектов](#добавление-звуковых-эффектов)
3. [Изменение интерфейса](#изменение-интерфейса)
4. [Локализация](#локализация)
5. [Деплой приложения](#деплой-приложения)

## Добавление новых персонажей

Персонажи определены в файле `src/data/characters.ts`. Каждый персонаж имеет следующую структуру:

```typescript
interface CryptoCharacter {
  id: string;          // Уникальный идентификатор (например, "bitcoin")
  name: string;        // Отображаемое имя персонажа
  symbol: string;      // Символ криптовалюты (например, "BTC")
  rank: number;        // Ранг в рейтинге криптовалют
  price: number;       // Цена в USD
  marketCap: number;   // Рыночная капитализация в USD
  image: string;       // URL к изображению (можно добавить в public/images)
  color: string;       // Основной цвет (в формате HEX, например "#F7931A")
  description: string; // Краткое описание персонажа
  stats: {
    strength: number;     // Показатель силы (1-100)
    speed: number;        // Показатель скорости (1-100)
    intelligence: number; // Показатель интеллекта (1-100)
    charisma: number;     // Показатель харизмы (1-100)
  };
  statsDescriptions?: {   // Описания показателей (опционально)
    strength: string;     // Описание силы
    speed: string;        // Описание скорости
    intelligence: string; // Описание интеллекта
    charisma: string;     // Описание харизмы
  };
}
```

Чтобы добавить нового персонажа:

1. Добавьте изображение персонажа в папку `public/images/` (рекомендуемый размер 512x512px, формат PNG с прозрачным фоном)
2. Откройте файл `src/data/characters.ts`
3. Добавьте новый объект в массив `cryptoCharacters`

Пример добавления нового персонажа:

```typescript
{
  id: "avalanche",
  name: "Avalanche",
  symbol: "AVAX",
  rank: 11,
  price: 34.25,
  marketCap: 12500000000,
  image: "/images/avalanche.png",
  color: "#E84142",
  description: "Быстрая, низкозатратная и экологичная платформа для dApps и систем с несколькими блокчейнами.",
  stats: {
    strength: 76,
    speed: 92,
    intelligence: 84,
    charisma: 71
  },
  statsDescriptions: {
    strength: "Высокая рыночная капитализация и стабильность",
    speed: "Одна из самых быстрых сетей с высокой пропускной способностью",
    intelligence: "Продвинутая технология консенсуса и смарт-контрактов",
    charisma: "Растущее сообщество разработчиков и пользователей"
  }
}
```

## Добавление звуковых эффектов

Для добавления звуков в игру:

1. Добавьте аудиофайлы в формате MP3 или WAV в папку `public/sounds/`
2. Если хук `useSoundEffects` не существует, создайте файл `src/hooks/use-sound-effects.ts`:

```typescript
import { useState, useEffect } from 'react';

type SoundType = 'battle' | 'win' | 'lose' | 'draw' | 'select' | 'click';

const soundFiles: Record<SoundType, string> = {
  battle: '/sounds/battle.mp3',
  win: '/sounds/win.mp3',
  lose: '/sounds/lose.mp3',
  draw: '/sounds/draw.mp3',
  select: '/sounds/select.mp3',
  click: '/sounds/click.mp3',
};

export const useSoundEffects = () => {
  const [sounds, setSounds] = useState<Record<SoundType, HTMLAudioElement | null>>({
    battle: null,
    win: null,
    lose: null,
    draw: null,
    select: null,
    click: null,
  });
  
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('sound-muted');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Инициализируем аудио элементы
    const audioElements: Record<SoundType, HTMLAudioElement> = {
      battle: new Audio(soundFiles.battle),
      win: new Audio(soundFiles.win),
      lose: new Audio(soundFiles.lose),
      draw: new Audio(soundFiles.draw),
      select: new Audio(soundFiles.select),
      click: new Audio(soundFiles.click),
    };
    
    // Предзагрузка
    Object.values(audioElements).forEach(audio => {
      audio.load();
      audio.volume = 0.5; // Уровень громкости по умолчанию
    });
    
    setSounds(audioElements);
    
    // Очистка при размонтировании
    return () => {
      Object.values(audioElements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('sound-muted', JSON.stringify(newMuted));
  };

  const playSound = (type: SoundType) => {
    if (!isMuted && sounds[type]) {
      sounds[type]!.currentTime = 0;
      sounds[type]!.play();
    }
  };

  return { playSound, isMuted, toggleMute };
};
```

Использование в компонентах:

```typescript
import { useSoundEffects } from '../hooks/use-sound-effects';

const BattleComponent = () => {
  const { playSound, isMuted, toggleMute } = useSoundEffects();
  
  const startBattle = () => {
    playSound('battle');
    // Другие действия...
  };
  
  return (
    <div>
      <button onClick={toggleMute}>
        {isMuted ? 'Включить звук' : 'Выключить звук'}
      </button>
      <button onClick={startBattle}>
        Начать дуэль
      </button>
    </div>
  );
};
```

## Изменение интерфейса

### Основные компоненты и их расположение

- **Главная страница**: `src/pages/Index.tsx`
- **Страница дуэли**: `src/pages/Battle.tsx`
- **Страница дуэли с компьютером**: `src/pages/BattleVsComputer.tsx`
- **Таблица лидеров**: `src/pages/Leaderboard.tsx`
- **Инструкция**: `src/pages/Instructions.tsx`
- **Руководство администратора**: `src/pages/Guide.tsx`

### Стили и темы

Приложение использует Tailwind CSS для стилизации. Основные цвета определены в файле `tailwind.config.ts`:

```typescript
const colors = {
  "game-primary": "#7367F0",
  "game-secondary": "#9E95F5",
  "game-accent": "#28C76F",
  "game-yellow": "#FF9F43",
  "game-orange": "#FF6B4A",
};
```

Для изменения цветовой схемы приложения, отредактируйте эти значения.

### Добавление новой страницы

1. Создайте новый файл в папке `src/pages/`, например `src/pages/NewPage.tsx`
2. Добавьте компонент страницы:

```tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const NewPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <header className="w-full py-6 border-b border-game-primary/20">
        <div className="container flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Название новой страницы
          </h1>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {/* Содержимое страницы */}
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default NewPage;
```

3. Добавьте маршрут в `src/App.tsx`:

```tsx
import NewPage from "./pages/NewPage";

// ...

<Routes>
  {/* ... существующие маршруты */}
  <Route path="/new-page" element={<NewPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

4. Добавьте ссылку на новую страницу в нужном месте, например в меню или на главной странице.

## Локализация

Приложение поддерживает многоязычность с помощью системы локализации. Файлы локализации находятся в папке `src/i18n/locales/`:

- Английский: `src/i18n/locales/en.ts`
- Русский: `src/i18n/locales/ru.ts`
- Китайский: `src/i18n/locales/zh.ts`

### Добавление нового языка

1. Создайте новый файл в папке `src/i18n/locales/`, например `src/i18n/locales/es.ts` для испанского
2. Скопируйте структуру из существующего файла локализации и переведите все строки
3. Обновите файл `src/i18n/LanguageContext.tsx`, добавив новый язык:

```tsx
// Импортируйте новый файл локализации
import { esTranslations } from './locales/es';

// Добавьте в объект translations
const translations: Record<string, any> = {
  en: enTranslations,
  ru: ruTranslations,
  zh: zhTranslations,
  es: esTranslations, // Добавьте новый язык
};

// Добавьте в массив языков
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' }, // Добавьте новый язык
];
```

### Добавление новых строк локализации

1. Добавьте новые ключи и значения в файлы локализации в соответствующих разделах
2. Используйте функцию `t()` для доступа к этим строкам в компонентах:

```tsx
import { useLanguage } from "@/i18n/LanguageContext";

const Component = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('section.newKey')}</h1>
    </div>
  );
};
```

## Деплой приложения

### Сборка проекта

```bash
# Установка зависимостей
npm install

# Сборка проекта
npm run build
```

После выполнения этих команд, собранный проект будет находиться в папке `dist`.

### Деплой на свой хостинг

Для деплоя на свой хостинг или домен:

1. Загрузите сборку на веб-сервер:

```bash
# Скопируйте все файлы из папки dist на ваш сервер
scp -r ./dist/* user@your-server:/path/to/www/
```

2. Настройте веб-сервер:

Для Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/www;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Для Apache (.htaccess):

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Деплой на GitHub Pages

1. Установите пакет gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Добавьте в package.json:

```json
"homepage": "https://username.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Выполните команду:

```bash
npm run deploy
```

### Деплой на Vercel или Netlify

Эти платформы позволяют делать деплой напрямую из репозитория:

1. Подключите ваш репозиторий к Vercel или Netlify
2. Укажите команду сборки: `npm run build`
3. Укажите директорию для публикации: `dist`
4. Настройте переменные окружения, если необходимо

## Заключение

Это руководство покрывает основные аспекты настройки и изменения приложения CryptoHeroes. Для более сложных изменений может потребоваться более глубокое понимание React и TypeScript.

Если у вас возникнут вопросы или проблемы, обратитесь к разработчикам приложения или откройте issue в репозитории проекта.
