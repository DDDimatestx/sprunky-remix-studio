
import { ReactNode } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, User } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-game-background via-purple-900/80 to-pink-900/80">
      {/* Неоновый фоновый эффект */}
      <div className="fixed inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-purple/10 pointer-events-none"></div>
      
      <header className="relative w-full py-6 border-b border-neon-pink/30 backdrop-blur-sm bg-black/20">
        <div className="container flex items-center justify-between">
          <h1 
            className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3 cursor-pointer neon-text"
            onClick={() => navigate(`/${language}`)}
          >
            <Coins className="h-8 w-8 text-neon-pink drop-shadow-lg" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple">
              {t('home.title')}
            </span>
          </h1>
          
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-right">
                  <p className="font-medium text-white">{username}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-xs text-neon-pink/80 hover:text-neon-pink transition-colors"
                  >
                    {t('common.logout')}
                  </button>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink/30 to-neon-purple/30 border border-neon-pink/50 flex items-center justify-center neon-glow">
                  <User className="h-5 w-5 text-neon-pink" />
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/${language}/auth`)}
                className="flex items-center gap-2 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/20 hover:border-neon-pink transition-all neon-glow"
              >
                <User className="h-4 w-4" />
                {t('common.login')}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative flex-1 container py-8">
        {title && (
          <h1 className="text-3xl font-bold mb-8 text-center neon-text text-white">{title}</h1>
        )}
        {children}
      </main>

      <footer className="relative py-4 border-t border-neon-purple/30 backdrop-blur-sm bg-black/20">
        <div className="container text-center text-sm text-white/70">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
