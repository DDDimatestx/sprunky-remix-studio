
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";

const Guide = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <PageLayout title="Game Guide">
      <main className="flex-1 container py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(`/${language}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Menu
        </Button>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-lg border p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-game-primary" />
            CryptoHeroes Game Guide
          </h2>
          <p className="mb-4">
            Welcome to CryptoHeroes, the exciting card battle game where cryptocurrency characters 
            compete in duels based on their real-world statistics!
          </p>
        </div>

        <Tabs defaultValue="gameplay" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="tips">Strategy Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gameplay" className="space-y-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">How to Play</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Choose your favorite cryptocurrency character</li>
                <li>Select either CryptoDuel (PvP) or vs Computer mode</li>
                <li>In CryptoDuel, select two characters to battle against each other</li>
                <li>In vs Computer mode, select your character and face a random opponent</li>
                <li>The battle consists of four rounds, one for each stat</li>
                <li>The character with the highest total score wins!</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-4">Game Modes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold">CryptoDuel</h4>
                  <p>Select two characters and watch them battle each other. Perfect for learning about different cryptocurrency strengths.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold">Vs Computer</h4>
                  <p>Choose your character and battle against the computer. Results count toward your leaderboard ranking!</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="characters" className="space-y-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Character Stats</h3>
              <p className="mb-4">
                Each cryptocurrency character has four key statistics that determine their performance in battle:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-game-primary">Strength</h4>
                  <p>Based on market capitalization and overall stability. Characters with high strength are powerful and reliable.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-game-secondary">Speed</h4>
                  <p>Based on transaction speed and network throughput. Fast characters can process transactions quickly.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-game-accent">Intelligence</h4>
                  <p>Based on smart contract capabilities and technological innovation. Intelligent characters have advanced features.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-game-yellow">Charisma</h4>
                  <p>Based on community size, social media presence, and adoption. Charismatic characters have strong followings.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="font-bold">Note:</p>
                <p>All character stats are derived from real-world cryptocurrency data, making battles reflect actual market conditions!</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Strategy Tips</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Study each character's stats carefully before selecting them for battle</li>
                <li>Higher market cap currencies tend to have better strength stats</li>
                <li>Newer, innovative cryptocurrencies often excel in intelligence</li>
                <li>Popular cryptocurrencies with large communities have high charisma</li>
                <li>Some characters are specialists (very high in one stat), while others are well-balanced</li>
                <li>Track your win rates with different characters to find your best performers</li>
                <li>The meta can change as cryptocurrency market conditions evolve!</li>
              </ul>
              
              <div className="bg-game-primary/10 border border-game-primary/30 rounded-lg p-4 mt-6">
                <h4 className="font-bold">Pro Tip:</h4>
                <p>Characters with balanced stats tend to perform more consistently across all battle rounds compared to specialized characters.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </PageLayout>
  );
};

export default Guide;
