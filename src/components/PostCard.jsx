import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-orange-500 hover:-translate-y-1 transition-transform">
              
      <h2 className="text-xl font-semibold text-white mb-2">
        {post.title}
      </h2>

      <div className="text-sm text-gray-400 mb-4 space-y-1">
        <p>📂 {post.category}</p>
        <p>👁️ {post.views} views</p>
        <p>✍️ {post.author?.name}</p>
      </div>

      {/* Spacer */}
      <div className="" />

        <Link
          to={`/posts/${post.slug}`}
          className="relative z-20 text-orange-400 hover:underline pointer-events-auto"
          
        >
          Read more →
        </Link>
    </div>
  );
};

export default PostCard;
