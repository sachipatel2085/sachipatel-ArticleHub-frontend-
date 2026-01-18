import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const  Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get("/posts/categories/all").then(res => setCategories(res.data));
    }, []);
    
    return(
        <div className="min-h-screen bg-slate-900 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Categories
          </h1>
          <p className="text-gray-400 mt-2">
            Browse articles by topic
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-gray-400">
            No categories available
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/categories/${encodeURIComponent(cat)}`}
                className="bg-slate-800 border border-slate-700 rounded-lg py-6 text-center text-gray-200 hover:border-orange-500 hover:text-orange-400 transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    );
};

export default Categories;