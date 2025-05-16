
import { useLanguage } from '@/i18n/LanguageContext';

const GuideFooter = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container my-8">
      <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
        <h3 className="text-xl font-semibold mb-4">CryptoHeroes Admin</h3>
        <p className="text-muted-foreground">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </div>
  );
};

export default GuideFooter;
