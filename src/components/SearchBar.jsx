import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-4 -mt-8 relative z-10"
    >
      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-5 py-3 bg-transparent text-gray-200 outline-none placeholder-gray-400"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-orange-500 text-black font-medium hover:bg-orange-400 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
