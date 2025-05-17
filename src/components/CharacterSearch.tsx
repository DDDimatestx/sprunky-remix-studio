
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CharacterSearchProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  showSortOptions?: boolean;
  onSortChange?: (sortOption: string) => void;
}

const CharacterSearch = ({ 
  onSearch, 
  placeholder = "Search cryptocurrencies...", 
  showSortOptions = false,
  onSortChange
}: CharacterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  return (
    <div className="w-full max-w-md mx-auto mb-6 space-y-4">
      <div className="relative w-full">
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
      
      {showSortOptions && onSortChange && (
        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <Select onValueChange={onSortChange} defaultValue="rank">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="marketCap">Market Cap</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
