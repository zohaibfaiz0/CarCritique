'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoSearchOutline } from "react-icons/io5";
import SearchBar from './SearchBar';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 py-2">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-extrabold">
              <span className="text-white">CAR</span>
              <span className="text-red-600">CRITIQUE</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/posts" className="text-gray-300 hover:text-red-500 font-medium transition duration-300">
              Reviews
            </Link>
            <Link href="/compare" className="text-gray-300 hover:text-red-500 font-medium transition duration-300">
              Compare
            </Link>
            <Link href="/news" className="text-gray-300 hover:text-red-500 font-medium transition duration-300">
              News
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 focus:outline-none">
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 bg-gray-900 border-t border-gray-800 space-y-4">
          <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800 overflow-hidden">
            <input 
              type="text" 
              placeholder="Search reviews..." 
              className="w-full px-4 py-2 text-gray-300 placeholder-gray-500 bg-transparent outline-none"
            />
            <button className="px-4 text-gray-400 hover:text-red-500 focus:outline-none">
              <IoSearchOutline className="text-xl" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 text-center">
            <Link href="/posts" className="text-gray-300 hover:text-red-500 font-medium py-3 transition duration-300">
              Reviews
            </Link>
            <Link href="/compare" className="text-gray-300 hover:text-red-500 font-medium py-3 transition duration-300">
              Compare
            </Link>
            <Link href="/news" className="text-gray-300 hover:text-red-500 font-medium py-3 transition duration-300">
              News
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
