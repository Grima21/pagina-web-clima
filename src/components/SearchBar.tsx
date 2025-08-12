import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { CitySearchResult } from '../types/weather';
import { weatherApi } from '../utils/weatherApi';

interface SearchBarProps {
  onCitySelect: (city: CitySearchResult) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, loading = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCities = async () => {
      if (query.length < 3) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setSearchLoading(true);
      try {
        const cities = await weatherApi.searchCities(query);
        setResults(cities);
        setIsOpen(cities.length > 0);
      } catch (error) {
        console.error('Error searching cities:', error);
        setResults([]);
        setIsOpen(false);
      } finally {
        setSearchLoading(false);
      }
    };

    const timeoutId = setTimeout(searchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleCitySelect = (city: CitySearchResult) => {
    setQuery(`${city.name}, ${city.country}`);
    setIsOpen(false);
    onCitySelect(city);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ciudad..."
          disabled={loading}
          className="w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {searchLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/30 overflow-hidden z-50">
          {results.map((city, index) => (
            <button
              key={`${city.lat}-${city.lon}-${index}`}
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-black/5 transition-colors border-b border-gray/10 last:border-b-0 flex items-center gap-3"
            >
              <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-600">
                  {city.state ? `${city.state}, ` : ''}{city.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};