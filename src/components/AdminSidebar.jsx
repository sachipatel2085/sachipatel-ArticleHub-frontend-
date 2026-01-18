import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AdminSidebar = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-orange-500 text-black"
        : "text-gray-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold text-orange-400">
          Admin Panel
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {user?.name}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/posts" className={linkClass}>
          📝 Posts
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          👥 Users
        </NavLink>

        <NavLink to="/admin/reports" className={linkClass}>
          🚨 Reports
        </NavLink>
        <NavLink to="/admin/appeals" className={linkClass}>
          🧑‍⚖️ Appeals
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700">
        <NavLink
          to="/"
          className="block text-sm text-gray-400 hover:text-orange-400"
        >
          ← Exit Admin
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
