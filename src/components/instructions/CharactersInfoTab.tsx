
import { useLanguage } from "@/i18n/LanguageContext";

export const CharactersInfoTab = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('instructions.charactersInfo')}</h2>
      
      <div className="space-y-4">
        <p>
          {t('instructions.charactersDescription')}
        </p>
        
        <h3 className="text-xl font-semibold mt-6">{t('instructions.characterStats')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-game-primary">{t('stats.strength')}</h4>
            <p className="text-sm">{t('stats.strengthDesc')}</p>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-game-secondary">{t('stats.speed')}</h4>
            <p className="text-sm">{t('stats.speedDesc')}</p>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-game-accent">{t('stats.intelligence')}</h4>
            <p className="text-sm">{t('stats.intelligenceDesc')}</p>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-game-yellow">{t('stats.charisma')}</h4>
            <p className="text-sm">{t('stats.charismaDesc')}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">{t('instructions.strategy')}</h3>
        <p>{t('instructions.strategyDescription')}</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>{t('instructions.strategyTip1')}</li>
          <li>{t('instructions.strategyTip2')}</li>
          <li>{t('instructions.strategyTip3')}</li>
        </ul>
      </div>
    </div>
  );
};
