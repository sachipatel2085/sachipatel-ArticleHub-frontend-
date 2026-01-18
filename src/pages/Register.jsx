import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">
          Create an account
        </h2>
        <p className="text-gray-400 mb-6">
          Join ArticleHub and start writing
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-gray-200 focus:outline-none focus:border-orange-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-gray-200 focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-gray-200 focus:outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-black font-medium rounded hover:bg-orange-400 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
