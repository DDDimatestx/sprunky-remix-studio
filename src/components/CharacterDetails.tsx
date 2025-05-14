
import { CryptoCharacter } from "../types/character";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, DollarSign } from "lucide-react";

interface CharacterDetailsProps {
  character: CryptoCharacter;
}

const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  // Форматирование чисел для удобного отображения
  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(8);
    if (price < 1) return price.toFixed(4);
    if (price < 10) return price.toFixed(2);
    return price.toFixed(2);
  };
  
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <Card className="w-full h-full animate-fade-in">
      <CardHeader className="pb-3" style={{ borderBottom: `2px solid ${character.color}20` }}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <span style={{ color: character.color }}>{character.name}</span>
            <Badge variant="outline" className="text-xs">{character.symbol}</Badge>
          </CardTitle>
          <Badge variant="secondary" className="text-sm font-semibold">Ранг: #{character.rank}</Badge>
        </div>
        <CardDescription className="mt-2">{character.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Цена</span>
            <div className="flex items-center gap-1 text-xl font-semibold">
              <DollarSign className="h-5 w-5" style={{ color: character.color }} />
              <span>{formatPrice(character.price)}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Рыночная капитализация</span>
            <div className="flex items-center gap-1 text-xl font-semibold">
              <Coins className="h-5 w-5" style={{ color: character.color }} />
              <span>{formatMarketCap(character.marketCap)}</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-40 w-full rounded-xl overflow-hidden flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${character.color}15 0%, ${character.color}40 100%)`,
            border: `2px solid ${character.color}30`
          }}
        >
          {character.image ? (
            <img 
              src={character.image} 
              alt={character.name} 
              className="h-32 animate-bounce-small"
            />
          ) : (
            <Coins 
              className="h-24 w-24 animate-bounce-small" 
              style={{ color: character.color }}
            />
          )}
        </div>
        
        <div className="bg-secondary/50 p-4 rounded-xl">
          <h3 className="font-semibold mb-3">Характеристики</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Сила</span>
                  <span className="font-medium">{character.stats.strength}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${character.stats.strength}%`,
                      backgroundColor: character.color
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Скорость</span>
                  <span className="font-medium">{character.stats.speed}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${character.stats.speed}%`,
                      backgroundColor: character.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Интеллект</span>
                  <span className="font-medium">{character.stats.intelligence}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${character.stats.intelligence}%`,
                      backgroundColor: character.color
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Харизма</span>
                  <span className="font-medium">{character.stats.charisma}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${character.stats.charisma}%`,
                      backgroundColor: character.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterDetails;
