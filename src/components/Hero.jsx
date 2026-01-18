import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="bg-slate-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-orange-500/10 text-orange-400">
            🚀 A modern blogging platform
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Write. Publish. <br />
            <span className="text-orange-500">Inspire the world.</span>
          </h1>

          <p className="text-gray-400 mb-8 max-w-xl">
            ArticleHub is a clean and powerful platform for writers and developers
            to share ideas, publish articles, and track engagement — all in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            {user ? (
              <Link
                to="/create"
                className="px-6 py-3 bg-orange-500 text-black font-medium rounded hover:bg-orange-400 transition"
              >
                Start Writing
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-6 py-3 bg-orange-500 text-black font-medium rounded hover:bg-orange-400 transition"
              >
                Get Started
              </Link>
            )}

            <Link
              to="/articles"
              className="px-6 py-3 border border-orange-500 text-orange-400 rounded hover:bg-orange-500 hover:text-black transition"
            >
              Explore Articles
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
          <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-400 mb-2">🔥 Trending Article</p>
            <h3 className="text-lg font-semibold mb-2">
              Building Scalable Full-Stack Apps
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Learn how to design secure, scalable, and production-ready applications
              using modern web technologies.
            </p>
            <span className="text-xs text-orange-400">
              👁️ 1.2k views
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
