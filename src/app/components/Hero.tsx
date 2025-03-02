'use client'
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-6 sm:px-8">
      {/* Animated Speed Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-red-600 opacity-20 transform -rotate-45"
            style={{
              left: `${i * 22}%`,
              width: '170%',
              top: `${i * 20}%`,
              animation: `slideRight 4s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative text-center space-y-5 max-w-2xl sm:max-w-4xl">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-snug">
          <span className="text-white">SPEED.</span>{' '}
          <span className="text-red-600">STYLE.</span>{' '}
          <span className="text-white">SPIRIT.</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 px-4 sm:px-0">
          Expert Reviews. Unbiased Opinions. Pure Automotive Passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/posts">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition transform hover:-translate-y-1 w-full sm:w-auto text-sm sm:text-base">
              Latest Reviews
            </button>
          </Link>
          <Link href="/compare">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition transform hover:-translate-y-1 w-full sm:w-auto text-sm sm:text-base">
            Compare Cars
          </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-400 text-xs sm:text-sm mb-1">Scroll to Explore</span>
        <div className="w-4 sm:w-5 h-7 sm:h-9 border-2 border-red-600 rounded-full relative flex justify-center items-start">
          <div className="w-1 h-3 bg-red-600 rounded-full mt-2 animate-scroll" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(10px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
