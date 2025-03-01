'use client';

import { CarSpecifications } from '@/types/specs';
import { Car, X, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface CarSelectorProps {
  title: string;
  selected: CarSpecifications | null;
  onSelect: (car: CarSpecifications) => void;
  onClear: () => void;
  cars: CarSpecifications[];
  formatPrice: (price: number) => string;
}

export const CarSelector = ({
  title,
  selected,
  onSelect,
  onClear,
  cars,
  formatPrice
}: CarSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Group cars alphabetically by first letter
  const groupedCars = cars.reduce((acc, car) => {
    const firstLetter = car.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(car);
    return acc;
  }, {} as Record<string, CarSpecifications[]>);
  
  // Get sorted keys for alphabetical presentation
  const sortedGroups = Object.keys(groupedCars).sort();
  
  // Filter cars based on search query
  const filteredCars = searchQuery ? 
    cars.filter(car => car.name.toLowerCase().includes(searchQuery.toLowerCase())) : 
    [];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {selected && (
            <button
              onClick={onClear}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Clear selection"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {selected ? (
          <div className="relative">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <Image
                src={selected.image.asset.url}
                alt={selected.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
              <p className="text-lg font-semibold text-red-500">{formatPrice(selected.price)}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4" ref={dropdownRef}>
            {/* Custom dropdown with search */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 flex justify-between items-center bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <span>{searchQuery || "Select a vehicle"}</span>
                <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {/* Search input */}
                  <div className="sticky top-0 p-2 bg-gray-700 border-b border-gray-600 z-20">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 pl-10 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Search results */}
                  {searchQuery && (
                    <div className="p-2">
                      <h3 className="px-3 py-2 text-sm font-medium text-gray-400">Search Results</h3>
                      {filteredCars.length === 0 ? (
                        <p className="px-3 py-2 text-gray-400">No vehicles found</p>
                      ) : (
                        filteredCars.map(car => (
                          <button
                            key={car._id}
                            onClick={() => {
                              onSelect(car);
                              setIsDropdownOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-600 rounded text-gray-200"
                          >
                            <div className="flex justify-between items-center">
                              <span>{car.name}</span>
                              <span className="text-red-500">{formatPrice(car.price)}</span>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  
                  {/* Alphabetically grouped cars list */}
                  {!searchQuery && (
                    <div className="relative">
                      {/* Alphabet quick navigation */}
                      <div className="sticky top-14 z-10 bg-gray-800 p-2 flex justify-center space-x-1 overflow-x-auto">
                        {sortedGroups.map(letter => (
                          <a 
                            key={letter}
                            href={`#group-${letter}`}
                            className="px-2 py-1 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-700 rounded"
                          >
                            {letter}
                          </a>
                        ))}
                      </div>
                      
                      {sortedGroups.map(letter => (
                        <div key={letter} id={`group-${letter}`} className="p-2">
                          <h3 className="px-3 py-2 text-sm font-medium text-gray-400 sticky top-24 bg-gray-700 z-10">
                            {letter}
                          </h3>
                          {groupedCars[letter].map(car => (
                            <button
                              key={car._id}
                              onClick={() => {
                                onSelect(car);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-600 rounded text-gray-200"
                            >
                              <div className="flex justify-between items-center">
                                <span>{car.name}</span>
                                <span className="text-red-500">{formatPrice(car.price)}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};