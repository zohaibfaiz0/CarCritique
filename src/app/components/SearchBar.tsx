import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getAllPosts } from '@/sanity/lib/sanity';
import { BsSearch } from 'react-icons/bs';
import { X } from 'lucide-react';
import type { Post } from '../../types/post';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const allPosts: Post[] = await getAllPosts();
        setPosts(allPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Filter posts based on debounced query
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setFilteredPosts([]);
      return;
    }

    const lowerCaseQuery = debouncedQuery.toLowerCase();
    const results = posts
      .filter((post: Post) => 
        post.title.toLowerCase().includes(lowerCaseQuery)
      )
      .slice(0, 10); // Limit to top 10 results

    setFilteredPosts(results);
    
    // Open dropdown if we have results and query is not empty
    setIsDropdownOpen(results.length > 0 && debouncedQuery !== '');
  }, [debouncedQuery, posts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debouncedQuery) return;

    // Find the post that matches the query
    const matchedPost = posts.find((post: Post) => 
      post.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    if (matchedPost) {
      // Redirect to the post detail page using its slug
      router.push(`/posts/${matchedPost.slug.current}`);
      setQuery('');
      setIsDropdownOpen(false);
    } else {
      alert('No posts found');
    }
  };

  const handlePostSelect = (post: Post) => {
    router.push(`/posts/${post.slug.current}`);
    setQuery('');
    setIsDropdownOpen(false);
  };

  // Group posts alphabetically
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const firstLetter = post.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  const sortedGroups = Object.keys(groupedPosts).sort();

  return (
    <div className="w-full sm:max-w-md relative" ref={dropdownRef}>
      <form onSubmit={handleSearch} role="search" aria-label="Post Search">
        <div className="relative flex items-center w-full bg-gray-800 bg-opacity-50 rounded-t px-3">
          <BsSearch 
            className='absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 hover:text-red-500 transition-colors' 
            size={22} 
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim() !== '') {
                setIsDropdownOpen(true);
              }
            }}
            onFocus={() => {
              if (debouncedQuery.trim() !== '' && filteredPosts.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            aria-label="Search posts"
            className="w-full py-2 pl-10 pr-10 text-gray-300 placeholder-gray-500 bg-transparent 
            border-b border-gray-700 focus:border-red-500 focus:outline-none 
            text-sm transition-colors duration-300"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsDropdownOpen(false);
              }}
              className="absolute right-3 text-gray-400 hover:text-gray-200"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown with search results */}
      {isDropdownOpen && debouncedQuery && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-b shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Loading...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No posts found</div>
          ) : (
            <div>
              {sortedGroups.map(letter => (
                <div key={letter} className="p-2">
                  <h3 className="px-3 py-2 text-xs font-medium text-gray-400 sticky top-0 bg-gray-800">
                    {letter}
                  </h3>
                  {groupedPosts[letter].map(post => (
                    <button
                      key={post._id}
                      onClick={() => handlePostSelect(post)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-700 rounded text-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">{post.title}</span>
                        {post.publishedAt && (
                          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;