
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoCharacters } from "../data/characters";
import CharacterSelector from "../components/CharacterSelector";
import CharacterDetails from "../components/CharacterDetails";
import { CryptoCharacter } from "../types/character";
import { Coins, Gamepad, Trophy, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import PageLayout from "@/components/layouts/PageLayout";

const Index = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const [selectedCharacter, setSelectedCharacter] = useState<CryptoCharacter | null>(
    cryptoCharacters[0] || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check auth status
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setIsLoggedIn(true);
        setUsername(userData.username);
      } catch (e) {
        // If data is corrupted, reset
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
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <PageLayout>
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-game-primary to-game-secondary py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0 md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to CryptoHeroes!</h2>
              <p className="text-sm md:text-base opacity-90">Battle with your favorite cryptocurrencies and see which one comes out on top! Learn the rules in the instructions section.</p>
            </div>
            <div className="md:w-1/3">
              <Button 
                className="w-full bg-white text-game-primary hover:bg-white/90 transition-opacity px-6 py-8 h-auto"
                onClick={() => navigate(`/${language}/instructions`)}
              >
                <BookOpen className="mr-2 h-6 w-6" />
                <span className="text-lg font-bold">Instructions</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <Button 
                  onClick={() => navigate(`/${language}/battle`)}
                  className="bg-gradient-to-r from-game-primary to-game-secondary hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <Gamepad className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">CryptoDuel</span>
                </Button>
                
                <Button 
                  onClick={() => navigate(`/${language}/battle-vs-computer`)}
                  className="bg-gradient-to-r from-game-primary to-game-accent hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <Gamepad className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">Vs Computer</span>
                </Button>
                
                <Button 
                  onClick={() => navigate(`/${language}/leaderboard`)}
                  className="bg-gradient-to-r from-game-yellow to-game-orange hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <Trophy className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">Leaderboard</span>
                </Button>
                
                <Button 
                  onClick={() => navigate(`/${language}/guide`)}
                  className="bg-gradient-to-r from-game-accent to-game-primary/70 hover:opacity-90 transition-opacity px-6 py-8 h-auto"
                >
                  <BookOpen className="mr-2 h-6 w-6" />
                  <span className="text-lg font-bold">Game Guide</span>
                </Button>
              </div>
              
              {selectedCharacter ? (
                <>
                  <div className="w-full max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Character Details</h2>
                    <CharacterDetails character={selectedCharacter} />
                  </div>
                  
                  <div className="w-full pt-4">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Select Character</h2>
                    <CharacterSelector
                      characters={cryptoCharacters}
                      selectedCharacter={selectedCharacter}
                      onSelectCharacter={handleSelectCharacter}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 text-center">
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>

          {/* Project News */}
          <div className="lg:w-1/4">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Coins className="h-5 w-5 text-game-primary" />
                Project News
              </h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-semibold">Game Update 2.0</p>
                  <p className="text-sm text-muted-foreground">May 10, 2025</p>
                  <p className="mt-2 text-sm">New characters added! 10 new cryptocurrencies join the battle.</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-semibold">Weekend Tournament</p>
                  <p className="text-sm text-muted-foreground">May 5, 2025</p>
                  <p className="mt-2 text-sm">Join our weekend tournament and win exclusive prizes!</p>
                </div>
                <div>
                  <p className="font-semibold">Community Challenge</p>
                  <p className="text-sm text-muted-foreground">May 1, 2025</p>
                  <p className="mt-2 text-sm">Reach 10,000 battles collectively to unlock special characters.</p>
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
