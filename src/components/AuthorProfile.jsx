import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth} from "../auth/AuthContext"
import api from "../api/axios";
import PostCard from "../components/PostCard";

const AuthorProfile = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [showReport, setShowReport] = useState(false);
    const [reason, setReason] = useState("");

    useEffect(() => {
        api.get(`/user/author/${id}`)
        .then(res => setData(res.data))
        .finally(() => setLoading(false));
    }, [id]);

    if(loading) return <p className="text-center text-gray-400 py-20">Loading…</p>;

    if(!data) return <p className="text-center text-gray-400 py-20">Author not found</p>;

    const { author, posts, stats} = data;
return (
    <div className="bg-slate-900 min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Profile Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-center mb-14">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-3xl font-bold">
            {author.name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">
              {author.name}
            </h1>

            <p className="text-gray-400 capitalize">
              {author.role}
            </p>

            {author.bio && (
              <p className="text-gray-400 mt-3 max-w-xl">
                {author.bio}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-xl text-white font-semibold">
                {stats.totalPosts}
              </p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-xl text-white font-semibold">
                {stats.totalViews}
              </p>
              <p className="text-sm text-gray-400">Views</p>
            </div>
          </div>
        </div>

        {/* Author Posts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Articles by {author.name}
          </h2>

          {posts.length === 0 ? (
            <p className="text-center text-gray-400">
              No published articles
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
        {user && (
  <button
    onClick={() => setShowReport(true)}
    className="text-sm text-red-400 hover:underline mt-2"
  >
    Report Author
  </button>
)}
{showReport && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-white mb-3">
        Report Author
      </h3>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Describe the issue..."
        className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-gray-200"
        rows={4}
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowReport(false)}
          className="text-gray-400 hover:underline"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await api.post(`/admin/report-author/${author._id}`, {
              reason,
            });
            alert("Report submitted");
            setShowReport(false);
            setReason("");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AuthorProfile;