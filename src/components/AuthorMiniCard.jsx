import { Link } from "react-router-dom";

const AuthorMiniCard = ({ author }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center hover:border-orange-500 hover:-translate-y-1 transition-transform">

      {/* Avatar */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl font-bold">
        {author.name.charAt(0).toUpperCase()}
      </div>

      <h3 className="text-white font-semibold">
        {author.name}
      </h3>

      <p className="text-sm text-gray-400 capitalize">
        {author.role}
      </p>

      <div className="flex justify-center gap-4 text-sm text-gray-400 mt-4">
        <span>📝 {author.totalPosts}</span>
        <span>👁️ {author.totalViews}</span>
      </div>

      <Link
        to={`/author/${author.authorId}`}
        className="inline-block mt-4 text-orange-400 hover:underline text-sm"
      >
        View profile →
      </Link>
    </div>
  );
};

export default AuthorMiniCard;
