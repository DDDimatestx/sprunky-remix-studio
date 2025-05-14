
import { useEffect, useState } from "react";
import { CryptoCharacter } from "../types/character";
import { Coins } from "lucide-react";

interface BattleArenaProps {
  playerCharacter: CryptoCharacter;
  opponentCharacter: CryptoCharacter;
}

const BattleArena = ({ playerCharacter, opponentCharacter }: BattleArenaProps) => {
  const [battlePhase, setBattlePhase] = useState<number>(0);
  
  // Анимация битвы
  useEffect(() => {
    const interval = setInterval(() => {
      setBattlePhase(prev => (prev + 1) % 3);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl h-80 md:h-96 relative overflow-hidden rounded-2xl border-2 border-game-primary/30 bg-gradient-to-br from-game-background to-black/30">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl font-bold animate-pulse text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
            Битва идет...
          </span>
        </div>
      </div>
      
      {/* Левый персонаж (игрок) */}
      <div 
        className={`absolute left-4 md:left-20 bottom-10 transition-all duration-500 transform ${
          battlePhase === 1 ? 'translate-x-10 scale-105' : 
          battlePhase === 2 ? '-translate-x-5 scale-95' : 
          'translate-x-0 scale-100'
        }`}
      >
        <div 
          className="relative h-32 w-32 md:h-40 md:w-40 rounded-full flex items-center justify-center"
          style={{ 
            background: `radial-gradient(circle, ${playerCharacter.color}40 0%, ${playerCharacter.color}10 70%, transparent 100%)`
          }}
        >
          {playerCharacter.image ? (
            <img 
              src={playerCharacter.image} 
              alt={playerCharacter.name} 
              className="h-24 md:h-32 z-10"
            />
          ) : (
            <Coins 
              className="h-16 w-16 md:h-24 md:w-24 z-10" 
              style={{ color: playerCharacter.color }}
            />
          )}
          <div className="absolute -bottom-6 left-0 right-0 text-center font-bold text-sm md:text-base">
            {playerCharacter.symbol}
          </div>
        </div>
        
        {battlePhase === 1 && (
          <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
            <div className="flex flex-row-reverse">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full mx-0.5 animate-fade-in"
                  style={{ 
                    backgroundColor: playerCharacter.color,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 1 - i * 0.2
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Правый персонаж (оппонент) */}
      <div 
        className={`absolute right-4 md:right-20 bottom-10 transition-all duration-500 transform ${
          battlePhase === 2 ? '-translate-x-10 scale-105' : 
          battlePhase === 1 ? 'translate-x-5 scale-95' : 
          'translate-x-0 scale-100'
        }`}
      >
        <div 
          className="relative h-32 w-32 md:h-40 md:w-40 rounded-full flex items-center justify-center"
          style={{ 
            background: `radial-gradient(circle, ${opponentCharacter.color}40 0%, ${opponentCharacter.color}10 70%, transparent 100%)`
          }}
        >
          {opponentCharacter.image ? (
            <img 
              src={opponentCharacter.image} 
              alt={opponentCharacter.name} 
              className="h-24 md:h-32 z-10"
            />
          ) : (
            <Coins 
              className="h-16 w-16 md:h-24 md:w-24 z-10" 
              style={{ color: opponentCharacter.color }}
            />
          )}
          <div className="absolute -bottom-6 left-0 right-0 text-center font-bold text-sm md:text-base">
            {opponentCharacter.symbol}
          </div>
        </div>
        
        {battlePhase === 2 && (
          <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full mx-0.5 animate-fade-in"
                  style={{ 
                    backgroundColor: opponentCharacter.color,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 1 - i * 0.2
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Эффекты столкновения */}
      {battlePhase === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="w-16 h-16 rounded-full animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${playerCharacter.color}50 0%, ${opponentCharacter.color}50 100%)`
            }}
          ></div>
        </div>
      )}
      
      {/* Статистика битвы */}
      <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-6">
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{ backgroundColor: playerCharacter.color }}
          ></div>
          <span className="text-sm font-medium">{playerCharacter.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{opponentCharacter.name}</span>
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{ backgroundColor: opponentCharacter.color }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
