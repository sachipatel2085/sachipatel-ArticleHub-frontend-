import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'
import logo from '../assets/283ba541-5aa3-4085-b4a5-52aec65c241e.png'


const Navbar = () => {

  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="ArticleHub logo"
            className="w-9 h-9 object-contain drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]"
          />
          <span className="text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6) font-semibold text-lg">
            ArticleHub
          </span>
        </Link>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">
          <Link className="hover:text-orange-400" to="/">Home</Link>

          {user && (user.role === "admin" || user.role === "author") && (
            <Link className="hover:text-orange-400" to="/create">
              Create
            </Link>
          )}

          <Link className="hover:text-orange-400" to="/articles">
            Articles
          </Link>
          <Link to="/categories" className="hover:text-orange-400">
            Categories
          </Link>

          {user && (user.role === "admin" || user.role === "author") && (
            <Link className="hover:text-orange-400" to="/my-posts">
              My Posts
            </Link>
          )}
          {user && (user.role === "reader" ) && (
            <Link className="hover:text-orange-400" to="/become-author">
              Become Author
            </Link>
          )}
          {user && (user.role === "admin" ) && (
            <Link className="block hover:text-orange-400" to="/admin">
              Admin deshbord
            </Link>
          )}


        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 border border-orange-500 text-orange-400 rounded hover:bg-orange-500 hover:text-black transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 bg-orange-500 text-black rounded hover:bg-orange-400 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3 text-gray-300">
          <Link className="block hover:text-orange-400" to="/">Home</Link>

          {user && (user.role === "admin" || user.role === "author") && (
            <Link className="block hover:text-orange-400" to="/create">
              Create
            </Link>
          )}

          {user && (user.role === "admin" || user.role === "author") && (
            <Link className="block hover:text-orange-400" to="/my-posts">
              My Posts
            </Link>
          )}

            {user && (user.role === "reader" ) && (
              <Link className="block hover:text-orange-400" to="/become-author">
              Become Author
            </Link>
          )}
          {user && (user.role === "admin" ) && (
              <Link className="block hover:text-orange-400" to="/admin">
              Become Author
            </Link>
          )}



          {!user ? (
            <div className="flex gap-3 pt-3">
              <Link
                to="/login"
                className="flex-1 text-center px-3 py-2 border border-orange-500 text-orange-400 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-3 py-2 bg-orange-500 text-black rounded"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={logout}
              className="text-red-400 pt-3"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar