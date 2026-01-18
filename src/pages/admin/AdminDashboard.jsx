import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <p className="text-center text-gray-400 py-20">
        Loading dashboard…
      </p>
    );
  }

  const cards = [
    { label: "Users", value: stats.users },
    { label: "Authors", value: stats.authors },
    { label: "Posts", value: stats.posts },
    { label: "Published Posts", value: stats.publishedPosts },
    { label: "Comments", value: stats.comments },
  ];

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map(card => (
          <div
            key={card.label}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-orange-400">
              {card.value}
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;