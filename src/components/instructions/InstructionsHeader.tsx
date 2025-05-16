
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const InstructionsHeader = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  return (
    <div className="w-full bg-gradient-to-r from-game-primary to-game-secondary py-8">
      <div className="container">
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            className="self-start mb-4 text-white hover:bg-white/20 hover:text-white"
            onClick={() => navigate(`/${language}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          
          <h1 className="text-3xl font-bold text-white mb-2">{t('instructions.title')}</h1>
        </div>
      </div>
    </div>
  );
};
