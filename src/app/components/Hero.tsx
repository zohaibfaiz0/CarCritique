'use client'
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        {/* Decorative speed lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 mt-2 bg-red-600 opacity-20 transform -rotate-45"
              style={{
                left: `${i * 25}%`,
                width: '200%',
                top: `${i * 20}%`,
                animation: `slideRight 3s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-white">SPEED.</span>
            <span className="text-red-600">STYLE.</span>
            <span className="text-white">SPIRIT.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Expert Reviews. Unbiased Opinions. Pure Automotive Passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/posts">
              <button className="px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1">
                Latest Reviews
              </button>
            </Link>
            <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1">
              Compare Cars
            </button>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-400 text-sm mb-2">Scroll to Explore</span>
        <div className="w-6 h-10 border-2 border-red-600 rounded-full relative">
          <div className="w-1 h-3 bg-red-600 rounded-full mx-auto mt-2 animate-scroll" />
        </div>
      </div>

      {/* CSS for animations */}
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