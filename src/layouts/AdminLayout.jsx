import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
