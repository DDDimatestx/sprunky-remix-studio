
import { CryptoCharacter } from "../types/character";
import { Coins, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CharacterBattleCardProps {
  character: CryptoCharacter;
  isSelected?: boolean;
  onClick?: () => void;
  showDeselect?: boolean;
  large?: boolean;
  showStats?: boolean;
  highlighted?: boolean;
}

const CharacterBattleCard = ({ 
  character, 
  isSelected, 
  onClick, 
  showDeselect = false,
  large = false,
  showStats = false,
  highlighted = false
}: CharacterBattleCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300",
        onClick && !isSelected ? "cursor-pointer hover:scale-105" : "",
        isSelected ? "opacity-50" : "",
        large ? "w-full max-w-xs" : "w-full",
        highlighted ? "ring-4 ring-game-yellow shadow-lg" : ""
      )}
      style={{ 
        background: `linear-gradient(135deg, ${character.color}15 0%, ${character.color}30 100%)`,
        borderLeft: `4px solid ${character.color}`,
      }}
    >
      {showDeselect && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="absolute top-2 right-2 z-10 bg-background/60 hover:bg-background/80 backdrop-blur-sm rounded-full p-1"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      <div className={cn(
        "flex items-center gap-3 p-3",
        large ? "p-4" : "p-3"
      )}>
        <div 
          className={cn(
            "shrink-0 rounded-full flex items-center justify-center border-2 overflow-hidden",
            large ? "h-16 w-16" : "h-12 w-12"
          )}
          style={{ borderColor: character.color }}
        >
          {character.image ? (
            <img src={character.image} alt={character.name} />
          ) : (
            <Coins style={{ color: character.color }} className={cn(large ? "h-9 w-9" : "h-7 w-7")} />
          )}
        </div>
        
        <div className="min-w-0">
          <h3 className={cn(
            "font-bold truncate",
            large ? "text-xl" : "text-base"
          )}>
            {character.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{character.symbol}</span>
            <span 
              className="text-xs px-1.5 py-0.5 rounded-full" 
              style={{ backgroundColor: `${character.color}30` }}
            >
              #{character.rank}
            </span>
          </div>
        </div>
      </div>
      
      {showStats && (
        <div className="p-3 pt-0 space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Сила</span>
              <span>{character.stats.strength}</span>
            </div>
            <Progress value={character.stats.strength} 
              className="h-1.5" 
              style={{ 
                backgroundColor: `${character.color}20`,
                "--tw-progress-fill-color": character.color 
              } as React.CSSProperties}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Скорость</span>
              <span>{character.stats.speed}</span>
            </div>
            <Progress value={character.stats.speed} 
              className="h-1.5" 
              style={{ 
                backgroundColor: `${character.color}20`,
                "--tw-progress-fill-color": character.color 
              } as React.CSSProperties}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Интеллект</span>
              <span>{character.stats.intelligence}</span>
            </div>
            <Progress value={character.stats.intelligence} 
              className="h-1.5" 
              style={{ 
                backgroundColor: `${character.color}20`,
                "--tw-progress-fill-color": character.color 
              } as React.CSSProperties}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Харизма</span>
              <span>{character.stats.charisma}</span>
            </div>
            <Progress value={character.stats.charisma} 
              className="h-1.5" 
              style={{ 
                backgroundColor: `${character.color}20`,
                "--tw-progress-fill-color": character.color 
              } as React.CSSProperties}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterBattleCard;
