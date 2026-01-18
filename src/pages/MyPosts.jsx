import { useEffect, useState } from "react";
import api from "../api/axios";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    api.get("/posts/my").then(res => setPosts(res.data));
  }, []);

  const togglePublish = async (id) => {
    await api.put(`/posts/${id}/publish`);
    setPosts(posts.map(p =>
      p._id === id
        ? { ...p, status: p.status === "draft" ? "published" : "draft" }
        : p
    ));
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-gray-300">
          <thead className="bg-slate-700 text-left">
            <tr>
              <th className="p-4">Title</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map(post => (
              <tr key={post._id} className="border-t border-slate-700">
                <td className="p-4">{post.title}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-sm
                    ${post.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}>
                    {post.status}
                  </span>
                </td>

                <td>👁️ {post.views}</td>

                <td className="space-x-3">
                  {(
                    <>
                      <button
                        onClick={() => togglePublish(post._id)}
                        className="text-orange-400 hover:underline"
                      >
                        {post.status === "draft" ? "Publish" : "Unpublish"}
                      </button>

                      <button
                        onClick={() => deletePost(post._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPosts;
