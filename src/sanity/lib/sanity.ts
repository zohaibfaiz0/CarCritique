import { createClient } from '@sanity/client';
import type { Post } from '../../types/post'; // Corrected import path

export const sanityClient = createClient({
  projectId: "q09xn9h8",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

export const getAllPosts = async (): Promise<Post[]> => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    authorName,
    authorImage,
    mainImageUrl,
    publishedAt,
    body[]
  }`;
  
  return await sanityClient.fetch(query);
};

export const getLatestPosts = async (): Promise<Post[]> => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    authorName,
    authorImage,
    mainImageUrl,
    publishedAt,
    body[]
  }`;
  
  return await sanityClient.fetch(query);
};

export const getTrendingPosts = async (): Promise<Post[]> => {
  const query = `*[_type == "post"] | order(publishedAt asc) {
    _id,
    title,
    slug,
    excerpt,
    authorName,
    authorImage,
    mainImageUrl,
    publishedAt,
    body[]
  }`;
  
  return await sanityClient.fetch(query);
};


export const getPostBySlug = async (slug: string): Promise<Post> => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    authorName,
    authorImage,
    mainImageUrl,
    publishedAt,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug
        }
      }
    }
  }`;
  return await sanityClient.fetch(query, { slug });
};
