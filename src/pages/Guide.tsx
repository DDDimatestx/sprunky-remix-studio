
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Upload, Download } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector from "@/components/LanguageSelector";
import { Separator } from "@/components/ui/separator";

const Guide = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <FileText className="h-8 w-8 text-game-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
              {t('guide.title')}
            </span>
          </h1>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="characters">{t('guide.addCharacters')}</TabsTrigger>
            <TabsTrigger value="sounds">{t('guide.addSounds')}</TabsTrigger>
            <TabsTrigger value="deployment">{t('guide.deployment')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">{t('guide.addCharacters')}</h2>
              
              <div className="space-y-4">
                <p>
                  Чтобы добавить новых персонажей, нужно отредактировать файл <code>src/data/characters.ts</code>. 
                  Каждый персонаж имеет следующие свойства:
                </p>
                
                <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
                  <pre>{`interface CryptoCharacter {
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
}`}</pre>
                </div>
                
                <p>Пример добавления нового персонажа:</p>
                
                <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
                  <pre>{`// В файле src/data/characters.ts добавьте новый объект в массив cryptoCharacters:

export const cryptoCharacters: CryptoCharacter[] = [
  // ... существующие персонажи
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    rank: 11,
    price: 34.25,
    marketCap: 12500000000,
    image: "/images/avalanche.png", // Добавьте изображение в public/images
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
];`}</pre>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sounds" className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">{t('guide.addSounds')}</h2>
              
              <div className="space-y-4">
                <p>
                  Для добавления звуков в игру нужно:
                </p>
                
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Добавьте аудиофайлы в формате MP3 или WAV в папку <code>public/sounds/</code></li>
                  <li>Создайте или отредактируйте файл <code>src/hooks/use-sound-effects.ts</code> для управления звуками</li>
                </ol>
                
                <p>Пример реализации звуков:</p>
                
                <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
                  <pre>{`// src/hooks/use-sound-effects.ts
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
};`}</pre>
                </div>
                
                <p>Использование в компонентах:</p>
                
                <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
                  <pre>{`// В любом компоненте
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
};`}</pre>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deployment" className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">{t('guide.deployment')}</h2>
              
              <div className="space-y-4">
                <p className="font-semibold text-lg">1. Сборка проекта</p>
                <div className="bg-slate-900 text-white p-4 rounded-md">
                  <pre>{`# Установка зависимостей
npm install

# Сборка проекта
npm run build`}</pre>
                </div>
                
                <p>
                  После выполнения этих команд, собранный проект будет находиться в папке <code>dist</code>.
                </p>
                
                <Separator className="my-4" />
                
                <p className="font-semibold text-lg">2. Деплой через Lovable</p>
                <p>
                  Самый простой способ - использовать встроенную возможность публикации Lovable:
                </p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Откройте ваш проект в Lovable</li>
                  <li>Нажмите на кнопку "Поделиться" в правом верхнем углу</li>
                  <li>Выберите "Опубликовать"</li>
                </ol>
                
                <Separator className="my-4" />
                
                <p className="font-semibold text-lg">3. Деплой на свой хостинг</p>
                <p>
                  Для деплоя на свой хостинг или домен:
                </p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>
                    <strong>Загрузите сборку на веб-сервер:</strong>
                    <div className="bg-slate-900 text-white p-4 rounded-md mt-2">
                      <pre>{`# Скопируйте все файлы из папки dist на ваш сервер
scp -r ./dist/* user@your-server:/path/to/www/`}</pre>
                    </div>
                  </li>
                  <li>
                    <strong>Настройка Nginx (пример):</strong>
                    <div className="bg-slate-900 text-white p-4 rounded-md mt-2">
                      <pre>{`server {
    listen 80;
    server_name your-domain.com;
    root /path/to/www;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Кэширование статических файлов
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}`}</pre>
                    </div>
                  </li>
                  <li>
                    <strong>Настройка Apache (пример .htaccess):</strong>
                    <div className="bg-slate-900 text-white p-4 rounded-md mt-2">
                      <pre>{`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`}</pre>
                    </div>
                  </li>
                </ol>
                
                <Separator className="my-4" />
                
                <p className="font-semibold text-lg">4. Деплой на GitHub Pages</p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Добавьте в package.json скрипт для GitHub Pages</li>
                  <li>
                    <div className="bg-slate-900 text-white p-4 rounded-md mt-2">
                      <pre>{`# Установите пакет gh-pages
npm install --save-dev gh-pages

# Добавьте в package.json
"homepage": "https://username.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Деплой
npm run deploy`}</pre>
                    </div>
                  </li>
                </ol>
                
                <Separator className="my-4" />
                
                <p className="font-semibold text-lg">5. Деплой на Vercel или Netlify</p>
                <p>
                  Эти платформы позволяют делать деплой напрямую из репозитория:
                </p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Подключите ваш репозиторий к Vercel или Netlify</li>
                  <li>Укажите команду сборки: <code>npm run build</code></li>
                  <li>Укажите директорию для публикации: <code>dist</code></li>
                  <li>Настройте переменные окружения, если необходимо</li>
                </ol>
                
                <div className="flex items-center justify-center mt-8 gap-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Скачать полную инструкцию
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <Upload className="h-4 w-4" />
                    Связаться с поддержкой
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {t('common.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default Guide;
