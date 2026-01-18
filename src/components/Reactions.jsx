import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const reactions = [
  { key: "helpful", label: "👍", title: "helpful" },
  { key: "love", label: "❤️", title: "love" },
  { key: "mindblown", label: "🤯", title: "mindblown" },
];

const Reactions = ({ post, setPost }) => {
  const { user } = useAuth();

  const react = async (type) => {
    if (!user) return alert("Login to react");

    const res = await api.post(`/posts/${post._id}/react`, {
      reaction: type,
    });

    setPost({ ...post, reactions: res.data });
  };

  return (
    <div className="flex gap-4 mt-8">
      {reactions.map(r => (
        <button
          key={r.key}
          onClick={() => react(r.key)}
          className="px-3 py-1 border border-slate-700 rounded text-sm text-gray-300 hover:border-orange-500"
        >
          {r.label} {post.reactions?.[r.key] || 0}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
