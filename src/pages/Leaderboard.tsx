import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad, Trophy, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cryptoCharacters } from "../data/characters";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

// Тип для записи в лидерборде
interface LeaderboardEntry {
  id: string;
  username: string;
  wins: number;
  losses: number;
  draws: number;
  score: number;
  favoriteCharacter: string;
  lastPlayed: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Имитация загрузки данных лидерборда из бэкенда
  useEffect(() => {
    const fetchLeaderboardData = () => {
      // В реальном приложении здесь будет запрос к API
      setTimeout(() => {
        // Тестовые данные для демонстрации
        const mockData: LeaderboardEntry[] = [
          {
            id: "user1",
            username: "CryptoKing",
            wins: 45,
            losses: 12,
            draws: 3,
            score: 138,
            favoriteCharacter: "bitcoin",
            lastPlayed: "2023-05-13T14:56:12Z"
          },
          {
            id: "user2",
            username: "AliceInCryptoland",
            wins: 38,
            losses: 15,
            draws: 7,
            score: 121,
            favoriteCharacter: "ethereum",
            lastPlayed: "2023-05-14T09:23:45Z"
          },
          {
            id: "user3",
            username: "SatoshiFan",
            wins: 32,
            losses: 18,
            draws: 5,
            score: 101,
            favoriteCharacter: "bitcoin",
            lastPlayed: "2023-05-14T08:12:33Z"
          },
          {
            id: "user4",
            username: "DogeWarrior",
            wins: 29,
            losses: 22,
            draws: 9,
            score: 95,
            favoriteCharacter: "dogecoin",
            lastPlayed: "2023-05-13T22:45:19Z"
          },
          {
            id: "user5",
            username: "CryptoMaster",
            wins: 27,
            losses: 20,
            draws: 3,
            score: 84,
            favoriteCharacter: "solana",
            lastPlayed: "2023-05-14T11:09:51Z"
          },
          {
            id: "user6",
            username: "BlockchainExplorer",
            wins: 25,
            losses: 25,
            draws: 10,
            score: 85,
            favoriteCharacter: "cardano",
            lastPlayed: "2023-05-13T18:36:27Z"
          },
          {
            id: "user7",
            username: "EthFanatic",
            wins: 22,
            losses: 19,
            draws: 8,
            score: 74,
            favoriteCharacter: "ethereum",
            lastPlayed: "2023-05-14T10:14:22Z"
          },
          {
            id: "user8",
            username: "TokenCollector",
            wins: 19,
            losses: 21,
            draws: 5,
            score: 62,
            favoriteCharacter: "bnb",
            lastPlayed: "2023-05-13T15:42:39Z"
          },
          {
            id: "user9",
            username: "CoinHunter",
            wins: 18,
            losses: 22,
            draws: 10,
            score: 64,
            favoriteCharacter: "xrp",
            lastPlayed: "2023-05-14T07:51:04Z"
          },
          {
            id: "user10",
            username: "ShibaArmy",
            wins: 15,
            losses: 25,
            draws: 5,
            score: 50,
            favoriteCharacter: "shiba-inu",
            lastPlayed: "2023-05-13T20:08:15Z"
          }
        ];
        
        setLeaderboardData(mockData);
        setFilteredData(mockData);
        setIsLoading(false);
        
        toast({
          title: t("leaderboard.title"),
          description: t("leaderboard.topPlayers"),
        });
      }, 1500);
    };
    
    fetchLeaderboardData();
  }, [t]);

  // Фильтрация данных при изменении поискового запроса
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(leaderboardData);
      return;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = leaderboardData.filter(entry => 
      entry.username.toLowerCase().includes(lowercaseQuery) ||
      getFavoriteCharacterName(entry.favoriteCharacter).toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredData(filtered);
  }, [searchQuery, leaderboardData]);

  // Получение имени персонажа по ID
  const getFavoriteCharacterName = (characterId: string): string => {
    const character = cryptoCharacters.find(char => char.id === characterId);
    return character ? character.name : t("common.notFound");
  };

  // Форматирование даты последней игры
  const formatLastPlayed = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      document.documentElement.lang === 'ru' ? 'ru-RU' : 
      document.documentElement.lang === 'zh' ? 'zh-CN' : 
      'en-US', 
      {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }
    ).format(date);
  };

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
            {t("common.back")}
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <Trophy className="h-8 w-8 text-game-yellow" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-orange">
              {t("leaderboard.title")}
            </span>
          </h1>
          <div className="flex gap-2">
            <LanguageSelector />
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/battle-vs-computer")}
            >
              <Gamepad className="h-4 w-4" />
              {t("common.play")}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("leaderboard.topPlayers")}</h2>
            <div className="w-64">
              <Input 
                placeholder={t("leaderboard.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-game-primary border-t-transparent animate-spin"></div>
              <p className="text-muted-foreground">{t("common.loading")}</p>
            </div>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>{t("leaderboard.player")}</TableHead>
                    <TableHead className="text-center">{t("leaderboard.wins")}</TableHead>
                    <TableHead className="text-center">{t("leaderboard.losses")}</TableHead>
                    <TableHead className="text-center">{t("leaderboard.draws")}</TableHead>
                    <TableHead className="text-center">{t("leaderboard.score")}</TableHead>
                    <TableHead>{t("leaderboard.favoriteCharacter")}</TableHead>
                    <TableHead className="text-right">{t("leaderboard.lastPlayed")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((entry, index) => {
                    const character = cryptoCharacters.find(char => char.id === entry.favoriteCharacter);
                    
                    return (
                      <TableRow 
                        key={entry.id}
                        className={index < 3 ? "bg-game-yellow/5" : ""}
                      >
                        <TableCell className="font-bold text-center">
                          {index < 3 ? (
                            <div 
                              className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center 
                              ${index === 0 ? "bg-yellow-500" : 
                                index === 1 ? "bg-gray-300" : 
                                "bg-orange-600"} text-white`}
                            >
                              {index + 1}
                            </div>
                          ) : (
                            index + 1
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{entry.username}</TableCell>
                        <TableCell className="text-center text-green-600 font-semibold">{entry.wins}</TableCell>
                        <TableCell className="text-center text-red-500">{entry.losses}</TableCell>
                        <TableCell className="text-center text-gray-500">{entry.draws}</TableCell>
                        <TableCell className="text-center font-bold">{entry.score}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {character && (
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: character.color + "40" }}
                              ></div>
                            )}
                            {getFavoriteCharacterName(entry.favoriteCharacter)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {formatLastPlayed(entry.lastPlayed)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  
                  {filteredData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        {t("leaderboard.noPlayersFound")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="rounded-lg bg-game-primary/10 p-6 border border-game-primary/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-game-orange" />
              {t("leaderboard.howToJoin")}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              {/* Fixed typecasting issue here - check if it's an array before mapping */}
              {Array.isArray(t("leaderboard.howToJoinDesc")) 
                ? (t("leaderboard.howToJoinDesc") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : <li>{String(t("leaderboard.howToJoinDesc"))}</li>
              }
            </ul>
          </div>
        </div>
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          {t("common.copyright", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;
