import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";

const CategoryPosts = () => {
    const {category} = useParams();
    const [ posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [category]);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await api.get(`/posts?category=${decodeURIComponent(category)}`);
        setPosts(res.data);
        setLoading(false);
    }

    return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            {decodeURIComponent(category)} Articles
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">
            No articles in this category
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPosts;