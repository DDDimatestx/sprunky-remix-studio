
import { CryptoCharacter } from "../types/character";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";

interface CharacterCardProps {
  character: CryptoCharacter;
  isSelected: boolean;
  onClick: () => void;
}

const CharacterCard = ({ character, isSelected, onClick }: CharacterCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer transform transition-transform duration-300 ${
        isSelected ? "scale-105" : "hover:scale-102"
      }`}
    >
      <Card 
        className={`relative overflow-hidden border-2 ${
          isSelected ? `border-[${character.color}]` : "border-transparent"
        }`}
        style={{ 
          background: `linear-gradient(135deg, ${character.color}15 0%, ${character.color}30 100%)`,
        }}
      >
        <div 
          className="absolute top-0 right-0 p-2 rounded-bl-lg font-bold"
          style={{ backgroundColor: `${character.color}` }}
        >
          #{character.rank}
        </div>
        <CardHeader className="pb-2 pt-6 flex flex-row items-center gap-3">
          <Avatar className="h-12 w-12 border-2" style={{ borderColor: character.color }}>
            {character.image ? (
              <img src={character.image} alt={character.name} />
            ) : (
              <Coins className="h-8 w-8" style={{ color: character.color }} />
            )}
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">{character.name}</h3>
            <p className="text-xs text-muted-foreground">{character.symbol}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Strength</span>
                <span>{character.stats.strength}</span>
              </div>
              <Progress value={character.stats.strength} 
                className="h-2" 
                style={{ 
                  backgroundColor: `${character.color}20`,
                  "--tw-progress-fill-color": character.color 
                } as React.CSSProperties}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Speed</span>
                <span>{character.stats.speed}</span>
              </div>
              <Progress value={character.stats.speed} 
                className="h-2" 
                style={{ 
                  backgroundColor: `${character.color}20`,
                  "--tw-progress-fill-color": character.color 
                } as React.CSSProperties}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Intelligence</span>
                <span>{character.stats.intelligence}</span>
              </div>
              <Progress value={character.stats.intelligence} 
                className="h-2" 
                style={{ 
                  backgroundColor: `${character.color}20`,
                  "--tw-progress-fill-color": character.color 
                } as React.CSSProperties}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Charisma</span>
                <span>{character.stats.charisma}</span>
              </div>
              <Progress value={character.stats.charisma} 
                className="h-2" 
                style={{ 
                  backgroundColor: `${character.color}20`,
                  "--tw-progress-fill-color": character.color 
                } as React.CSSProperties}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCard;
