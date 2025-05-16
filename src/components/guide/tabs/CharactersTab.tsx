
import { useLanguage } from "@/i18n/LanguageContext";

const CharactersTab = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('guide.addCharacters')}</h2>
      
      <div className="space-y-4">
        <p>
          To add new characters, you need to edit the <code>src/data/characters.ts</code> file. 
          Each character has the following properties:
        </p>
        
        <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
          <pre>{`interface CryptoCharacter {
  id: string;          // Unique identifier (e.g., "bitcoin")
  name: string;        // Display name of the character
  symbol: string;      // Cryptocurrency symbol (e.g., "BTC")
  rank: number;        // Rank in cryptocurrency market
  price: number;       // Price in USD
  marketCap: number;   // Market capitalization in USD
  image: string;       // URL to an image (can be added in public/images)
  color: string;       // Primary color (HEX format, e.g. "#F7931A")
  description: string; // Short description of the character
  stats: {
    strength: number;     // Strength indicator (1-100)
    speed: number;        // Speed indicator (1-100)
    intelligence: number; // Intelligence indicator (1-100)
    charisma: number;     // Charisma indicator (1-100)
  };
  statsDescriptions?: {   // Stats descriptions (optional)
    strength: string;     // Strength description
    speed: string;        // Speed description
    intelligence: string; // Intelligence description
    charisma: string;     // Charisma description
  };
}`}</pre>
        </div>
        
        <p>Example of adding a new character:</p>
        
        <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
          <pre>{`// In the file src/data/characters.ts add a new object to the cryptoCharacters array:

export const cryptoCharacters: CryptoCharacter[] = [
  // ... существующие персонажи
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    rank: 11,
    price: 34.25,
    marketCap: 12500000000,
    image: "/images/avalanche.png", // Add this image to public/images
    color: "#E84142",
    description: "Fast, low-cost, and eco-friendly platform for dApps and multi-blockchain systems.",
    stats: {
      strength: 76,
      speed: 92,
      intelligence: 84,
      charisma: 71
    },
    statsDescriptions: {
      strength: "High market capitalization and stability",
      speed: "One of the fastest networks with high throughput",
      intelligence: "Advanced consensus technology and smart contracts",
      charisma: "Growing community of developers and users"
    }
  }
];`}</pre>
        </div>
      </div>
    </div>
  );
};

export default CharactersTab;
