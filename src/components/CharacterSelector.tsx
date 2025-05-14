
import { useState } from "react";
import { CryptoCharacter } from "../types/character";
import { 
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious 
} from "./ui/carousel";
import CharacterCard from "./CharacterCard";

interface CharacterSelectorProps {
  characters: CryptoCharacter[];
  selectedCharacter: CryptoCharacter | null;
  onSelectCharacter: (character: CryptoCharacter) => void;
}

const CharacterSelector = ({ characters, selectedCharacter, onSelectCharacter }: CharacterSelectorProps) => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-[85vw] md:max-w-3xl pb-10"
    >
      <CarouselContent>
        {characters.map((character) => (
          <CarouselItem key={character.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
            <CharacterCard
              character={character}
              isSelected={selectedCharacter?.id === character.id}
              onClick={() => onSelectCharacter(character)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default CharacterSelector;
