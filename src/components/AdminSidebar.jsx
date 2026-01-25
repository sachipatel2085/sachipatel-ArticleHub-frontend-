import { NavLink } from "react-router-dom";


const AdminSidebar = ({ open, setOpen }) => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-orange-500 text-black"
        : "text-gray-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 z-50
        h-full w-64 bg-slate-900 border-r border-slate-700
        overflow-y-auto
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold text-orange-400">
          Admin
        </h1>

        {/* Close button (mobile only) */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden text-gray-400"
        >
          X
        </button>
      </div>

      {/* Nav */}
      <nav className="px-4 py-6 space-y-2">
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
          ⚖ Appeals
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700">
        <NavLink
          to="/"
          className="text-sm text-gray-400 hover:text-orange-400"
        >
          ← Exit Admin
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
