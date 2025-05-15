
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const GuideHeader = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="w-full py-6 border-b border-game-primary/20">
      <div className="container flex items-center justify-between">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
          <FileText className="h-8 w-8 text-game-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
            {t('guide.title')}
          </span>
        </h1>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default GuideHeader;
