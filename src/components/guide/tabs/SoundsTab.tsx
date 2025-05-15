
import { useLanguage } from "@/i18n/LanguageContext";

const SoundsTab = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">{t('guide.addSounds')}</h2>
      
      <div className="space-y-4">
        <p>
          Для добавления звуков в игру нужно:
        </p>
        
        <ol className="list-decimal ml-6 space-y-2">
          <li>Добавьте аудиофайлы в формате MP3 или WAV в папку <code>public/sounds/</code></li>
          <li>Создайте или отредактируйте файл <code>src/hooks/use-sound-effects.ts</code> для управления звуками</li>
        </ol>
        
        <p>Пример реализации звуков:</p>
        
        <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
          <pre>{`// src/hooks/use-sound-effects.ts
import { useState, useEffect } from 'react';

type SoundType = 'battle' | 'win' | 'lose' | 'draw' | 'select' | 'click';

const soundFiles: Record<SoundType, string> = {
  battle: '/sounds/battle.mp3',
  win: '/sounds/win.mp3',
  lose: '/sounds/lose.mp3',
  draw: '/sounds/draw.mp3',
  select: '/sounds/select.mp3',
  click: '/sounds/click.mp3',
};

export const useSoundEffects = () => {
  const [sounds, setSounds] = useState<Record<SoundType, HTMLAudioElement | null>>({
    battle: null,
    win: null,
    lose: null,
    draw: null,
    select: null,
    click: null,
  });
  
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('sound-muted');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Инициализируем аудио элементы
    const audioElements: Record<SoundType, HTMLAudioElement> = {
      battle: new Audio(soundFiles.battle),
      win: new Audio(soundFiles.win),
      lose: new Audio(soundFiles.lose),
      draw: new Audio(soundFiles.draw),
      select: new Audio(soundFiles.select),
      click: new Audio(soundFiles.click),
    };
    
    // Предзагрузка
    Object.values(audioElements).forEach(audio => {
      audio.load();
      audio.volume = 0.5; // Уровень громкости по умолчанию
    });
    
    setSounds(audioElements);
    
    // Очистка при размонтировании
    return () => {
      Object.values(audioElements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('sound-muted', JSON.stringify(newMuted));
  };

  const playSound = (type: SoundType) => {
    if (!isMuted && sounds[type]) {
      sounds[type]!.currentTime = 0;
      sounds[type]!.play();
    }
  };

  return { playSound, isMuted, toggleMute };
};`}</pre>
        </div>
        
        <p>Использование в компонентах:</p>
        
        <div className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto">
          <pre>{`// В любом компоненте
import { useSoundEffects } from '../hooks/use-sound-effects';

const BattleComponent = () => {
  const { playSound, isMuted, toggleMute } = useSoundEffects();
  
  const startBattle = () => {
    playSound('battle');
    // Другие действия...
  };
  
  return (
    <div>
      <button onClick={toggleMute}>
        {isMuted ? 'Включить звук' : 'Выключить звук'}
      </button>
      <button onClick={startBattle}>
        Начать дуэль
      </button>
    </div>
  );
};`}</pre>
        </div>
      </div>
    </div>
  );
};

export default SoundsTab;
