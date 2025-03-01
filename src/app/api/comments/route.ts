import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Create a configured Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-12', // Use current date or your preferred version
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Set to false for write operations
});

// Validate the environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
    !process.env.NEXT_PUBLIC_SANITY_DATASET || 
    !process.env.SANITY_API_TOKEN) {
  throw new Error('Missing required Sanity environment variables');
}

// Validate comment data
function validateCommentData(data: any) {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    throw new Error('Name is required and must be at least 2 characters');
  }
  
  if (!data.email || typeof data.email !== 'string' || 
      !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Valid email is required');
  }
  
  if (!data.comment || typeof data.comment !== 'string' || data.comment.length < 10) {
    throw new Error('Comment must be at least 10 characters');
  }
  
  if (!data.postName || typeof data.postName !== 'string') {
    throw new Error('Post name is required');
  }
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, comment, postName } = body;

    // Validate the input data
    validateCommentData({ name, email, comment, postName });

    // Prepare the comment document
    const commentDoc = {
      _type: 'comment',
      name,
      email,
      comment,
      postName,
      approved: false, // Optional: Add an approval workflow
      createdAt: new Date().toISOString(),
    };

    // Create the comment in Sanity
    const response = await client.create(commentDoc);

    // Return success response
    return NextResponse.json({
      message: 'Comment created successfully',
      commentId: response._id
    }, {
      status: 201
    });

  } catch (error) {
    console.error('Error creating comment:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      // Validation errors
      if (error.message.includes('required') || 
          error.message.includes('must be')) {
        return NextResponse.json({
          message: error.message
        }, {
          status: 400
        });
      }

      // Sanity API errors
      if (error.message.includes('token') || 
          error.message.includes('permissions')) {
        return NextResponse.json({
          message: 'Authentication error. Please check your Sanity configuration.'
        }, {
          status: 403
        });
      }
    }

    // Generic error response
    return NextResponse.json({
      message: 'An error occurred while creating the comment'
    }, {
      status: 500
    });
  }
}