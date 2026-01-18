import { useState } from "react";
import api from "../api/axios";

const AppealForm = () => {
  const [message, setMessage] = useState("");

  const submitAppeal = async () => {
    await api.post("/appeals", { message });
    alert("Appeal submitted");
    setMessage("");
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-2">
        Submit an Appeal
      </h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Explain why your restriction should be removed..."
        className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-gray-200"
        rows={4}
      />

      <button
        onClick={submitAppeal}
        className="mt-3 bg-orange-500 text-black px-4 py-2 rounded"
      >
        Submit Appeal
      </button>
    </div>
  );
};

export default AppealForm;