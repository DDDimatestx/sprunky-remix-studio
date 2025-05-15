
import { useLanguage } from "@/i18n/LanguageContext";

export const GameRulesTab = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('instructions.gameRules')}</h2>
      
      <div className="space-y-4">
        <p className="mb-4">
          {t('instructions.gameDescription')}
        </p>
        
        <h3 className="text-xl font-semibold">{t('instructions.howToPlay')}</h3>
        <ol className="list-decimal ml-6 space-y-2">
          <li>{t('instructions.rule1')}</li>
          <li>{t('instructions.rule2')}</li>
          <li>{t('instructions.rule3')}</li>
          <li>{t('instructions.rule4')}</li>
          <li>{t('instructions.rule5')}</li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-6">{t('instructions.battleMechanics')}</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>{t('instructions.mechanics1')}</li>
          <li>{t('instructions.mechanics2')}</li>
          <li>{t('instructions.mechanics3')}</li>
          <li>{t('instructions.mechanics4')}</li>
        </ul>
        
        <div className="bg-game-primary/10 rounded-lg p-4 mt-6">
          <h4 className="font-semibold">{t('instructions.tip')}</h4>
          <p>{t('instructions.tipText')}</p>
        </div>
      </div>
    </div>
  );
};
