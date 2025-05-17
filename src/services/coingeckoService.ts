
import { CryptoCharacter } from "../types/character";

const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";

// Helper function to calculate stat values based on coin data
const calculateStats = (coin: any): { strength: number; speed: number; intelligence: number; charisma: number } => {
  // Normalize market cap to a 0-100 scale (strength)
  const normalizeMarketCap = (marketCap: number): number => {
    // Using logarithmic scale since market caps vary widely
    const log = Math.log10(Math.max(1, marketCap));
    // Max market cap in billions (BTC is around 1.2T, so log10 would be ~12)
    return Math.min(95, Math.max(50, Math.round((log / 12) * 100)));
  };
  
  // Calculate speed based on 24h trading volume and liquidity
  const calculateSpeed = (volume24h: number, marketCap: number): number => {
    if (!volume24h || !marketCap) return 65; // Default value
    // Volume to market cap ratio as an indicator of liquidity/speed
    const volumeToMarketCap = volume24h / marketCap;
    return Math.min(95, Math.max(50, Math.round(volumeToMarketCap * 1000 + 65)));
  };
  
  // Calculate intelligence based on tech score and category
  const calculateIntelligence = (coin: any): number => {
    // Smart contract platforms and DeFi get higher scores
    const category = (coin.categories || []).map((c: string) => c.toLowerCase());
    let bonus = 0;
    
    if (category.some((c: string) => c.includes("smart contract") || c.includes("platform"))) {
      bonus += 15;
    }
    if (category.some((c: string) => c.includes("defi") || c.includes("finance"))) {
      bonus += 10;
    }
    
    // Age factor - established coins have proven their tech
    const ageInDays = coin.genesis_date 
      ? (new Date().getTime() - new Date(coin.genesis_date).getTime()) / (1000 * 3600 * 24)
      : 365; // Default to 1 year
    
    const ageFactor = Math.min(20, Math.log10(ageInDays) * 5);
    
    return Math.min(98, Math.max(50, 65 + bonus + ageFactor));
  };
  
  // Calculate charisma based on social metrics and community size
  const calculateCharisma = (coin: any): number => {
    // Base charisma
    let charisma = 65;
    
    // Meme coins get a charisma boost
    const isMeme = (coin.categories || []).some((c: string) => 
      c.toLowerCase().includes("meme") || c.toLowerCase().includes("dog")
    );
    if (isMeme) charisma += 25;
    
    // Well-known coins have higher charisma
    if (coin.market_cap_rank <= 10) charisma += 20;
    else if (coin.market_cap_rank <= 25) charisma += 15;
    else if (coin.market_cap_rank <= 50) charisma += 10;
    else if (coin.market_cap_rank <= 100) charisma += 5;
    
    return Math.min(98, Math.max(50, charisma));
  };
  
  const strength = normalizeMarketCap(coin.market_cap);
  const speed = calculateSpeed(coin.total_volume, coin.market_cap);
  const intelligence = calculateIntelligence(coin);
  const charisma = calculateCharisma(coin);
  
  return {
    strength,
    speed,
    intelligence,
    charisma
  };
};

// Maps CoinGecko API data to our CryptoCharacter format
const mapCoinToCryptoCharacter = (coin: any): CryptoCharacter => {
  const stats = calculateStats(coin);
  
  const color = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    rank: coin.market_cap_rank || 999,
    price: coin.current_price || 0,
    marketCap: coin.market_cap || 0,
    image: coin.image || "/placeholder.svg",
    color: color,
    description: coin.description?.en?.slice(0, 200)?.replace(/<\/?[^>]+(>|$)/g, "") || 
      `${coin.name} is a cryptocurrency ranked #${coin.market_cap_rank}.`,
    stats,
    statsDescriptions: {
      strength: "Based on market capitalization and price stability.",
      speed: "Reflects transaction speed, network throughput and liquidity.",
      intelligence: "Based on technological complexity, network security, and use cases.",
      charisma: "Measured by brand recognition, community size, and public perception."
    },
    lastUpdated: new Date().toISOString()
  };
};

// Get top 100 coins from CoinGecko
export const getTop100Coins = async (): Promise<CryptoCharacter[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Get detailed data for each coin to extract descriptions
    const detailedData = await Promise.all(
      data.slice(0, 100).map(async (coin: any) => {
        try {
          const detailResponse = await fetch(
            `${COINGECKO_API_BASE_URL}/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
          );
          
          if (!detailResponse.ok) {
            return coin;
          }
          
          const detailData = await detailResponse.json();
          return { ...coin, description: detailData.description, categories: detailData.categories };
        } catch (error) {
          console.error(`Error fetching details for ${coin.id}:`, error);
          return coin;
        }
      })
    );
    
    return detailedData.map(mapCoinToCryptoCharacter);
  } catch (error) {
    console.error("Failed to fetch cryptocurrency data:", error);
    return [];
  }
};

// Get cached coin data or update if needed
export const getCachedCoins = async (): Promise<CryptoCharacter[]> => {
  try {
    // Check localStorage for cached data
    const cachedData = localStorage.getItem("cryptoCharacters");
    const lastUpdated = localStorage.getItem("cryptoCharactersLastUpdated");
    
    // Calculate if we need to update (6 hours = 21600000 ms)
    const UPDATE_INTERVAL = 6 * 60 * 60 * 1000;
    const shouldUpdate = !cachedData || !lastUpdated || 
      (Date.now() - new Date(lastUpdated).getTime()) > UPDATE_INTERVAL;
    
    if (shouldUpdate) {
      console.log("Fetching fresh cryptocurrency data from CoinGecko");
      const freshData = await getTop100Coins();
      
      if (freshData && freshData.length > 0) {
        localStorage.setItem("cryptoCharacters", JSON.stringify(freshData));
        localStorage.setItem("cryptoCharactersLastUpdated", new Date().toISOString());
        return freshData;
      }
      
      // If fresh fetch failed but we have cached data, use it
      if (cachedData) {
        console.log("Fresh fetch failed, using cached data");
        return JSON.parse(cachedData);
      }
      
      // If all else fails, return initial data
      return [];
    } else {
      // Return cached data
      console.log("Using cached cryptocurrency data");
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error("Error managing cached coins:", error);
    // Attempt to use initial data as fallback
    return [];
  }
};
