import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        {/* Decorative car silhouette */}
        <div className="absolute right-0 bottom-0 w-96 h-48 opacity-10">
          <svg viewBox="0 0 640 320" fill="currentColor" className="text-red-600">
            <path d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0 8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160 432c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200 240c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Stay in the Driver's Seat
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Subscribe for exclusive reviews, first looks at new models, and expert automotive insights delivered straight to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-gray-800 rounded border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Get Updates
            </button>
          </form>
          
          <p className="text-sm text-gray-500">
            By subscribing, you agree to our privacy policy and consent to receive auto-related news and exclusive offers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;