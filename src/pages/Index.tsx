
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoCharacters } from "../data/characters";
import CharacterSelector from "../components/CharacterSelector";
import CharacterDetails from "../components/CharacterDetails";
import { CryptoCharacter } from "../types/character";
import { Coins, Gamepad, Trophy, User, FileText, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import PageLayout from "@/components/layouts/PageLayout";

const Index = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const [selectedCharacter, setSelectedCharacter] = useState<CryptoCharacter | null>(
    cryptoCharacters[0] || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Проверяем статус авторизации
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setIsLoggedIn(true);
        setUsername(userData.username);
      } catch (e) {
        // Если данные повреждены, сбрасываем
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleSelectCharacter = (character: CryptoCharacter) => {
    setSelectedCharacter(character);
    toast({
      title: t('home.characterSelected', { name: character.name }),
      description: t('home.characterSelectedDesc', { symbol: character.symbol, rank: character.rank }),
      duration: 3000,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    
    toast({
      title: t('common.logout'),
      description: t('common.logoutSuccess'),
    });
  };

  return (
    <PageLayout>
      {/* Баннер */}
      <div className="w-full bg-gradient-to-r from-game-primary to-game-secondary py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0 md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('home.bannerTitle')}</h2>
              <p className="text-sm md:text-base opacity-90">{t('home.bannerDescription')}</p>
            </div>
            <div className="md:w-1/3">
              <Button 
                className="w-full bg-white text-game-primary hover:bg-white/90 transition-opacity px-6 py-8 h-auto"
                onClick={() => navigate(`/${language}/instructions`)}
              >
                <BookOpen className="mr-2 h-6 w-6" />
                <span className="text-lg font-bold">{t('home.instructions')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <Button 
                  onClick={() => navigate(`/${language}/battle`)}
                  className="bg-gradient-to-r from-game-primary to-game-secondary hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <Gamepad className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">{t('home.cryptoDuel')}</span>
                </Button>
                
                <Button 
                  onClick={() => navigate(`/${language}/battle-vs-computer`)}
                  className="bg-gradient-to-r from-game-primary to-game-accent hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <Gamepad className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">{t('home.vsComputer')}</span>
                </Button>
                
                <Button 
                  onClick={() => navigate(`/${language}/leaderboard`)}
                  className="bg-gradient-to-r from-game-yellow to-game-orange hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <Trophy className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">{t('home.leaderboard')}</span>
                </Button>
                
                <Button 
                  onClick={() => navigate(`/${language}/guide`)}
                  className="bg-gradient-to-r from-game-accent to-game-primary/70 hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <BookOpen className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">{t('home.guide')}</span>
                </Button>
              </div>
              
              {selectedCharacter ? (
                <>
                  <div className="w-full max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">{t('home.characterDetails')}</h2>
                    <CharacterDetails character={selectedCharacter} />
                  </div>
                  
                  <div className="w-full pt-4">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">{t('home.selectCharacter')}</h2>
                    <CharacterSelector
                      characters={cryptoCharacters}
                      selectedCharacter={selectedCharacter}
                      onSelectCharacter={handleSelectCharacter}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 text-center">
                  <p>{t('common.loading')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Новости проекта */}
          <div className="lg:w-1/4">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-game-primary" />
                {t('home.projectNews')}
              </h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-semibold">{t('home.newsItem1Title')}</p>
                  <p className="text-sm text-muted-foreground">{t('home.newsItem1Date')}</p>
                  <p className="mt-2 text-sm">{t('home.newsItem1Text')}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-semibold">{t('home.newsItem2Title')}</p>
                  <p className="text-sm text-muted-foreground">{t('home.newsItem2Date')}</p>
                  <p className="mt-2 text-sm">{t('home.newsItem2Text')}</p>
                </div>
                <div>
                  <p className="font-semibold">{t('home.newsItem3Title')}</p>
                  <p className="text-sm text-muted-foreground">{t('home.newsItem3Date')}</p>
                  <p className="mt-2 text-sm">{t('home.newsItem3Text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Index;
