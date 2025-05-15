
import { useLanguage } from "@/i18n/LanguageContext";

export const InstructionsFooter = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-4 border-t border-game-primary/20">
      <div className="container text-center text-sm text-muted-foreground">
        {t('common.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
};
