
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Gamepad, Trophy, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector from "@/components/LanguageSelector";
import { Separator } from "@/components/ui/separator";

const Instructions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <header className="w-full py-6 border-b border-game-primary/20">
        <div className="container flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-game-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
              {t('instructions.title')}
            </span>
          </h1>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="game">{t('instructions.gameRules')}</TabsTrigger>
            <TabsTrigger value="modes">{t('instructions.gameModes')}</TabsTrigger>
            <TabsTrigger value="characters">{t('instructions.charactersInfo')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="game" className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">{t('instructions.gameRules')}</h2>
              
              <div className="space-y-4">
                <p className="mb-4">
                  {t('instructions.gameDescription')}
                </p>
                
                <h3 className="text-xl font-semibold">{t('instructions.howToPlay')}</h3>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>{t('instructions.rule1')}</li>
                  <li>{t('instructions.rule2')}</li>
                  <li>{t('instructions.rule3')}</li>
                  <li>{t('instructions.rule4')}</li>
                  <li>{t('instructions.rule5')}</li>
                </ol>
                
                <h3 className="text-xl font-semibold mt-6">{t('instructions.battleMechanics')}</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>{t('instructions.mechanics1')}</li>
                  <li>{t('instructions.mechanics2')}</li>
                  <li>{t('instructions.mechanics3')}</li>
                  <li>{t('instructions.mechanics4')}</li>
                </ul>
                
                <div className="bg-game-primary/10 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold">{t('instructions.tip')}</h4>
                  <p>{t('instructions.tipText')}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="modes" className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">{t('instructions.gameModes')}</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-game-primary/20 flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-game-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{t('instructions.cryptoDuelMode')}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <p>{t('instructions.cryptoDuelDescription')}</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>{t('instructions.cryptoDuelFeature1')}</li>
                      <li>{t('instructions.cryptoDuelFeature2')}</li>
                      <li>{t('instructions.cryptoDuelFeature3')}</li>
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-game-accent/20 flex items-center justify-center mb-2">
                      <Gamepad className="h-8 w-8 text-game-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{t('instructions.vsComputerMode')}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <p>{t('instructions.vsComputerDescription')}</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>{t('instructions.vsComputerFeature1')}</li>
                      <li>{t('instructions.vsComputerFeature2')}</li>
                      <li>{t('instructions.vsComputerFeature3')}</li>
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-game-yellow/20 flex items-center justify-center mb-2">
                      <Trophy className="h-8 w-8 text-game-yellow" />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{t('instructions.leaderboardMode')}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <p>{t('instructions.leaderboardDescription')}</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>{t('instructions.leaderboardFeature1')}</li>
                      <li>{t('instructions.leaderboardFeature2')}</li>
                      <li>{t('instructions.leaderboardFeature3')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="characters" className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">{t('instructions.charactersInfo')}</h2>
              
              <div className="space-y-4">
                <p>
                  {t('instructions.charactersDescription')}
                </p>
                
                <h3 className="text-xl font-semibold mt-6">{t('instructions.characterStats')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-game-primary">{t('stats.strength')}</h4>
                    <p className="text-sm">{t('stats.strengthDesc')}</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-game-secondary">{t('stats.speed')}</h4>
                    <p className="text-sm">{t('stats.speedDesc')}</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-game-accent">{t('stats.intelligence')}</h4>
                    <p className="text-sm">{t('stats.intelligenceDesc')}</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-game-yellow">{t('stats.charisma')}</h4>
                    <p className="text-sm">{t('stats.charismaDesc')}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-6">{t('instructions.strategy')}</h3>
                <p>{t('instructions.strategyDescription')}</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>{t('instructions.strategyTip1')}</li>
                  <li>{t('instructions.strategyTip2')}</li>
                  <li>{t('instructions.strategyTip3')}</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default Instructions;
