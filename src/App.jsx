import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import CreatePost from "./pages/CreatePost.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import './App.css'
import Footer from "./components/Footer.jsx";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories.jsx";
import CategoryPosts from "./pages/CategoryPosts.jsx";
import BecomeAuthor from "./components/BecomeAuthor.jsx";
import AuthorProfile from "./components/AuthorProfile.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLayout from "./layouts/AdminLayout";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminRoute from "./routes/AdminRoute";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminReports from "./pages/admin/AdminReports.jsx";
import AdminAppeals from "./pages/admin/adminAppeal.jsx";
function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<CategoryPosts />} />
            <Route path="/create" element={
              <ProtectedRoute roles={["admin", "author"]}>
                <CreatePost/>
              </ProtectedRoute>
            }/>
            <Route path="/my-posts" element={
              <ProtectedRoute roles={["admin", "author"]}>
                <MyPosts/>
              </ProtectedRoute>
            }/>
            <Route path="/articles" element={<Articles />} />
            <Route path="/become-author" element={<BecomeAuthor />} />
            <Route path="/posts/:slug" element={<PostDetail/>}/>
            <Route path="/author/:id" element={<AuthorProfile />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            <Route
              path="/admin/posts"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminPosts />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminUsers />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminReports />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/appeals"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminAppeals />
                  </AdminLayout>
                </AdminRoute>
              }
            />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App;