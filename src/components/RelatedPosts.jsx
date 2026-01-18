import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "./PostCard";

const relatedPost = ({ category, slug}) =>{
    const [posts, setPosts] = useState([]);

useEffect(() => {
  api
    .get(`/posts/smart-related?slug=${slug}`)
    .then(res => setPosts(res.data));
}, [slug]);

    if( posts.length === 0) return null;
    return(
        <section className="mt-14 relative z-10 pointer-events-auto">
      <h3 className="text-xl font-semibold text-white mb-6">
        Related Articles
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
    )
}

export default relatedPost;