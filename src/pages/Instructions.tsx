
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
import { InstructionsHeader } from "@/components/instructions/InstructionsHeader";
import { InstructionsFooter } from "@/components/instructions/InstructionsFooter";
import { GameRulesTab } from "@/components/instructions/GameRulesTab";
import { GameModesTab } from "@/components/instructions/GameModesTab";
import { CharactersInfoTab } from "@/components/instructions/CharactersInfoTab";

const Instructions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <InstructionsHeader />

      <main className="flex-1 container py-8">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="game">{t('instructions.gameRules')}</TabsTrigger>
            <TabsTrigger value="modes">{t('instructions.gameModes')}</TabsTrigger>
            <TabsTrigger value="characters">{t('instructions.charactersInfo')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="game" className="space-y-6">
            <GameRulesTab />
          </TabsContent>
          
          <TabsContent value="modes" className="space-y-6">
            <GameModesTab />
          </TabsContent>
          
          <TabsContent value="characters" className="space-y-6">
            <CharactersInfoTab />
          </TabsContent>
        </Tabs>
      </main>

      <InstructionsFooter />
    </div>
  );
};

export default Instructions;
