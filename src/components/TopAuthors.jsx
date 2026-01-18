import { useEffect, useState } from "react";
import api from "../api/axios"
import AuthorMiniCard from "./AuthorMiniCard";

const TopAuthor = () => {
    const [authors, setAuthors] = useState([]);

    useEffect (() => {
        api.get("/user/top-authors").then(res => setAuthors(res.data))
    }, []);

    if(authors.length === 0) return null;

    return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white">
          Top Authors
        </h2>
        <p className="text-gray-400 mt-2">
          Creators shaping the community
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map(author => (
          <AuthorMiniCard
            key={author.authorId}
            author={author}
          />
        ))}
      </div>
    </section>
    </div>
  );
};

export default TopAuthor;