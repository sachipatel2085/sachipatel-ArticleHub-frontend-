import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/admin/posts").then(res => setPosts(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/posts/${id}/status`, { status });

    setPosts(prev =>
      prev.map(p =>
        p._id === id ? { ...p, status } : p
      )
    );
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;

    await api.delete(`/admin/posts/${id}`);
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  const filteredPosts =
    filter === "all"
      ? posts
      : posts.filter(p => p.status === filter);

  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold text-white mb-6">
        Post Moderation
      </h1>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-gray-200"
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table wrapper (THIS is where overflow belongs) */}
      <div className="relative w-full overflow-x-auto rounded-lg border border-slate-700">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-slate-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Views</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr
                key={post._id}
                className="border-t border-slate-700 text-gray-300"
              >
                <td className="p-3 whitespace-nowrap">
                  {post.title}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {post.author?.name}
                </td>
                <td className="p-3 text-center capitalize">
                  {post.status}
                </td>
                <td className="p-3 text-center">
                  {post.views}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  {post.status === "draft" ? (
                    <button
                      onClick={() => updateStatus(post._id, "published")}
                      className="text-xs px-3 py-1 rounded bg-green-600 text-white"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(post._id, "draft")}
                      className="text-xs px-3 py-1 rounded bg-yellow-600 text-black"
                    >
                      Unpublish
                    </button>
                  )}

                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-xs px-3 py-1 rounded bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-gray-400 text-center py-10">
          No posts found
        </p>
      )}
    </div>
  );
};

export default AdminPosts;