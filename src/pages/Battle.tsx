
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoCharacters } from "../data/characters";
import { CryptoCharacter } from "../types/character";
import { Button } from "@/components/ui/button";
import { Gamepad, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CharacterBattleCard from "@/components/CharacterBattleCard";
import BattleArena from "@/components/BattleArena";
import { useLanguage } from "@/i18n/LanguageContext";
import PageLayout from "@/components/layouts/PageLayout";

const Battle = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [playerCharacter, setPlayerCharacter] = useState<CryptoCharacter | null>(null);
  const [opponentCharacter, setOpponentCharacter] = useState<CryptoCharacter | null>(null);
  const [battleStatus, setBattleStatus] = useState<"selecting" | "ready" | "battling" | "results">("selecting");
  const [battleResult, setBattleResult] = useState<{ winner: CryptoCharacter | null; score: { player: number; opponent: number } }>({
    winner: null,
    score: { player: 0, opponent: 0 }
  });
  
  // Сброс выбора при инициализации страницы
  useEffect(() => {
    setPlayerCharacter(null);
    setOpponentCharacter(null);
    setBattleStatus("selecting");
  }, []);

  const handleSelectCharacter = (character: CryptoCharacter, isPlayer: boolean) => {
    if (isPlayer) {
      setPlayerCharacter(character);
      toast({
        title: t('battle.characterSelected', { name: character.name }) || `${character.name} выбран!`,
        description: t('battle.playerCharacterDesc', { symbol: character.symbol }) || `Вы выбрали ${character.symbol} для сражения`,
        duration: 2000,
      });
    } else {
      setOpponentCharacter(character);
      toast({
        title: t('battle.opponentSelected', { name: character.name }) || `${character.name} будет вашим противником!`,
        description: t('battle.opponentCharacterDesc', { symbol: character.symbol }) || `${character.symbol} готовится к битве`,
        duration: 2000,
      });
    }

    // Если выбраны оба персонажа, переходим к статусу "готово"
    if ((isPlayer && opponentCharacter) || (!isPlayer && playerCharacter)) {
      setBattleStatus("ready");
    }
  };

  const startBattle = () => {
    if (!playerCharacter || !opponentCharacter) return;
    
    setBattleStatus("battling");
    
    // Имитация процесса битвы с таймером для визуального эффекта
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
          title: t('battle.winnerAnnounced', { name: result.winner.name }) || `${result.winner.name} одержал победу!`,
          description: t('battle.scoreResult', { player: result.score.player, opponent: result.score.opponent }) || `Счет: ${result.score.player} против ${result.score.opponent}`,
          duration: 5000,
        });
      } else {
        toast({
          title: t('battle.draw') || "Ничья!",
          description: t('battle.drawScore', { score: result.score.player }) || `Оба персонажа набрали ${result.score.player} очков`,
          duration: 5000,
        });
      }
    }, 2500);
  };

  // Расчет боевой эффективности на основе характеристик
  const calculateBattleScore = (character: CryptoCharacter): number => {
    // Случайный фактор для непредсказуемости (от 0.8 до 1.2)
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    // Бонус за ранг (чем ниже ранг, тем выше бонус)
    const rankBonus = Math.max(0, 11 - character.rank) * 2;
    
    // Основной счет на основе характеристик
    const baseScore = (
      character.stats.strength * 1.2 +
      character.stats.speed * 0.8 +
      character.stats.intelligence * 1.0 +
      character.stats.charisma * 0.5
    );
    
    // Бонус за рыночную капитализацию (логарифмический масштаб)
    const marketCapBonus = Math.log10(character.marketCap / 1e9) * 5;
    
    return Math.round((baseScore + rankBonus + marketCapBonus) * randomFactor);
  };

  const resetBattle = () => {
    setPlayerCharacter(null);
    setOpponentCharacter(null);
    setBattleStatus("selecting");
    setBattleResult({ winner: null, score: { player: 0, opponent: 0 } });
  };

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
        <header className="w-full py-6 border-b border-game-primary/20">
          <div className="container flex items-center justify-between">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate(`/${language}`)}
            >
              {t('common.back') || "Назад"}
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
              <Gamepad className="h-8 w-8 text-game-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
                {t('battle.title') || "КриптоДуэль"}
              </span>
            </h1>
            <div className="w-24"></div> {/* Пустой div для выравнивания */}
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="flex flex-col items-center justify-center space-y-8">
            {battleStatus === "selecting" && (
              <div className="w-full max-w-3xl text-center space-y-6">
                <h2 className="text-xl md:text-2xl font-bold">{t('battle.chooseTwoCharacters') || "Выберите двух персонажей для битвы"}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">{t('battle.yourCharacter') || "Ваш персонаж"}</h3>
                    <div className="border-2 border-dashed border-game-primary/30 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                      {playerCharacter ? (
                        <CharacterBattleCard 
                          character={playerCharacter} 
                          onClick={() => setPlayerCharacter(null)} 
                          showDeselect
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <p className="text-muted-foreground">{t('battle.chooseCharacterBelow') || "Выберите персонажа из списка ниже"}</p>
                          <div className="w-16 h-16 rounded-full bg-game-primary/20 flex items-center justify-center animate-pulse">
                            <Gamepad className="h-8 w-8 text-game-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">{t('battle.opponent') || "Противник"}</h3>
                    <div className="border-2 border-dashed border-game-secondary/30 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                      {opponentCharacter ? (
                        <CharacterBattleCard 
                          character={opponentCharacter} 
                          onClick={() => setOpponentCharacter(null)} 
                          showDeselect
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <p className="text-muted-foreground">{t('battle.chooseOpponentBelow') || "Выберите противника из списка ниже"}</p>
                          <div className="w-16 h-16 rounded-full bg-game-secondary/20 flex items-center justify-center animate-pulse">
                            <Gamepad className="h-8 w-8 text-game-secondary" />
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
                      isSelected={playerCharacter?.id === character.id || opponentCharacter?.id === character.id}
                      onClick={() => {
                        if (playerCharacter?.id === character.id || opponentCharacter?.id === character.id) {
                          return; // Уже выбран
                        }
                        
                        if (!playerCharacter) {
                          handleSelectCharacter(character, true);
                        } else if (!opponentCharacter) {
                          handleSelectCharacter(character, false);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {battleStatus === "ready" && playerCharacter && opponentCharacter && (
              <div className="w-full max-w-4xl animate-slide-up">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">{t('battle.readyToBattle') || "Готово к битве!"}</h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <CharacterBattleCard character={playerCharacter} large showStats />
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-game-primary/10 border-2 border-game-primary/30 flex items-center justify-center">
                      <span className="text-3xl font-bold">VS</span>
                    </div>
                    
                    <Button onClick={startBattle} className="px-8 py-6 h-auto text-lg">
                      <Gamepad className="mr-2 h-5 w-5" />
                      {t('battle.startBattle') || "Начать бой!"}
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
                      ? t('battle.winnerAnnounced', { name: battleResult.winner.name }) || `${battleResult.winner.name} одержал победу!`
                      : t('battle.draw') || "Ничья!"}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground">
                    {t('battle.scoreResult', { player: battleResult.score.player, opponent: battleResult.score.opponent }) || 
                    `Счет: ${battleResult.score.player} против ${battleResult.score.opponent}`}
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
                      {battleResult.score.player} {t('battle.points') || "очков"}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <Button onClick={resetBattle} className="px-6 py-2">
                      {t('battle.newBattle') || "Новый бой"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/${language}`)}
                    >
                      {t('battle.toCharacterList') || "К списку персонажей"}
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
                      {battleResult.score.opponent} {t('battle.points') || "очков"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="py-4 border-t border-game-primary/20">
          <div className="container text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('common.copyright.text') || "КриптоХерои | Персонажи криптомонет из топ-100 CoinMarketCap"}
          </div>
        </footer>
      </div>
    </PageLayout>
  );
};

export default Battle;
