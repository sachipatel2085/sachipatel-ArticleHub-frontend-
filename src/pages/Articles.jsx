import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { FiX } from "react-icons/fi";

const Articles = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all articles (default)
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    setLoading(true);
    const res = await api.get("/posts");
    setPosts(res.data);
    setLoading(false);
  };

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      fetchAllPosts();
      return;
    }

    setLoading(true);
    const res = await api.get(`/posts/search?q=${query}`);
    setPosts(res.data);
    setLoading(false);
  };

  const clearSerch = async (e) => {
    setQuery("");
    fetchAllPosts();
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Articles
          </h1>
          <p className="text-gray-400 mt-2">
            Explore and search articles
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto mb-10"
        >
          <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-5 py-3 bg-transparent text-gray-200 outline-none"
            />
            {/* clear search */}
            {query && (
              <button 
                type="button"
                onClick={clearSerch}
                className="px-3 text-gray-400 hover:text-orange-400 transition"
                title="clear search"
              >
                <FiX size={18} />
              </button>
            )}
            <button className="px-6 py-3 bg-orange-500 text-black hover:bg-orange-400 transition">
              Search
            </button>
          </div>
        </form>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-400">
            Loading...
          </p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">
            No articles found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
