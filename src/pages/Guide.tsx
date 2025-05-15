
import { useLanguage } from "@/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuideHeader from "@/components/guide/GuideHeader";
import GuideFooter from "@/components/guide/GuideFooter";
import CharactersTab from "@/components/guide/tabs/CharactersTab";
import SoundsTab from "@/components/guide/tabs/SoundsTab";
import DeploymentTab from "@/components/guide/tabs/DeploymentTab";

const Guide = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <GuideHeader />

      <main className="flex-1 container py-8">
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="characters">{t('guide.addCharacters')}</TabsTrigger>
            <TabsTrigger value="sounds">{t('guide.addSounds')}</TabsTrigger>
            <TabsTrigger value="deployment">{t('guide.deployment')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="space-y-6">
            <CharactersTab />
          </TabsContent>
          
          <TabsContent value="sounds" className="space-y-6">
            <SoundsTab />
          </TabsContent>
          
          <TabsContent value="deployment" className="space-y-6">
            <DeploymentTab />
          </TabsContent>
        </Tabs>
      </main>

      <GuideFooter />
    </div>
  );
};

export default Guide;
