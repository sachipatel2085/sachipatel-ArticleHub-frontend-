import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex overflow-hidden">

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col  min-w-0">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <button
            onClick={() => setOpen(true)}
            className="text-gray-300 text-xl"
          >
            ☰
          </button>
          <h1 className="text-white font-semibold">
            Admin Panel
          </h1>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
