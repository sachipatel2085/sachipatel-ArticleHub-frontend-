import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PostCard from "./PostCard";

const TopPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/top?limit=6").then(res => setPosts(res.data));
  }, []);

  if (posts.length === 0) return null;

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">
                Top Articles
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded" />
            <p className="text-gray-400 mt-2">
                Most read articles on ArticleHub
            </p>
        </div>
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-orange-500  flex flex-col hover:-translate-y-1 transition-transform"
            />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <p className="text-gray-400 mt-10">
            No articles published yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopPosts;
