'use client';

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-20',
  useCdn: false
});

type Comment = {
  _id: string;
  name: string;
  email: string;
  comment: string;
  postName: string;
  approved: boolean;
  createdAt: string;
};

interface CommentDisplayProps {
  slug: string;
}

const CommentDisplay = ({ slug }: CommentDisplayProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch all comments for debugging
        const allComments = await sanityClient.fetch<Comment[]>(
          `*[_type == "comment"] {
            _id,
            name,
            email,
            comment,
            postName,
            approved,
            createdAt
          }`
        );

        // Fetch filtered comments
        const filteredComments = await sanityClient.fetch<Comment[]>(
          `*[
            _type == "comment" && 
            approved == true &&
            lower(postName) match ("*" + lower($searchTitle) + "*")
          ] | order(createdAt desc) {
            _id,
            name,
            email,
            comment,
            postName,
            approved,
            createdAt
          }`,
          { 
            searchTitle: slug.replace(/-/g, ' ').trim()
          }
        );

        setComments(filteredComments);
        
        // Enhanced debug info
        setDebugInfo({
          totalCommentsInDatabase: allComments.length,
          allComments: allComments,
          currentSlug: slug,
          searchPattern: slug.replace(/-/g, ' ').trim(),
          matchingComments: filteredComments.length,
          matchingCommentsData: filteredComments,
          query: {
            conditions: {
              postName: `Case-insensitive match using: *${slug.replace(/-/g, ' ').trim()}*`,
              approved: "Looking for approved == true"
            }
          }
        });

      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments. Please check console for details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchComments();
    }
  }, [slug]);

  return (
    <section className="py-8 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">
          Comments
          <div className="h-1 w-20 bg-purple-600 mt-2" />
        </h2>

        {isLoading && (
          <p className="text-gray-400 text-center py-4">Loading comments...</p>
        )}

        {error && (
          <p className="text-red-500 text-center py-4">{error}</p>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-purple-400">{comment.name}</span>
                <span className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-gray-300">{comment.comment}</p>
            </div>
          ))}

          {!isLoading && comments.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentDisplay;