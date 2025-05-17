import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoCharacters } from "../data/characters";
import CharacterSelector from "../components/CharacterSelector";
import CharacterDetails from "../components/CharacterDetails";
import CharacterSearch from "../components/CharacterSearch";
import { CryptoCharacter } from "../types/character";
import { Coins, Gamepad, Trophy, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import PageLayout from "@/components/layouts/PageLayout";
import { getCachedCoins } from "../services/coingeckoService";

const Index = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const [allCharacters, setAllCharacters] = useState<CryptoCharacter[]>(cryptoCharacters);
  const [filteredCharacters, setFilteredCharacters] = useState<CryptoCharacter[]>(cryptoCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<CryptoCharacter | null>(
    cryptoCharacters[0] || null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Load data from CoinGecko or cache
  useEffect(() => {
    const loadCryptoData = async () => {
      setIsLoading(true);
      try {
        const coinsData = await getCachedCoins();
        
        if (coinsData && coinsData.length > 0) {
          setAllCharacters(coinsData);
          setFilteredCharacters(coinsData);
          setSelectedCharacter(coinsData[0]);
          
          if (coinsData[0]?.lastUpdated) {
            setLastUpdated(coinsData[0].lastUpdated);
          }
          
          toast({
            title: "Data updated",
            description: `Loaded ${coinsData.length} cryptocurrencies`,
            duration: 3000,
          });
        } else {
          // Fallback to static data
          setAllCharacters(cryptoCharacters);
          setFilteredCharacters(cryptoCharacters);
          setSelectedCharacter(cryptoCharacters[0]);
          
          toast({
            title: "Using backup data",
            description: "Could not fetch current cryptocurrency data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading crypto data:", error);
        toast({
          title: "Data loading error",
          description: "Using backup cryptocurrency data",
          variant: "destructive",
        });
        
        setAllCharacters(cryptoCharacters);
        setFilteredCharacters(cryptoCharacters);
        setSelectedCharacter(cryptoCharacters[0]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCryptoData();
  }, []);

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

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    const filtered = allCharacters.filter(
      character => 
        character.name.toLowerCase().includes(term) ||
        character.symbol.toLowerCase().includes(term)
    );
    setFilteredCharacters(filtered);
    
    // Reset selection if no match found or select first result
    if (filtered.length === 0) {
      // Keep the current selection
    } else if (!filtered.find(c => c.id === selectedCharacter?.id)) {
      setSelectedCharacter(filtered[0]);
    }
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
              
              {/* Search component */}
              <CharacterSearch onSearch={handleSearch} />
              
              {isLoading ? (
                <div className="flex items-center justify-center h-64 text-center">
                  <p>Loading cryptocurrencies...</p>
                </div>
              ) : filteredCharacters.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-center">
                  <p>No cryptocurrencies found matching your search.</p>
                </div>
              ) : (
                <>
                  {selectedCharacter ? (
                    <>
                      <div className="w-full max-w-3xl">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl md:text-2xl font-bold text-center">Character Details</h2>
                          {lastUpdated && (
                            <p className="text-xs text-muted-foreground">
                              Last updated: {new Date(lastUpdated).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <CharacterDetails character={selectedCharacter} />
                      </div>
                      
                      <div className="w-full pt-4">
                        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
                          Select Character ({filteredCharacters.length} available)
                        </h2>
                        <CharacterSelector
                          characters={filteredCharacters}
                          selectedCharacter={selectedCharacter}
                          onSelectCharacter={handleSelectCharacter}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-center">
                      <p>No character selected. Please select a cryptocurrency.</p>
                    </div>
                  )}
                </>
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
                  <p className="font-semibold">Data Update System Added</p>
                  <p className="text-sm text-muted-foreground">May 17, 2025</p>
                  <p className="mt-2 text-sm">We now fetch real-time cryptocurrency data from CoinGecko API, updating every 6 hours!</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-semibold">Top 100 Coins Available</p>
                  <p className="text-sm text-muted-foreground">May 15, 2025</p>
                  <p className="mt-2 text-sm">CryptoHeroes now features the top 100 cryptocurrencies by market cap.</p>
                </div>
                <div>
                  <p className="font-semibold">Search Functionality</p>
                  <p className="text-sm text-muted-foreground">May 10, 2025</p>
                  <p className="mt-2 text-sm">Find your favorite cryptocurrencies quickly with our new search feature!</p>
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
