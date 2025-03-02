import React from 'react';
import Link from 'next/link';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <IoLogoTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <IoLogoFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <IoLogoInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <IoLogoYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/posts" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  Latest Reviews
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  Car Comparison
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  <span className="mr-2">→</span>
                  Latest News and Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="text-white">Email:</span> contact@carcritique.com
              </li>
              <li className="text-gray-400">
                <span className="text-white">Press:</span> press@carcritique.com
              </li>
              <li className="text-gray-400">
                <span className="text-white">Location:</span> Los Angeles, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} CarCritique. All rights reserved. 
            <span className="mx-2">|</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;