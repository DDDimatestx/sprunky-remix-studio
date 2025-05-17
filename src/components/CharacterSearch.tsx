
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface CharacterSearchProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const CharacterSearch = ({ onSearch, placeholder = "Search cryptocurrencies..." }: CharacterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="pl-9 w-full"
      />
    </div>
  );
};

export default CharacterSearch;
