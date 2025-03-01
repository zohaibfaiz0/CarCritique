import React from 'react';
import { 
  IoLogoTwitter, 
  IoLogoFacebook, 
  IoLogoInstagram, 
  IoLogoYoutube 
} from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-white">CAR</span>
              <span className="text-red-600">CRITIQUE</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Delivering unbiased automotive reviews, in-depth analysis, and expert insights for the passionate driver.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <IoLogoTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <IoLogoFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <IoLogoInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <IoLogoYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  Latest Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  Car Comparison
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  Buyer's Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Latest Reviews */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6">Latest Reviews</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="group">
                  <p className="text-gray-400 group-hover:text-red-500 transition-colors">2024 BMW M5 CS Review</p>
                  <p className="text-sm text-gray-500">Performance Sedan</p>
                </a>
              </li>
              <li>
                <a href="#" className="group">
                  <p className="text-gray-400 group-hover:text-red-500 transition-colors">Tesla Model 3 Highland</p>
                  <p className="text-sm text-gray-500">Electric Vehicle</p>
                </a>
              </li>
              <li>
                <a href="#" className="group">
                  <p className="text-gray-400 group-hover:text-red-500 transition-colors">Porsche Macan EV</p>
                  <p className="text-sm text-gray-500">Electric SUV</p>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="text-red-500">Email:</span> contact@carcritique.com
              </li>
              <li className="text-gray-400">
                <span className="text-red-500">Press:</span> press@carcritique.com
              </li>
              <li className="text-gray-400">
                <span className="text-red-500">Location:</span> Los Angeles, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} CarCritique. All rights reserved. 
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Use</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;