// app/posts/[slug]/page.tsx
import Image from 'next/image';
import { getAllPosts, getPostBySlug } from '@/sanity/lib/sanity';
import type { Post } from '@/types/post';
import PortableTextComponent from '@/app/components/PortableTextComponent';
import CommentComponent from '@/app/components/CommentComponent';
import CommentDisplay from '@/app/components/commentdisplay';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// 1. Define explicit prop types
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  // 2. Direct slug access with proper typing
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">Post Not Found</h1>
      </div>
    );
  }

  // 3. Rest of your original component remains unchanged
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="flex items-center text-white/65 hover:text-white transition-all duration-300">
        <ArrowLeft className="ml-3" />
        <Link href="/posts" className="px-6 py-3 rounded-xl font-medium">
          Back to Reviews
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Post Header */}
        <div className="mb-8 text-center">
          <div className="inline-block">
            <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
            <div className="h-1 bg-red-600 w-full mt-1" />
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            {post.authorImage && (
              <Image
                src={post.authorImage}
                alt={post.authorName}
                width={40}
                height={40}
                className="rounded-full border-2 border-red-600 shadow-sm"
              />
            )}
            <div>
              <p className="text-gray-400 text-sm">By {post.authorName}</p>
              <p className="text-gray-500 text-sm">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Main Image */}
        {post.mainImageUrl && (
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.mainImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          </div>
        )}

        {/* Post Content */}
        <article className="prose lg:prose-xl max-w-none bg-gray-800 p-6 rounded-lg shadow-md text-gray-300">
          {post.body?.length ? (
            <PortableTextComponent value={post.body} />
          ) : (
            <p className="text-gray-500">No content available.</p>
          )}
        </article>

        {/* Comment Section */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md">
          <CommentDisplay slug={post.slug.current} />
          <CommentComponent postName={post.title} />
        </div>
      </div>
    </div>
  );
}

// 4. Properly typed static params
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}