
import { useLanguage } from "@/i18n/LanguageContext";
import { Gamepad, Trophy, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const GameModesTab = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('instructions.gameModes')}</h2>
      
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-game-primary/20 flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-game-primary" />
            </div>
            <h3 className="text-lg font-semibold text-center">{t('instructions.cryptoDuelMode')}</h3>
          </div>
          <div className="md:w-3/4">
            <p>{t('instructions.cryptoDuelDescription')}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>{t('instructions.cryptoDuelFeature1')}</li>
              <li>{t('instructions.cryptoDuelFeature2')}</li>
              <li>{t('instructions.cryptoDuelFeature3')}</li>
            </ul>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-game-accent/20 flex items-center justify-center mb-2">
              <Gamepad className="h-8 w-8 text-game-accent" />
            </div>
            <h3 className="text-lg font-semibold text-center">{t('instructions.vsComputerMode')}</h3>
          </div>
          <div className="md:w-3/4">
            <p>{t('instructions.vsComputerDescription')}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>{t('instructions.vsComputerFeature1')}</li>
              <li>{t('instructions.vsComputerFeature2')}</li>
              <li>{t('instructions.vsComputerFeature3')}</li>
            </ul>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-game-yellow/20 flex items-center justify-center mb-2">
              <Trophy className="h-8 w-8 text-game-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-center">{t('instructions.leaderboardMode')}</h3>
          </div>
          <div className="md:w-3/4">
            <p>{t('instructions.leaderboardDescription')}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>{t('instructions.leaderboardFeature1')}</li>
              <li>{t('instructions.leaderboardFeature2')}</li>
              <li>{t('instructions.leaderboardFeature3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
