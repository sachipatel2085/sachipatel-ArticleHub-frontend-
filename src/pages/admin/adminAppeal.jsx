import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminAppeals = () => {
  const [appeals, setAppeals] = useState([]);

  useEffect(() => {
    api.get("/admin/appeals").then(res => {
      setAppeals(res.data);
    });
  }, []);

  const review = async (id, status) => {
    await api.put(`/admin/appeals/${id}`, { status });
    setAppeals(prev => prev.filter(a => a._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Appeals
      </h1>

      {appeals.map(appeal => (
        <div
          key={appeal._id}
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4"
        >
          <p className="text-gray-300 font-semibold">
            {appeal.author.name}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {appeal.message}
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => review(appeal._id, "approved")}
              className="bg-green-600 px-3 py-1 text-white rounded text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => review(appeal._id, "rejected")}
              className="bg-red-600 px-3 py-1 text-white rounded text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {appeals.length === 0 && (
        <p className="text-gray-400">No pending appeals</p>
      )}
    </div>
  );
};

export default AdminAppeals;