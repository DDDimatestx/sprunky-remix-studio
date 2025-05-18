import { CryptoCharacter } from "../types/character";

/**
 * Возвращает случайного персонажа из списка, исключая персонажа с указанным ID
 */
export const getRandomCharacter = (characters: CryptoCharacter[], excludeId?: string): CryptoCharacter => {
  const availableCharacters = excludeId 
    ? characters.filter(char => char.id !== excludeId)
    : characters;
  
  const randomIndex = Math.floor(Math.random() * availableCharacters.length);
  return availableCharacters[randomIndex];
};

/**
 * Расчет боевой эффективности на основе характеристик
 */
export const calculateBattleScore = (character: CryptoCharacter): number => {
  // Random factor with reduced range for more predictable outcomes (0.9 to 1.1)
  const randomFactor = 0.9 + Math.random() * 0.2;
  
  // Rank bonus based on market cap rank - gives significant advantage to higher ranked coins
  const rankBonusMap: {[key: number]: number} = {
    1: 30, // Bitcoin gets huge bonus
    2: 25, // Ethereum gets large bonus
    3: 20, // Top 3
    5: 18, // Top 5
    10: 15, // Top 10
    20: 12, // Top 20
    50: 8, // Top 50
    100: 5, // Top 100
  };
  
  let rankBonus = 0;
  for (const [rankThreshold, bonus] of Object.entries(rankBonusMap)) {
    if (character.rank <= parseInt(rankThreshold)) {
      rankBonus = bonus;
      break;
    }
  }
  
  // Base score from character stats - weighted more strategically
  const baseScore = (
    character.stats.strength * 1.5 + // Strength is most important
    character.stats.speed * 0.7 + // Speed is less critical
    character.stats.intelligence * 1.0 + // Intelligence matters moderately
    character.stats.charisma * 0.4 // Charisma matters least in battle
  );
  
  // Market cap bonus using logarithmic scale but with less significance than before
  const marketCapLog = Math.log10(Math.max(1, character.marketCap / 1e6));
  const marketCapBonus = marketCapLog * 3;
  
  // Calculate total score with more weight on base stats and rank than random factor
  const totalScore = (baseScore + rankBonus + marketCapBonus) * randomFactor;
  
  return Math.round(totalScore);
};

/**
 * Сохранение результата игры
 */
export const saveGameResult = (playerId: string, opponentId: string, result: 'win' | 'lose' | 'draw') => {
  // В реальном приложении здесь будет сохранение в базу данных
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
  gameHistory.push({
    date: new Date().toISOString(),
    playerId,
    opponentId,
    result
  });
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  
  // Обновляем статистику пользователя
  const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
  const userId = localStorage.getItem('userId') || 'guest';
  
  if (!userStats[userId]) {
    userStats[userId] = {
      wins: 0,
      losses: 0,
      draws: 0,
      score: 0,
      favoriteCharacters: {}
    };
  }
  
  // Обновляем счетчики
  if (result === 'win') {
    userStats[userId].wins += 1;
    userStats[userId].score += 3;
  } else if (result === 'lose') {
    userStats[userId].losses += 1;
  } else {
    userStats[userId].draws += 1;
    userStats[userId].score += 1;
  }
  
  // Обновляем счетчик использований персонажа
  if (!userStats[userId].favoriteCharacters[playerId]) {
    userStats[userId].favoriteCharacters[playerId] = 0;
  }
  userStats[userId].favoriteCharacters[playerId] += 1;
  
  localStorage.setItem('userStats', JSON.stringify(userStats));
};

/**
 * Получение статистики пользователя
 */
export const getUserStats = () => {
  const userId = localStorage.getItem('userId') || 'guest';
  const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
  
  return userStats[userId] || {
    wins: 0,
    losses: 0,
    draws: 0,
    score: 0,
    favoriteCharacters: {}
  };
};

/**
 * Получение любимого персонажа пользователя
 */
export const getFavoriteCharacter = (characters: CryptoCharacter[]): CryptoCharacter | null => {
  const stats = getUserStats();
  
  if (!stats.favoriteCharacters || Object.keys(stats.favoriteCharacters).length === 0) {
    return null;
  }
  
  // Находим перс��нажа с наибольшим числом использований
  const [favoriteId] = Object.entries(stats.favoriteCharacters)
    .sort(([, a], [, b]) => (b as number) - (a as number))[0];
  
  return characters.find(char => char.id === favoriteId) || null;
};
