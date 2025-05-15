import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Battle from "./pages/Battle";
import BattleVsComputer from "./pages/BattleVsComputer";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Guide from "./pages/Guide";
import Instructions from "./pages/Instructions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { language } = useLanguage();

  return (
    <Routes>
      {/* Автоматически переадресовываем с "/" на текущий язык */}
      <Route path="/" element={<Navigate to={`/${language}`} replace />} />
      
      <Route path="/:lang" element={<Index />} />
      <Route path="/:lang/battle" element={<Battle />} />
      <Route path="/:lang/battle-vs-computer" element={<BattleVsComputer />} />
      <Route path="/:lang/leaderboard" element={<Leaderboard />} />
      <Route path="/:lang/auth" element={<Auth />} />
      <Route path="/:lang/guide" element={<Guide />} />
      <Route path="/:lang/instructions" element={<Instructions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
