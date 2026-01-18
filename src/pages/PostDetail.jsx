import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import RelatedPosts from "../components/RelatedPosts";
import Comments from "../components/Comments";
import Reactions from "../components/Reactions";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${slug}`);
        setPost(res.data);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return <p className="text-center text-gray-400 py-20">Loading…</p>;

  if (!post)
    return <p className="text-center text-gray-400 py-20">Post not found</p>;

  // Reading time (rough)
  const words = post.content.replace(/<[^>]+>/g, "").split(" ").length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="bg-slate-900 px-4 py-12">
      <article className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 md:p-10">

        {/* Category + Status */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link
            to={`/categories/${encodeURIComponent(post.category)}`}
            className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
          >
            {post.category}
          </Link>

        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
          <span>
            By <strong className="text-gray-200">{post.author?.name}</strong>
          </span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>👁️ {post.views} views</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded bg-slate-700 text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <Reactions post={post} setPost={setPost} />

        {/* Divider */}
        <hr className="border-slate-700 mb-8" />

        {/* Content */}
        <div
          className="prose prose-invert max-w-none
                     prose-headings:text-white
                     prose-p:text-gray-300
                     prose-strong:text-gray-200
                     prose-a:text-orange-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Meta */}
        <div className="mt-10 pt-6 border-t border-slate-700 text-sm text-gray-400 space-y-1">
          <p>
            Last updated:{" "}
            <span className="text-gray-200">
              {post.updatedAt
                ? new Date(post.updatedAt).toLocaleDateString()
              : "—"}
            </span>
          </p>
          <p>Post ID: {post._id}</p>
        </div>
        <Comments postId={post._id}/>

      </article>
      <div className="max-w-6xl mx-auto px-4">
  <RelatedPosts
    category={post.category}
    slug={post.slug}
  />
</div>
    </div>
  );
};

export default PostDetail;
