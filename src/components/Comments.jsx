import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Comments = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  // ✅ NEW: toggle state
  const [openReplies, setOpenReplies] = useState({});

  useEffect(() => {
    api.get(`/comments/post/${postId}`).then(res => {
      setComments(res.data);
    });
  }, [postId]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await api.post(`/comments/post/${postId}`, { content });
    setComments([
  { ...res.data, replies: [] },
  ...comments
]);
    setContent("");
  };

  const deleteComment = async (id) => {
    await api.delete(`/comments/${id}`);
    setComments(prev => prev.filter(c => c._id !== id));
  };

  const deleteReply = async (replyId, parentId) => {
    await api.delete(`/comments/${replyId}`);

    setComments(prev =>
      prev.map(c =>
        c._id === parentId
          ? {
              ...c,
              replies: c.replies.filter(r => r._id !== replyId),
            }
        : c
      )
    );
  };

  const saveEdit = async (id) => {
  const res = await api.put(`/comments/${id}`, {
    content: editContent,
  });

  setComments(prev =>
    prev.map(c =>
      c._id === id
        ? { ...c, content: res.data.content }
        : c
    )
  );

  setEditingId(null);
  setEditContent("");
};

  const submitReply = async (commentId) => {
    if (!replyContent.trim()) return;

    const res = await api.post(
      `/comments/reply/${postId}/${commentId}`,
      { content: replyContent }
    );

    setComments(prev =>
      prev.map(c =>
        c._id === commentId
          ? { ...c, replies: [...c.replies, res.data] }
          : c
      )
    );

    setReplyTo(null);
    setReplyContent("");

    // auto open replies after submit
    setOpenReplies(prev => ({ ...prev, [commentId]: true }));
  };

  const toggleReplies = (id) => {
    setOpenReplies(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-14 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-white mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment */}
      {user && (
        <form onSubmit={submitComment} className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-gray-200 outline-none"
            rows={3}
          />
          <button className="mt-2 bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-400">
            Post Comment
          </button>
        </form>
      )}

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div
            key={comment._id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-300 font-semibold">
                {comment.author.name}
              </p>

              {user && user._id === comment.author._id && (
                <div className="flex gap-3 text-xs">
                  <button
                    onClick={() => {
                      setEditingId(comment._id);
                      setEditContent(comment.content);
                    }}
                    className="text-orange-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Content / Edit Mode */}
            {editingId === comment._id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-gray-200"
                />
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => saveEdit(comment._id)}
                    className="bg-orange-500 text-black px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");
                    }}
                    className="text-gray-400 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-300 text-sm">
                {comment.content}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-2 text-xs">
              {comment.replies.length > 0 && (
                <button
                  onClick={() => toggleReplies(comment._id)}
                  className="text-orange-400 hover:underline"
                >
                  {openReplies[comment._id]
                    ? "Hide replies"
                    : `View replies (${comment.replies.length})`}
                </button>
              )}

              {user && (
                <button
                  onClick={() => {
                    setReplyTo(comment._id);
                    setOpenReplies(prev => ({ ...prev, [comment._id]: true }));
                  }}
                  className="text-orange-400 hover:underline"
                >
                  Reply
                </button>
              )}
            </div>

            {/* Replies (TOGGLED) */}
            {openReplies[comment._id] && (
              <div className="ml-6 mt-4 space-y-3">
                {comment.replies.map(reply => (
  <div
    key={reply._id}
    className="bg-slate-900 border border-slate-700 rounded-lg p-3"
  >
    <div className="flex justify-between items-center">
      <p className="text-xs font-semibold text-gray-300">
        {reply.author.name}
      </p>

      {/* ✅ Delete reply (only owner) */}
      {user && user._id === reply.author._id && (
        <button
          onClick={() => deleteReply(reply._id, comment._id)}
          className="text-xs text-red-400 hover:underline"
        >
          Delete
        </button>
      )}
    </div>

    <p className="text-gray-300 text-sm mt-1">
      {reply.content}
    </p>
  </div>
))}

                {replyTo === comment._id && (
                  <div>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-gray-200 text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => submitReply(comment._id)}
                        className="bg-orange-500 text-black px-3 py-1 rounded text-sm"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => setReplyTo(null)}
                        className="text-gray-400 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
