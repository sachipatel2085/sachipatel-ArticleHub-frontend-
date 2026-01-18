import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import AppealForm from "../components/AppealForm";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: "",
    content: "",
  });
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", {
        title: form.title,
        category: form.category,
        tags: form.tags.split(",").map((t) => t.trim()),
        content: form.content,
      });

      alert("Post created (Draft)");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  


  return (
    
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      {user?.isRestricted && (
  <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded mb-6">
    Your author privileges are restricted due to policy violations.
  </div>
)}
      {user?.isRestricted && <AppealForm />}


      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold text-white mb-1">Create Post</h2>
        <p className="text-gray-400 mb-6">Saved as draft by default</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Post title"
            onChange={handleChange}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-gray-200 focus:border-orange-500 outline-none"
          />

          <input
            name="category"
            placeholder="Category (e.g. Backend)"
            onChange={handleChange}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-gray-200 focus:border-orange-500 outline-none"
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-gray-200 focus:border-orange-500 outline-none"
          />

          <textarea
            name="content"
            rows="10"
            placeholder="Write your article here..."
            onChange={handleChange}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-gray-200 focus:border-orange-500 outline-none"
          />

          <button className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-400 transition">
            Save Draft
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
