import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/admin/author-reports").then(res => {
      setReports(res.data);
    });
  }, []);

  const restrictAuthor = async (authorId) => {
    if (!confirm("Restrict this author?")) return;

    await api.put(`/admin/restrict-author/${authorId}`);

    setReports(prev =>
      prev.filter(r => r.author._id !== authorId)
    );
  };
  const denyReport = async (reportId) => {
  if (!confirm("Deny this report?")) return;

  await api.put(`/admin/author-reports/${reportId}/deny`);

  setReports(prev =>
    prev.filter(r => r._id !== reportId)
  );
};

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Author Reports
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-700 rounded-lg">
          <thead className="bg-slate-800 text-gray-300 text-sm">
            <tr>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Reported By</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map(report => (
              <tr
                key={report._id}
                className="border-t border-slate-700 text-sm text-gray-300"
              >
                <td className="p-3">
                  {report.author.name}
                </td>
                <td className="p-3">
                  {report.reportedBy.name}
                </td>
                <td className="p-3">
                  {report.reason}
                </td>
                <td className="p-3 text-center">
      <Link
        to={`/author/${report.author._id}`}
        target="_blank"
        className="text-orange-400 hover:underline text-xs"
      >
        Review profile
      </Link>
  </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => restrictAuthor(report.author._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Restrict Author
                  </button>
                  <button
                    onClick={() => denyReport(report._id)}
                    className="bg-slate-700 text-gray-200 px-3 py-1 rounded text-xs"
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reports.length === 0 && (
          <p className="text-gray-400 text-center py-10">
            No pending reports
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
