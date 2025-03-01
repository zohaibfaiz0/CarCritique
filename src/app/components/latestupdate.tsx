'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanityClient';

interface BlogPost {
  _id: string;
  title: string;
  desc: string;
  author: string;
  mainImageUrl: string;
  readTime: string;
  date: string;
  page: string;
  slug: { current: string }; // Add slug field for fallback
}

const LatestUpdates = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState('latest');

  useEffect(() => {
    sanityClient
       .fetch(`*[_type == "post"] | order(publishedAt asc)[0...3] {
          _id,
          title,
          desc,
          author,
          mainImageUrl,
          readTime,
          date,
          page,
          slug
        }`
      )
      .then(setPosts);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Latest Reviews
            <div className="h-1 w-42 bg-red-600 mt-2" />
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-6 py-2 rounded-full ${
                activeTab === 'latest' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
              } text-white transition-all duration-300`}
            >
              Latest
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-2 rounded-full ${
                activeTab === 'trending' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
              } text-white transition-all duration-300`}
            >
              Trending
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 6).map((post) => (
            <div key={post._id} className="bg-gray-800 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative h-56">
                {post.mainImageUrl ? (
                  <Image
                    src={post.mainImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-700 h-full flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 mb-4">{post.desc}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <Link
                    href={post.page || `/posts/${post.slug.current}`}
                    className="text-red-600 hover:text-red-500 flex items-center"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/posts">
            <button className="px-8 py-3 bg-red-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              See All Reviews
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;