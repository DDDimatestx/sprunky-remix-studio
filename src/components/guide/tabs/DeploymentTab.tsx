
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DeploymentTab = () => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default DeploymentTab;
