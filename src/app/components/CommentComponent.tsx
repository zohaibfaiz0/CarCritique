'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Assuming you're using lucide-react for icons

interface CommentFormData {
  name: string;
  email: string;
  comment: string;
}

interface CommentComponentProps {
  postName: string;
}

const CommentComponent = ({ postName }: CommentComponentProps) => {
  const [formData, setFormData] = useState<CommentFormData>({
    name: '',
    email: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${window.location.origin}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          postName,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        comment: '',
      });
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 mb-12">
      <div className="flex items-center mb-4">
        <MessageCircle size={20} className="text-purple-400 mr-2" />
        <h3 className="text-lg font-semibold text-white">Join the Discussion</h3>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
          <p className="font-medium">Submission Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md">
          <p className="font-medium">Success!</p>
          <p className="text-sm">Your comment has been submitted successfully.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 border-b border-gray-700 pb-6 mb-6">
        <div className="flex">
          
          <div className="flex-grow">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ease-in-out text-gray-200 bg-gray-700 placeholder-gray-500"
                required
                disabled={isSubmitting}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2 mt-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ease-in-out text-gray-200 bg-gray-700 placeholder-gray-500"
                required
                disabled={isSubmitting}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2 mt-4">
              <label htmlFor="comment" className="block text-sm font-semibold text-gray-300">
                Your Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ease-in-out text-gray-200 bg-gray-700 placeholder-gray-500 min-h-[120px] resize-y"
                required
                disabled={isSubmitting}
                placeholder="Share your thoughts..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                isSubmitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md`}
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </form>

      <p className="text-center text-gray-400">
        Join the conversation by signing in or creating an account
      </p>
    </div>
  );
};

export default CommentComponent;