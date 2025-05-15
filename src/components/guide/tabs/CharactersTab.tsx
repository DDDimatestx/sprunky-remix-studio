
import { useLanguage } from "@/i18n/LanguageContext";

const CharactersTab = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('guide.addCharacters')}</h2>
      
      <div className="space-y-4">
        <p>
          Чтобы добавить новых персонажей, нужно отредактировать файл <code>src/data/characters.ts</code>. 
          Каждый персонаж имеет следующие свойства:
        </p>
        
        <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
          <pre>{`interface CryptoCharacter {
  id: string;          // Уникальный идентификатор (например, "bitcoin")
  name: string;        // Отображаемое имя персонажа
  symbol: string;      // Символ криптовалюты (например, "BTC")
  rank: number;        // Ранг в рейтинге криптовалют
  price: number;       // Цена в USD
  marketCap: number;   // Рыночная капитализация в USD
  image: string;       // URL к изображению (можно добавить в public/images)
  color: string;       // Основной цвет (в формате HEX, например "#F7931A")
  description: string; // Краткое описание персонажа
  stats: {
    strength: number;     // Показатель силы (1-100)
    speed: number;        // Показатель скорости (1-100)
    intelligence: number; // Показатель интеллекта (1-100)
    charisma: number;     // Показатель харизмы (1-100)
  };
  statsDescriptions?: {   // Описания показателей (опционально)
    strength: string;     // Описание силы
    speed: string;        // Описание скорости
    intelligence: string; // Описание интеллекта
    charisma: string;     // Описание харизмы
  };
}`}</pre>
        </div>
        
        <p>Пример добавления нового персонажа:</p>
        
        <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
          <pre>{`// В файле src/data/characters.ts добавьте новый объект в массив cryptoCharacters:

export const cryptoCharacters: CryptoCharacter[] = [
  // ... существующие персонажи
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    rank: 11,
    price: 34.25,
    marketCap: 12500000000,
    image: "/images/avalanche.png", // Добавьте изображение в public/images
    color: "#E84142",
    description: "Быстрая, низкозатратная и экологичная платформа для dApps и систем с несколькими блокчейнами.",
    stats: {
      strength: 76,
      speed: 92,
      intelligence: 84,
      charisma: 71
    },
    statsDescriptions: {
      strength: "Высокая рыночная капитализация и стабильность",
      speed: "Одна из самых быстрых сетей с высокой пропускной способностью",
      intelligence: "Продвинутая технология консенсуса и смарт-контрактов",
      charisma: "Растущее сообщество разработчиков и пользователей"
    }
  }
];`}</pre>
        </div>
      </div>
    </div>
  );
};

export default CharactersTab;
