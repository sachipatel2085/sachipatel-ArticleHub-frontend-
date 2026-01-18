import { Link } from "react-router-dom";
import logo from '../assets/283ba541-5aa3-4085-b4a5-52aec65c241e.png'


const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
            <img
                src={logo}
                alt="ArticleHub logo"
                className="w-9 h-9 object-contain drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]"
            />
          <h2 className="text-xl font-semibold text-white mb-2">
            Article<span className="text-orange-500">Hub</span>
          </h2>
          <p className="text-sm">
            A modern platform to write, publish, and explore high-quality
            articles with real-time engagement insights.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-medium mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/" className="hover:text-orange-400">Articles</Link></li>
            <li><Link to="/my-posts" className="hover:text-orange-400">My Posts</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-medium mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><span className="hover:text-orange-400 cursor-pointer">About</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer">Contact</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer">Privacy</span></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-medium mb-3">Connect</h3>
          <div className="flex gap-4 text-lg">
            <span className="hover:text-orange-400 cursor-pointer">🌐</span>
            <span className="hover:text-orange-400 cursor-pointer">🐦</span>
            <span className="hover:text-orange-400 cursor-pointer">💼</span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} ArticleHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
