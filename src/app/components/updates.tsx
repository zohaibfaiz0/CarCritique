'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanityClient';
import PortableTextComponent from '@/app/components/PortableTextComponent'; // Adjust the path as needed

// Updated interface to match your schema
interface NewsUpdate {
  _id: string;
  title: string;
  content: any[]; // For PortableText content
  date: string;
  author: string;
  slug: { current: string };
  mainImage?: { 
    asset: {
      _ref: string;
      url: string;
    } 
  };
}

const NewsUpdates = () => {
  const [newsItems, setNewsItems] = useState<NewsUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch(
       `*[_type == "newsAndUpdates"] | order(date desc) [0...3] {
      _id,
      title,
      content,
      date,
      author,
      slug,
      mainImage {
        asset-> {
          _ref,
          url
        }
      }
    }`
      )
      .then((data) => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news updates:", error);
        setLoading(false);
      });
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to get excerpt from content
  const getExcerpt = (content: any[]) => {
    if (!content || !Array.isArray(content)) return '';
    
    // Find the first text block and extract a snippet
    const textBlock = content.find(block => 
      block._type === 'block' && 
      block.children && 
      block.children.length > 0 &&
      block.style === 'normal'
    );
    
    if (textBlock && textBlock.children) {
      const text = textBlock.children
        .filter((child: { text: string }) => child.text)
        .map((child: { text: string }) => child.text)
        .join(' ');
        
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
    
    return '';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12">
          News & Updates
          <div className="h-1 w-56 bg-red-600 mt-2" />
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {newsItems.map((item) => (
              <div key={item._id} className="border-b border-gray-700 pb-12 last:border-0">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Featured image (if available) */}
                  {item.mainImage && item.mainImage.asset && item.mainImage.asset.url && (
                    <div className="md:w-1/3">
                      <div className="relative h-64 w-full group overflow-hidden rounded-2xl">
                        <Image
                          src={item.mainImage.asset.url}
                          alt={item.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className={item.mainImage?.asset?.url ? "md:w-2/3" : "w-full"}>
                    <h3 className="text-2xl font-bold text-white hover:text-red-600 transition-colors mb-3">
                      <Link href={`/news/${item.slug.current}`}>
                        {item.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center text-gray-400 mb-4 text-sm">
                      <span>{formatDate(item.date)}</span>
                      <span className="mx-2">•</span>
                      <span>By {item.author}</span>
                    </div>
                    
                    <div className="text-gray-300 mb-4 text-lg leading-relaxed">
                      {getExcerpt(item.content)}
                    </div>
                    
                    <Link 
                      href={`/news/${item.slug.current}`}
                      className="inline-flex items-center text-red-600 hover:text-red-500 font-medium"
                    >
                      Read Full Article
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && newsItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No news or updates available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsUpdates;