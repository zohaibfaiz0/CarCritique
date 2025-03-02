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

  // Disable body scroll when dropdown is open
  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDropdownOpen]);

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
    <div className="w-full p-2">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {selected && (
            <button
              onClick={onClear}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Clear selection"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {selected ? (
          <div className="relative">
            <div className="relative h-36 rounded-lg overflow-hidden mb-3">
              <Image
                src={selected.image.asset.url}
                alt={selected.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">{selected.name}</h3>
              <p className="text-base font-semibold text-red-500">{formatPrice(selected.price)}</p>
            </div>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Dropdown button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 flex justify-between items-center bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <span>{searchQuery || "Select a vehicle"}</span>
              <ChevronDown size={18} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown panel */}
            {isDropdownOpen && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto overscroll-contain">
                {/* Search input */}
                <div className="sticky top-0 p-2 bg-gray-700 border-b border-gray-600 z-20">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search vehicles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 pl-8 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Search results */}
                <div className="p-2">
                  {cars.filter(car => car.name.toLowerCase().includes(searchQuery.toLowerCase())).map(car => (
                    <button
                      key={car._id}
                      onClick={() => {
                        onSelect(car);
                        setIsDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full px-2 py-1 text-left hover:bg-gray-600 rounded text-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <span>{car.name}</span>
                        <span className="text-red-500">{formatPrice(car.price)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
