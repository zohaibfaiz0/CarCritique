// types/post.d.ts
import type { PortableTextBlock } from '@portabletext/types';

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImageUrl: string;
  publishedAt: string;
  body: PortableTextBlock[];
  authorName: string;
  authorImage: string;
}