'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanityClient';
import PortableTextComponent from '@/app/components/PortableTextComponent';
import { Share2, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';

// This component would typically go in app/news/[slug]/page.tsx
export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params Promise using React.use()
  const { slug } = React.use(params);
  const [newsItem, setNewsItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    sanityClient
      .fetch(
        `*[_type == "newsAndUpdates" && slug.current == $slug][0] {
          _id,
          title,
          content,
          date,
          author,
          authorImage {
            asset-> {
              url
            }
          },
          categories[]->,
          mainImage {
            asset-> {
              _ref,
              url
            }
          }
        }`,
        { slug: slug }
      )
      .then((data) => {
        if (!data) {
          setError('News article not found');
        } else {
          setNewsItem(data);
          // Fetch related articles based on categories
          if (data.categories && data.categories.length > 0) {
            const categoryIds = data.categories.map((cat: any) => cat._id);
            fetchRelatedArticles(categoryIds, data._id);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news article:', err);
        setError('Failed to load news article');
        setLoading(false);
      });
  }, [slug]);

  const fetchRelatedArticles = (categoryIds: string[], currentArticleId: string) => {
    sanityClient
      .fetch(
        `*[_type == "newsAndUpdates" && 
          references($categories) && 
          _id != $currentId] | order(date desc)[0...3] {
          _id,
          title,
          slug,
          date,
          mainImage {
            asset-> {
              url
            }
          }
        }`,
        { 
          categories: categoryIds,
          currentId: currentArticleId
        }
      )
      .then((data) => {
        setRelatedArticles(data || []);
      })
      .catch((err) => {
        console.error('Error fetching related articles:', err);
      });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSave = () => {
    setSaved(!saved);
    // Here you would typically implement saving to user's bookmarks
  };

  const handleLike = () => {
    setLiked(!liked);
    // Here you would typically implement like functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-12 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">{error || 'News article not found'}</h2>
            <p className="text-gray-400 mb-8">The article you're looking for could not be found or has been removed.</p>
            <Link 
              href="/news" 
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium transition-all duration-300 hover:bg-red-700"
            >
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 md:py-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <Link 
          href="/news" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to News
        </Link>
      </div>

      {/* Article header */}
      <header className="max-w-4xl mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {newsItem.title}
        </h1>
        
        <div className="flex items-center text-gray-400 mb-8">
          <div className="flex items-center">
            {newsItem.authorImage && newsItem.authorImage.asset && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                <Image
                  src={newsItem.authorImage.asset.url}
                  alt={newsItem.author || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span>By {newsItem.author}</span>
          </div>
          <span className="mx-3">•</span>
          <span>{formatDate(newsItem.date)}</span>
          
          {/* Categories if available */}
          {newsItem.categories && newsItem.categories.length > 0 && (
            <>
              <span className="mx-3">•</span>
              <div className="flex flex-wrap gap-2">
                {newsItem.categories.map((category: any) => (
                  <span 
                    key={category._id} 
                    className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Hero image */}
        {newsItem.mainImage && newsItem.mainImage.asset && newsItem.mainImage.asset.url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 mb-12">
            <Image
              src={newsItem.mainImage.asset.url}
              alt={newsItem.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
          </div>
        )}
      </header>

      {/* Article content */}
      <div className="bg-gray-900">
        {newsItem.content && Array.isArray(newsItem.content) ? (
          <PortableTextComponent value={newsItem.content} />
        ) : (
          <div className="max-w-3xl mx-auto px-4">
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-950/20 p-6 text-center text-yellow-400">
              <p className="text-lg font-medium">No content available</p>
              <p className="mt-2 text-sm text-yellow-500/70">This article doesn't contain any content</p>
            </div>
          </div>
        )}
      </div>

      {/* Article engagement section */}
      <div className="max-w-3xl mx-auto px-4 mt-12 border-t border-gray-800 pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                liked ? 'bg-red-600/20 text-red-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              } transition-colors`}
            >
              <ThumbsUp size={18} className={liked ? 'fill-red-400' : ''} />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                saved ? 'bg-purple-600/20 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              } transition-colors`}
            >
              <Bookmark size={18} className={saved ? 'fill-purple-400' : ''} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          <button 
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

      </div>

{/* Newsletter signup */}
<div className="max-w-4xl mx-auto px-4 my-16">
  <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl p-8 border border-purple-500/20">
    <h3 className="text-2xl font-bold text-white mb-2">Stay updated with our newsletter</h3>
    <p className="text-gray-300 mb-6">Get the latest news, updates, and exclusive content directly to your inbox.</p>
    
    <div className="flex flex-col md:flex-row">
      <input 
        type="email" 
        placeholder="Your email" 
        className="flex-grow mb-4 md:mb-0 md:mr-4 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button className="px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
        Subscribe
      </button>
    </div>
  </div>
</div>
      {/* Footer navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-white">
              YourBrand
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/news" className="text-gray-400 hover:text-white transition-colors">News</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}