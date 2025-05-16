
import { useLanguage } from "@/i18n/LanguageContext";
import { Monitor, Users, Trophy } from "lucide-react";

export const GameModesTab = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-6">{t('instructions.gameModes')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Режим КриптоДуэль */}
        <div className="bg-white/80 rounded-lg p-6 shadow-sm border">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-game-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-game-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">{t('instructions.cryptoDuelMode')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('instructions.cryptoDuelDescription')}
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-game-primary mr-2">•</span>
              {t('instructions.cryptoDuelFeature1')}
            </li>
            <li className="flex items-start">
              <span className="text-game-primary mr-2">•</span>
              {t('instructions.cryptoDuelFeature2')}
            </li>
            <li className="flex items-start">
              <span className="text-game-primary mr-2">•</span>
              {t('instructions.cryptoDuelFeature3')}
            </li>
          </ul>
        </div>
        
        {/* Режим Против Компьютера */}
        <div className="bg-white/80 rounded-lg p-6 shadow-sm border">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-game-secondary/20 flex items-center justify-center">
              <Monitor className="h-6 w-6 text-game-secondary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">{t('instructions.vsComputerMode')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('instructions.vsComputerDescription')}
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-game-secondary mr-2">•</span>
              {t('instructions.vsComputerFeature1')}
            </li>
            <li className="flex items-start">
              <span className="text-game-secondary mr-2">•</span>
              {t('instructions.vsComputerFeature2')}
            </li>
            <li className="flex items-start">
              <span className="text-game-secondary mr-2">•</span>
              {t('instructions.vsComputerFeature3')}
            </li>
          </ul>
        </div>
        
        {/* Режим Таблица лидеров */}
        <div className="bg-white/80 rounded-lg p-6 shadow-sm border">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-game-yellow/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-game-yellow" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">{t('instructions.leaderboardMode')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('instructions.leaderboardDescription')}
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-game-yellow mr-2">•</span>
              {t('instructions.leaderboardFeature1')}
            </li>
            <li className="flex items-start">
              <span className="text-game-yellow mr-2">•</span>
              {t('instructions.leaderboardFeature2')}
            </li>
            <li className="flex items-start">
              <span className="text-game-yellow mr-2">•</span>
              {t('instructions.leaderboardFeature3')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
