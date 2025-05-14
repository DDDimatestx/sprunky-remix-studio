
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoCharacters } from "../data/characters";
import CharacterSelector from "../components/CharacterSelector";
import CharacterDetails from "../components/CharacterDetails";
import { CryptoCharacter } from "../types/character";
import { Coins, Gamepad } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<CryptoCharacter | null>(
    cryptoCharacters[0] || null
  );

  const handleSelectCharacter = (character: CryptoCharacter) => {
    setSelectedCharacter(character);
    toast({
      title: `${character.name} выбран!`,
      description: `Вы выбрали ${character.symbol} - ранг #${character.rank}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <header className="w-full py-6 border-b border-game-primary/20">
        <div className="container flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <Coins className="h-8 w-8 text-game-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
              КриптоХерои
            </span>
          </h1>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Button 
            onClick={() => navigate("/battle")}
            className="bg-gradient-to-r from-game-primary to-game-secondary hover:opacity-90 transition-opacity px-8 py-6 h-auto"
            size="lg"
          >
            <Gamepad className="mr-2 h-6 w-6" />
            <span className="text-lg font-bold">Начать КриптоДуэль</span>
          </Button>
          
          {selectedCharacter ? (
            <>
              <div className="w-full max-w-3xl">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Детали персонажа</h2>
                <CharacterDetails character={selectedCharacter} />
              </div>
              
              <div className="w-full pt-4">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Выберите персонажа</h2>
                <CharacterSelector
                  characters={cryptoCharacters}
                  selectedCharacter={selectedCharacter}
                  onSelectCharacter={handleSelectCharacter}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-center">
              <p>Загрузка персонажей...</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} КриптоХерои | Персонажи криптомонет из топ-100 CoinMarketCap
        </div>
      </footer>
    </div>
  );
};

export default Index;
