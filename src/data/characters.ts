
import { CryptoCharacter } from "../types/character";

export const cryptoCharacters: CryptoCharacter[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    price: 62341.23,
    marketCap: 1228642378901,
    image: "/images/bitcoin.png",
    color: "#F7931A",
    description: "The king of cryptocurrencies, the digital gold standard with limited supply and high security.",
    stats: {
      strength: 95,
      speed: 60,
      intelligence: 85,
      charisma: 90
    },
    statsDescriptions: {
      strength: "Based on market capitalization and price stability. Bitcoin has maximum strength due to market dominance.",
      speed: "Reflects transaction speed and block confirmation time. Bitcoin is comparatively slower than many altcoins.",
      intelligence: "Based on technological complexity, network security, and developer count. Bitcoin has time-tested technology.",
      charisma: "Measured by brand recognition and public perception. Bitcoin is the most recognized cryptocurrency in the world."
    }
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    price: 3105.68,
    marketCap: 373425609823,
    image: "/placeholder.svg",
    color: "#627EEA",
    description: "Smart and creative builder of the digital world, creator of smart contracts and decentralized applications.",
    stats: {
      strength: 85,
      speed: 75,
      intelligence: 98,
      charisma: 80
    },
    statsDescriptions: {
      strength: "Based on market capitalization and ecosystem resilience. Ethereum is second in strength after Bitcoin.",
      speed: "Reflects network throughput and transaction confirmation time. After the Ethereum 2.0 update, speed has significantly increased.",
      intelligence: "Based on smart contract capabilities, developer count, and innovations. Ethereum surpasses others thanks to its dApp ecosystem.",
      charisma: "Measured by popularity among developers and investors. Ethereum is attractive to technology enthusiasts."
    }
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    price: 1.00,
    marketCap: 110854604352,
    image: "/placeholder.svg",
    color: "#26A17B",
    description: "Stable and reliable store of value, always equal to one US dollar.",
    stats: {
      strength: 60,
      speed: 70,
      intelligence: 75,
      charisma: 65
    },
    statsDescriptions: {
      strength: "Based on reserve backing and price stability. Tether is strong due to its peg to the US dollar.",
      speed: "Reflects transaction speed and liquidity. Tether provides fast transfers and high liquidity on exchanges.",
      intelligence: "Based on technology and reserve management. Tether uses smart solutions to maintain stability.",
      charisma: "Measured by user trust and trading volumes. Tether is popular as a safe haven during volatile periods."
    }
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    rank: 4,
    price: 601.42,
    marketCap: 89764519234,
    image: "/placeholder.svg",
    color: "#F3BA2F",
    description: "Powerful warrior of the exchange world, offering discounts on trading fees and building a complete ecosystem.",
    stats: {
      strength: 88,
      speed: 82,
      intelligence: 80,
      charisma: 75
    },
    statsDescriptions: {
      strength: "Based on market capitalization and support from the largest crypto exchange. BNB has strong backing from the Binance ecosystem.",
      speed: "Reflects the speed of the Binance Smart Chain. BNB provides fast and inexpensive transactions.",
      intelligence: "Based on multifunctionality and ecosystem development. BNB continues to expand its capabilities.",
      charisma: "Measured by popularity among traders and number of use cases. BNB is attractive due to its practical utility."
    }
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    rank: 5,
    price: 134.21,
    marketCap: 60372953764,
    image: "/placeholder.svg",
    color: "#00FFA3",
    description: "Lightning-fast speedster of the blockchain world with high throughput and low fees.",
    stats: {
      strength: 80,
      speed: 98,
      intelligence: 85,
      charisma: 82
    },
    statsDescriptions: {
      strength: "Based on market capitalization and network resilience. Solana has strong technological foundations.",
      speed: "Reflects highest throughput and low latency. Solana is one of the fastest blockchain networks.",
      intelligence: "Based on innovative consensus algorithm and architecture. Solana offers smart technical solutions.",
      charisma: "Measured by popularity among NFT and DeFi developers. Solana attracts innovative projects."
    }
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    rank: 6,
    price: 0.517,
    marketCap: 28947625341,
    image: "/placeholder.svg",
    color: "#23292F",
    description: "Fast intermediary for international transfers, connecting banks and payment systems.",
    stats: {
      strength: 75,
      speed: 95,
      intelligence: 78,
      charisma: 70
    },
    statsDescriptions: {
      strength: "Based on partnerships with financial institutions and resilience to regulatory challenges. XRP demonstrates endurance.",
      speed: "Reflects lightning-fast transaction processing. XRP can conduct transactions in seconds.",
      intelligence: "Based on consensus technology and integration with traditional financial world. XRP has clear business cases.",
      charisma: "Measured by community loyalty and market perception. XRP has a dedicated audience of followers."
    }
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    rank: 7,
    price: 1.00,
    marketCap: 28135573128,
    image: "/placeholder.svg",
    color: "#2775CA",
    description: "Regulated stablecoin fully backed by US dollars, offering transparency and stability.",
    stats: {
      strength: 62,
      speed: 68,
      intelligence: 80,
      charisma: 70
    },
    statsDescriptions: {
      strength: "Based on regulatory transparency and reserve backing. USDC embodies reliability.",
      speed: "Reflects transaction speed on Ethereum and other supported blockchains. USDC provides acceptable transfer speed.",
      intelligence: "Based on regulatory compliance and smart asset management. USDC offers intelligent solutions for stability.",
      charisma: "Measured by trust from institutional investors and company transparency. USDC is attractive for the regulated market."
    }
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    rank: 8,
    price: 0.45,
    marketCap: 16149562798,
    image: "/placeholder.svg",
    color: "#0033AD",
    description: "Scientist and philosopher of the crypto world, creating blockchain based on scientific research and formal verification.",
    stats: {
      strength: 72,
      speed: 65,
      intelligence: 94,
      charisma: 78
    },
    statsDescriptions: {
      strength: "Based on academic approach and thorough development. Cardano builds a solid foundation for long-term growth.",
      speed: "Reflects throughput and transaction finality time. Cardano prioritizes security over speed.",
      intelligence: "Based on peer-reviewed scientific research and formal code verification. Cardano is one of the most intellectual projects.",
      charisma: "Measured by community dedication and popularity among academic circles. Cardano attracts a thinking audience."
    }
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    rank: 9,
    price: 0.132,
    marketCap: 19014937634,
    image: "/placeholder.svg",
    color: "#C2A633",
    description: "Friendly meme dog that became a people's cryptocurrency and internet favorite.",
    stats: {
      strength: 60,
      speed: 75,
      intelligence: 65,
      charisma: 98
    },
    statsDescriptions: {
      strength: "Based on market capitalization and celebrity endorsements. Dogecoin is strong thanks to its community.",
      speed: "Reflects block times and transaction confirmations. Dogecoin provides fast transfers.",
      intelligence: "Based on technology simplicity and adaptation. Dogecoin doesn't claim technological innovations.",
      charisma: "Measured by media presence and recognition. Dogecoin is the most charismatic cryptocurrency thanks to memes and public recognition."
    }
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    rank: 10,
    price: 0.00001822,
    marketCap: 10733676429,
    image: "/placeholder.svg",
    color: "#FFA409",
    description: "DOGE's younger brother that created its own ecosystem with ambitious plans.",
    stats: {
      strength: 58,
      speed: 72,
      intelligence: 68,
      charisma: 90
    },
    statsDescriptions: {
      strength: "Based on trading volumes and community stability. SHIB is gaining strength thanks to its growing ecosystem.",
      speed: "Reflects transaction times on the Ethereum network. SHIB depends on the speed of the underlying network.",
      intelligence: "Based on ecosystem development and additional services. SHIB is evolving from a meme to a full-fledged ecosystem.",
      charisma: "Measured by community activity and media presence. SHIB attracts attention with its story."
    }
  }
];
