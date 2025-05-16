
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";

const Instructions = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <PageLayout title="Game Instructions">
      <div className="w-full bg-gradient-to-r from-game-primary to-game-secondary py-8 -mt-8 mb-8">
        <div className="container">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to CryptoHeroes!</h2>
            <p className="opacity-90">Learn how to play and master the game with these detailed instructions.</p>
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(`/${language}`)}
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Menu
      </Button>

      <Tabs defaultValue="game" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="game">Game Rules</TabsTrigger>
          <TabsTrigger value="modes">Game Modes</TabsTrigger>
          <TabsTrigger value="characters">Characters Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game" className="space-y-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">Basic Rules</h3>
            <p className="mb-4">
              CryptoHeroes is a strategic card battle game where you can pit your favorite cryptocurrencies against each other in exciting duels. Each cryptocurrency character has unique stats that determine their battle performance.
            </p>
            
            <h4 className="font-bold mt-4 mb-2">How To Play:</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Select a cryptocurrency character to battle with</li>
              <li>In CryptoDuel mode, select two characters for a head-to-head match</li>
              <li>In Vs Computer mode, select your character and the computer will choose an opponent</li>
              <li>The battle consists of four rounds, one for each stat: Strength, Speed, Intelligence, and Charisma</li>
              <li>The character with more rounds won is the overall winner</li>
            </ol>
            
            <h4 className="font-bold mt-6 mb-2">Battle Mechanics:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Each round compares a specific stat between the two characters</li>
              <li>The character with the higher stat value wins that round</li>
              <li>If the stats are equal, the round ends in a draw</li>
              <li>The overall winner is determined by who won the most rounds</li>
            </ul>
            
            <div className="bg-game-primary/10 border border-game-primary/30 rounded-lg p-4 mt-6">
              <h4 className="font-bold">Pro Tip:</h4>
              <p>Study each character's stats carefully. Some cryptocurrencies excel in specific areas, making them better suited for certain matchups!</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="modes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4 text-game-primary">CryptoDuel Mode</h3>
              <p className="mb-4">
                In this mode, you can select any two cryptocurrency characters and see who would win in a head-to-head battle.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Choose any two characters to battle</li>
                <li>Detailed battle visualizations for each round</li>
                <li>Perfect for learning character strengths and weaknesses</li>
              </ul>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4 text-game-secondary">Vs Computer Mode</h3>
              <p className="mb-4">
                Test your strategy against the computer's randomly selected cryptocurrency character.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Battle results count toward your leaderboard score</li>
                <li>Computer selects a random opponent each time</li>
                <li>Great way to practice and learn the game mechanics</li>
              </ul>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6 md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-game-yellow">Leaderboard</h3>
              <p className="mb-4">
                See how you rank among other CryptoHeroes players.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Shows top players based on their battle scores</li>
                <li>Win more games to improve your ranking</li>
                <li>Earn special rewards for reaching the top positions</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="characters" className="space-y-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">Characters Overview</h3>
            <p className="mb-4">
              CryptoHeroes features characters based on real cryptocurrencies from the top 100 on CoinMarketCap. Each character's stats are derived from real-world data and characteristics of the cryptocurrency it represents.
            </p>
            
            <h4 className="font-bold mt-6 mb-2">Character Stats Explained:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h5 className="font-bold text-game-primary">Strength</h5>
                <p>Represents market capitalization and stability</p>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-bold text-game-secondary">Speed</h5>
                <p>Represents transaction speed and network throughput</p>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-bold text-game-accent">Intelligence</h5>
                <p>Represents smart contracts, features and technical innovation</p>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-bold text-game-yellow">Charisma</h5>
                <p>Represents community size, social media presence and adoption</p>
              </div>
            </div>
            
            <h4 className="font-bold mt-6 mb-2">Battle Strategy:</h4>
            <p className="mb-4">
              Developing a winning strategy in CryptoHeroes requires understanding the strengths and weaknesses of each character:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Characters with high Strength are usually the most stable and established cryptocurrencies</li>
              <li>Characters with high Intelligence excel in technical innovation and smart contract capabilities</li>
              <li>Balance is key - a character with good stats across all categories often performs better than one with extreme values</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Instructions;
