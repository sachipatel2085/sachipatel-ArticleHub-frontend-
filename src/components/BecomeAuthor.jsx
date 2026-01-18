import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";


const BecomeAuthor = () => {
    const {user, updateUser} = useAuth();

    if (user.role !== "reader") return null;

    const handleBecomeAuthor = async () => {
        try {
            const res = await api.put("/user/become-author");
            updateUser({ ...user, role:res.data.role})
            alert("you are now author");
        } catch (error) {
            alert("something went wrong");
        }
    }

    return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
      <h3 className="text-white font-semibold mb-2">
        Become an Author
      </h3>
      <p className="text-gray-400 mb-4">
        Start writing and publishing your own articles.
      </p>
      <button
        onClick={handleBecomeAuthor}
        className="bg-orange-500 text-black px-5 py-2 rounded hover:bg-orange-400 transition"
      >
        Become Author
      </button>
    </div>
  );
}

export default BecomeAuthor;