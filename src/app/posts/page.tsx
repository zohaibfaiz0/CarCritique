import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/sanity/lib/sanity';
import type { Post } from '@/types/post';
import NavBar from '../components/NavBar';

export default async function PostsPage() {
  const posts = await getAllPosts();

  if (!posts?.length) {
    return (
      <div className="min-h-screen bg-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Latest Reviews</h1>
          <div className="h-1 w-20 bg-red-600 mx-auto mb-8" />
          <p className="text-lg text-gray-400">No reviews found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar/>
    <div className="min-h-screen bg-gray-900 py-24 px-4">
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Latest Reviews</h1>
          <div className="h-1 w-60 bg-red-600 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            In-depth analysis and expert opinions on the latest automotive releases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={post._id} className="group">
              <Link
                href={`/posts/${post.slug.current}`}
                aria-label={`Read ${post.title}`}
              >
                <div className="bg-gray-800 rounded-lg transition-transform duration-300 hover:scale-105">
                  <div className="relative h-56">
                    {post.mainImageUrl ? (
                      <Image
                        src={post.mainImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300"
                        priority={index < 3}
                      />
                    ) : (
                      <div className="bg-gray-700 h-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-gray-400 text-sm">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      {post.authorName && (
                        <div className="flex items-center space-x-2">
                          {post.authorImage && (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-600">
                              <Image
                                src={post.authorImage}
                                alt={post.authorName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <span className="text-gray-400 text-sm">{post.authorName}</span>
                        </div>
                      )}
                      <span className="text-red-500 group-hover:text-red-400 transition-colors inline-flex items-center text-sm">
                        Read Review
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
