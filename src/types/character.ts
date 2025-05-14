
export interface CryptoCharacter {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  marketCap: number;
  image: string;
  color: string;
  description: string;
  stats: {
    strength: number;
    speed: number;
    intelligence: number;
    charisma: number;
  };
}
