'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/lib/sanityClient";
import type { Post } from "@/types/post";

const FeaturedStories = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    sanityClient
    .fetch(`*[_type == "post"] | order(publishedAt desc)[0...3] { // Fetch only the top 3 posts
      _id,
      title,
      slug,
      excerpt,
      mainImageUrl,
      publishedAt,
      authorName,
      authorImage
    }`)
      .then(setPosts);
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Featured Reviews
            <div className="h-1 w-42 bg-red-600 mt-2" />
          </h2>
          <Link href="/posts" className="text-red-600 hover:text-red-500 flex items-center">
            View All
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
                <div className="flex items-center space-x-3 mb-4">
                  {post.authorImage && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600">
                      <Image
                        src={post.authorImage}
                        alt={post.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-gray-400">{post.authorName}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="text-red-600 hover:text-red-500 flex items-center"
                  >
                    Read Review
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;