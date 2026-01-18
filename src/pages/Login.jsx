import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-gray-400 mb-6">
          Login to continue to ArticleHub
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
