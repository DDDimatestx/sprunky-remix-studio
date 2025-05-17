
import { useState, useEffect, useRef } from "react";
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
  const [visibleChars, setVisibleChars] = useState<CryptoCharacter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const totalPages = Math.ceil(characters.length / pageSize);
  
  // Update visible characters when characters change or page changes
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setVisibleChars(characters.slice(start, end));
  }, [characters, currentPage]);
  
  // Reset to page 1 when characters list changes length (like after search)
  useEffect(() => {
    setCurrentPage(1);
  }, [characters.length]);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  // If we have no characters, show empty state
  if (characters.length === 0) {
    return (
      <div className="w-full text-center p-6 bg-muted rounded-lg">
        <p>No cryptocurrencies found matching your criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "center",
          loop: false,
        }}
        className="w-full max-w-[85vw] md:max-w-3xl pb-10"
      >
        <CarouselContent>
          {visibleChars.map((character) => (
            <CarouselItem key={character.id} className="basis-full sm:basis-1/2 md:basis-1/3 pl-4 md:pl-6">
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
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            Previous
          </button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages 
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterSelector;
