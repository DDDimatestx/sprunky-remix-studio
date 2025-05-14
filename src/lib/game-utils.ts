
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
  // Случайный фактор для непредсказуемости (от 0.8 до 1.2)
  const randomFactor = 0.8 + Math.random() * 0.4;
  
  // Бонус за ранг (чем ниже ранг, тем выше бонус)
  const rankBonus = Math.max(0, 11 - character.rank) * 2;
  
  // Основной счет на основе характеристик
  const baseScore = (
    character.stats.strength * 1.2 +
    character.stats.speed * 0.8 +
    character.stats.intelligence * 1.0 +
    character.stats.charisma * 0.5
  );
  
  // Бонус за рыночную капитализацию (логарифмический масштаб)
  const marketCapBonus = Math.log10(character.marketCap / 1e9) * 5;
  
  return Math.round((baseScore + rankBonus + marketCapBonus) * randomFactor);
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
  
  // Находим персонажа с наибольшим числом использований
  const [favoriteId] = Object.entries(stats.favoriteCharacters)
    .sort(([, a], [, b]) => (b as number) - (a as number))[0];
  
  return characters.find(char => char.id === favoriteId) || null;
};
