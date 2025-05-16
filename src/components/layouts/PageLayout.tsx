
import { ReactNode } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, User } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  const username = isLoggedIn ? JSON.parse(localStorage.getItem("user") || "{}").username : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <header className="w-full py-6 border-b border-game-primary/20">
        <div className="container flex items-center justify-between">
          <h1 
            className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/${language}`)}
          >
            <Coins className="h-8 w-8 text-game-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
              {t('home.title')}
            </span>
          </h1>
          
          <div className="flex items-center gap-3">
            <LanguageSelector />
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-right">
                  <p className="font-medium">{username}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    {t('common.logout')}
                  </button>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/${language}/auth`)}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {t('common.login')}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {title && (
          <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
        )}
        {children}
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
