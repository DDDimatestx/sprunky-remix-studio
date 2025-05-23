import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoCharacter } from "../types/character";
import { Button } from "@/components/ui/button";
import { Gamepad, Trophy, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CharacterBattleCard from "@/components/CharacterBattleCard";
import BattleArena from "@/components/BattleArena";
import { useLanguage } from "@/i18n/LanguageContext";
import PageLayout from "@/components/layouts/PageLayout";
import CharacterSearch from "@/components/CharacterSearch";
import CharacterSelector from "@/components/CharacterSelector";
import { getCachedCoins } from "@/services/coingeckoService";
import { calculateBattleScore } from "@/lib/game-utils";

const Battle = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [playerCharacter, setPlayerCharacter] = useState<CryptoCharacter | null>(null);
  const [opponentCharacter, setOpponentCharacter] = useState<CryptoCharacter | null>(null);
  const [battleStatus, setBattleStatus] = useState<"selecting" | "ready" | "battling" | "results">("selecting");
  const [battleResult, setBattleResult] = useState<{ winner: CryptoCharacter | null; score: { player: number; opponent: number } }>({
    winner: null,
    score: { player: 0, opponent: 0 }
  });
  
  // State for character selection
  const [allCharacters, setAllCharacters] = useState<CryptoCharacter[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<CryptoCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load all characters from CoinGecko on init
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const characters = await getCachedCoins();
        setAllCharacters(characters);
        setFilteredCharacters(characters);
      } catch (error) {
        console.error("Error loading characters:", error);
        toast({
          title: "Error loading characters",
          description: "Could not load cryptocurrency data. Please try refreshing the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCharacters();
  }, []);
  
  // Reset selection on page init
  useEffect(() => {
    setPlayerCharacter(null);
    setOpponentCharacter(null);
    setBattleStatus("selecting");
  }, []);

  const handleSelectCharacter = (character: CryptoCharacter, isPlayer: boolean) => {
    if (isPlayer) {
      setPlayerCharacter(character);
      toast({
        title: `${character.name} selected!`,
        description: `You selected ${character.symbol} for battle`,
        duration: 2000,
      });
    } else {
      setOpponentCharacter(character);
      toast({
        title: `${character.name} will be your opponent!`,
        description: `${character.symbol} is preparing for battle`,
        duration: 2000,
      });
    }

    // If both characters selected, go to "ready" status
    if ((isPlayer && opponentCharacter) || (!isPlayer && playerCharacter)) {
      setBattleStatus("ready");
    }
  };

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    const filtered = allCharacters.filter(
      character => 
        character.name.toLowerCase().includes(term) ||
        character.symbol.toLowerCase().includes(term)
    );
    setFilteredCharacters(filtered);
  };
  
  const startBattle = () => {
    if (!playerCharacter || !opponentCharacter) return;
    
    setBattleStatus("battling");
    
    // Battle process with timer for visual effect
    setTimeout(() => {
      const playerScore = calculateBattleScore(playerCharacter);
      const opponentScore = calculateBattleScore(opponentCharacter);
      
      const result = {
        winner: playerScore > opponentScore ? playerCharacter : 
               playerScore < opponentScore ? opponentCharacter : null,
        score: { player: playerScore, opponent: opponentScore }
      };
      
      setBattleResult(result);
      setBattleStatus("results");
      
      if (result.winner) {
        toast({
          title: `${result.winner.name} wins!`,
          description: `Score: ${result.score.player} vs ${result.score.opponent}`,
          duration: 5000,
        });
      } else {
        toast({
          title: "It's a draw!",
          description: `Both characters scored ${result.score.player} points`,
          duration: 5000,
        });
      }
    }, 2500);
  };

  const resetBattle = () => {
    setPlayerCharacter(null);
    setOpponentCharacter(null);
    setBattleStatus("selecting");
    setBattleResult({ winner: null, score: { player: 0, opponent: 0 } });
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(`/${language}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Menu
        </Button>
        
        <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <Gamepad className="h-8 w-8 text-game-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
            CryptoDuel
          </span>
        </h1>

        <div className="flex flex-col items-center justify-center space-y-8">
          {isLoading ? (
            <div className="w-full text-center p-8">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 mb-4 rounded-full bg-muted"></div>
                <div className="h-4 w-48 bg-muted rounded"></div>
                <div className="mt-2 h-3 w-32 bg-muted rounded"></div>
              </div>
              <p className="mt-4 text-muted-foreground">Loading cryptocurrency data...</p>
            </div>
          ) : battleStatus === "selecting" && (
            <div className="w-full max-w-3xl text-center space-y-6">
              <h2 className="text-xl md:text-2xl font-bold">Choose Two Characters for Battle</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">First Character</h3>
                  <div className="border-2 border-dashed border-game-primary/30 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                    {playerCharacter ? (
                      <CharacterBattleCard 
                        character={playerCharacter} 
                        onClick={() => setPlayerCharacter(null)} 
                        showDeselect
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-muted-foreground">Select a character from the list below</p>
                        <div className="w-16 h-16 rounded-full bg-game-primary/20 flex items-center justify-center animate-pulse">
                          <Gamepad className="h-8 w-8 text-game-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Second Character</h3>
                  <div className="border-2 border-dashed border-game-secondary/30 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                    {opponentCharacter ? (
                      <CharacterBattleCard 
                        character={opponentCharacter} 
                        onClick={() => setOpponentCharacter(null)} 
                        showDeselect
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-muted-foreground">Select an opponent from the list below</p>
                        <div className="w-16 h-16 rounded-full bg-game-secondary/20 flex items-center justify-center animate-pulse">
                          <Gamepad className="h-8 w-8 text-game-secondary" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Search component */}
              <CharacterSearch onSearch={handleSearch} />
              
              <h2 className="text-xl md:text-2xl font-bold text-center">
                Select Character ({filteredCharacters.length} available)
              </h2>
              <CharacterSelector
                characters={filteredCharacters}
                selectedCharacter={playerCharacter || opponentCharacter}
                onSelectCharacter={(character) => {
                  if (playerCharacter?.id === character.id || opponentCharacter?.id === character.id) {
                    return; // Already selected
                  }
                  
                  if (!playerCharacter) {
                    handleSelectCharacter(character, true);
                  } else if (!opponentCharacter) {
                    handleSelectCharacter(character, false);
                  }
                }}
              />
            </div>
          )}
          
          {battleStatus === "ready" && playerCharacter && opponentCharacter && (
            <div className="w-full max-w-4xl animate-slide-up">
              <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Ready for Battle!</h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <CharacterBattleCard character={playerCharacter} large showStats />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-game-primary/10 border-2 border-game-primary/30 flex items-center justify-center">
                    <span className="text-3xl font-bold">VS</span>
                  </div>
                  
                  <Button onClick={startBattle} className="px-8 py-6 h-auto text-lg">
                    <Gamepad className="mr-2 h-5 w-5" />
                    Start Battle!
                  </Button>
                </div>
                
                <CharacterBattleCard character={opponentCharacter} large showStats />
              </div>
            </div>
          )}
          
          {battleStatus === "battling" && playerCharacter && opponentCharacter && (
            <BattleArena 
              playerCharacter={playerCharacter} 
              opponentCharacter={opponentCharacter} 
            />
          )}
          
          {battleStatus === "results" && playerCharacter && opponentCharacter && (
            <div className="w-full max-w-4xl animate-slide-up space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-game-yellow/30 border-2 border-game-yellow flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-game-orange" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                  {battleResult.winner 
                    ? `${battleResult.winner.name} wins!`
                    : "It's a Draw!"}
                </h2>
                
                <p className="text-lg text-muted-foreground">
                  Score: {battleResult.score.player} vs {battleResult.score.opponent}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="relative">
                  <CharacterBattleCard 
                    character={playerCharacter} 
                    large 
                    showStats
                    highlighted={battleResult.winner?.id === playerCharacter.id}
                  />
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 font-bold border">
                    {battleResult.score.player} points
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <Button onClick={resetBattle} className="px-6 py-2">
                    New Battle
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/${language}`)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Menu
                  </Button>
                </div>
                
                <div className="relative">
                  <CharacterBattleCard 
                    character={opponentCharacter} 
                    large 
                    showStats
                    highlighted={battleResult.winner?.id === opponentCharacter.id}
                  />
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 font-bold border">
                    {battleResult.score.opponent} points
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Battle;
