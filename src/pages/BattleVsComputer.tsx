
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoCharacters } from "../data/characters";
import { CryptoCharacter } from "../types/character";
import { Button } from "@/components/ui/button";
import { Gamepad, Trophy, Cpu, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CharacterBattleCard from "@/components/CharacterBattleCard";
import BattleArena from "@/components/BattleArena";
import { getRandomCharacter } from "@/lib/game-utils";
import { useLanguage } from "@/i18n/LanguageContext";
import PageLayout from "@/components/layouts/PageLayout";

const BattleVsComputer = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [playerCharacter, setPlayerCharacter] = useState<CryptoCharacter | null>(null);
  const [computerCharacter, setComputerCharacter] = useState<CryptoCharacter | null>(null);
  const [battleStatus, setBattleStatus] = useState<"selecting" | "ready" | "battling" | "results">("selecting");
  const [battleResult, setBattleResult] = useState<{ 
    winner: CryptoCharacter | null; 
    score: { player: number; computer: number } 
  }>({
    winner: null,
    score: { player: 0, computer: 0 }
  });
  
  // Automatically select computer character when player chooses
  useEffect(() => {
    if (playerCharacter && battleStatus === "selecting") {
      // Small delay for "thinking" effect
      const timer = setTimeout(() => {
        // Choose random character different from player
        const randomCharacter = getRandomCharacter(cryptoCharacters, playerCharacter.id);
        setComputerCharacter(randomCharacter);
        
        toast({
          title: `Computer selected ${randomCharacter.name}!`,
          description: `Computer will battle using ${randomCharacter.symbol}`,
        });
        
        setBattleStatus("ready");
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [playerCharacter, battleStatus]);

  const handleSelectCharacter = (character: CryptoCharacter) => {
    setPlayerCharacter(character);
    
    toast({
      title: `${character.name} selected!`,
      description: `You chose ${character.symbol} to battle against the computer`,
      duration: 2000,
    });
  };

  const startBattle = () => {
    if (!playerCharacter || !computerCharacter) return;
    
    setBattleStatus("battling");
    
    // Visual battle process with timer
    setTimeout(() => {
      const playerScore = calculateBattleScore(playerCharacter);
      const computerScore = calculateBattleScore(computerCharacter);
      
      const result = {
        winner: playerScore > computerScore ? playerCharacter : 
               playerScore < computerScore ? computerCharacter : null,
        score: { player: playerScore, computer: computerScore }
      };
      
      setBattleResult(result);
      setBattleStatus("results");
      
      // Save result to localStorage for statistics
      saveGameResult(playerCharacter.id, computerCharacter.id, result.winner?.id === playerCharacter.id);
      
      if (result.winner?.id === playerCharacter.id) {
        toast({
          title: `You won!`,
          description: `Score: ${result.score.player} vs ${result.score.computer}`,
          duration: 5000,
        });
      } else if (result.winner?.id === computerCharacter.id) {
        toast({
          title: `Computer won!`,
          description: `Score: ${result.score.player} vs ${result.score.computer}`,
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

  // Calculate battle score based on character stats
  const calculateBattleScore = (character: CryptoCharacter): number => {
    // Random factor for unpredictability (0.8 to 1.2)
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    // Rank bonus (lower rank = higher bonus)
    const rankBonus = Math.max(0, 11 - character.rank) * 2;
    
    // Base score from stats
    const baseScore = (
      character.stats.strength * 1.2 +
      character.stats.speed * 0.8 +
      character.stats.intelligence * 1.0 +
      character.stats.charisma * 0.5
    );
    
    // Market cap bonus (logarithmic scale)
    const marketCapBonus = Math.log10(character.marketCap / 1e9) * 5;
    
    return Math.round((baseScore + rankBonus + marketCapBonus) * randomFactor);
  };
  
  // Save game result
  const saveGameResult = (playerId: string, computerId: string, isPlayerWin: boolean) => {
    // In a real app this would save to a database
    // For now we just save to localStorage for demonstration
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    gameHistory.push({
      date: new Date().toISOString(),
      playerId,
      computerId,
      result: isPlayerWin ? 'win' : (isPlayerWin === false ? 'lose' : 'draw')
    });
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  };

  const resetBattle = () => {
    setPlayerCharacter(null);
    setComputerCharacter(null);
    setBattleStatus("selecting");
    setBattleResult({ winner: null, score: { player: 0, computer: 0 } });
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
            Battle vs Computer
          </span>
        </h1>

        <div className="flex flex-col items-center justify-center space-y-8">
          {battleStatus === "selecting" && (
            <div className="w-full max-w-3xl text-center space-y-6">
              <h2 className="text-xl md:text-2xl font-bold">Select Your Character</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="space-y-4 w-full md:w-1/2">
                  <h3 className="font-medium text-lg">Your Character</h3>
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
                
                <div className="space-y-4 w-full md:w-1/2">
                  <h3 className="font-medium text-lg">Computer</h3>
                  <div className="border-2 border-dashed border-game-secondary/30 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                    {computerCharacter ? (
                      <CharacterBattleCard 
                        character={computerCharacter}
                        showDeselect={false}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-muted-foreground">Computer will select an opponent after your choice</p>
                        <div className="w-16 h-16 rounded-full bg-game-secondary/20 flex items-center justify-center animate-pulse">
                          <Cpu className="h-8 w-8 text-game-secondary" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                {cryptoCharacters.map((character) => (
                  <CharacterBattleCard
                    key={character.id}
                    character={character}
                    isSelected={playerCharacter?.id === character.id || computerCharacter?.id === character.id}
                    onClick={() => {
                      if (playerCharacter?.id === character.id || computerCharacter?.id === character.id) {
                        return; // Already selected
                      }
                      
                      handleSelectCharacter(character);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {battleStatus === "ready" && playerCharacter && computerCharacter && (
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
                
                <CharacterBattleCard character={computerCharacter} large showStats />
              </div>
            </div>
          )}
          
          {battleStatus === "battling" && playerCharacter && computerCharacter && (
            <BattleArena 
              playerCharacter={playerCharacter} 
              opponentCharacter={computerCharacter} 
            />
          )}
          
          {battleStatus === "results" && playerCharacter && computerCharacter && (
            <div className="w-full max-w-4xl animate-slide-up space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-game-yellow/30 border-2 border-game-yellow flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-game-orange" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                  {battleResult.winner?.id === playerCharacter.id
                    ? "You Won!" 
                    : battleResult.winner?.id === computerCharacter.id
                    ? "Computer Won!"
                    : "It's a Draw!"}
                </h2>
                
                <p className="text-lg text-muted-foreground">
                  Score: {battleResult.score.player} vs {battleResult.score.computer}
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
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/${language}/leaderboard`)}
                    className="flex items-center gap-2"
                  >
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Button>
                </div>
                
                <div className="relative">
                  <CharacterBattleCard 
                    character={computerCharacter} 
                    large 
                    showStats
                    highlighted={battleResult.winner?.id === computerCharacter.id}
                  />
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 font-bold border">
                    {battleResult.score.computer} points
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

export default BattleVsComputer;
