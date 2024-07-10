// import axios from "axios";
// import "./styles/App.scss";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ForumList from "./components/ForumList";
// import ThreadList from "./components/ThreadList";
// import PostList from "./components/PostList";
// import { Toaster } from "react-hot-toast";
// import { UserContextProvider, UserContext } from "./context/userContext";
// import Main from "./components/Main";
// import Layout from "./components/Layout";
// import { useContext } from "react";
// import AnimePage from "./pages/AnimePage";
// import MangaPage from "./pages/MangaPage";
// import CreateProfilePage from "./pages/CreateProfilePage";

// axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.withCredentials = true;

// function App() {
//   return (
//     <Router>
//       <UserContextProvider>
//         <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
//         <Routes>
//           <Route path="/" element={<MainLayout />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           <Route
//             path="/profile"
//             element={
//               <Layout>
//                 {" "}
//                 <CreateProfilePage />{" "}
//               </Layout>
//             }
//           />
//           <Route
//             path="/anime"
//             element={
//               <Layout>
//                 {" "}
//                 <AnimePage />{" "}
//               </Layout>
//             }
//           />
//           <Route
//             path="/manga"
//             element={
//               <Layout>
//                 {" "}
//                 <MangaPage />{" "}
//               </Layout>
//             }
//           />
//           <Route
//             path="/forums"
//             element={
//               <RequireAuth>
//                 <Layout>
//                   <ForumList />
//                 </Layout>
//               </RequireAuth>
//             }
//           />
//           <Route
//             path="/forums/:forumId/threads"
//             element={
//               <RequireAuth>
//                 <Layout>
//                   <ThreadList />
//                 </Layout>
//               </RequireAuth>
//             }
//           />
//           <Route
//             path="/threads/:threadId/posts"
//             element={
//               <RequireAuth>
//                 <Layout>
//                   <PostList />
//                 </Layout>
//               </RequireAuth>
//             }
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </UserContextProvider>
//     </Router>
//   );
// }

// function MainLayout() {
//   const { loading } = useContext(UserContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return <Main />;
// }

// function RequireAuth({ children }) {
//   const { user, loading } = useContext(UserContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default App;
import axios from "axios";
import "./styles/App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ForumList from "./components/ForumList";
import ThreadList from "./components/ThreadList";
import PostList from "./components/PostList";
import { Toaster } from "react-hot-toast";
import { UserContextProvider, UserContext } from "./context/userContext";
import { SearchProvider } from "./context/searchContext";
import Main from "./components/Main";
import Layout from "./components/Layout";
import { useContext } from "react";
import AnimePage from "./pages/AnimePage";
import MangaPage from "./pages/MangaPage";
import CreateProfilePage from "./pages/CreateProfilePage";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <UserContextProvider>
        <SearchProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/profile"
              element={
                <Layout>
                  {" "}
                  <CreateProfilePage />{" "}
                </Layout>
              }
            />
            <Route
              path="/anime"
              element={
                <Layout>
                  {" "}
                  <AnimePage />{" "}
                </Layout>
              }
            />
            <Route
              path="/manga"
              element={
                <Layout>
                  {" "}
                  <MangaPage />{" "}
                </Layout>
              }
            />
            <Route
              path="/forums"
              element={
                <RequireAuth>
                  <Layout>
                    <ForumList />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/forums/:forumId/threads"
              element={
                <RequireAuth>
                  <Layout>
                    <ThreadList />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route
              path="/threads/:threadId/posts"
              element={
                <RequireAuth>
                  <Layout>
                    <PostList />
                  </Layout>
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SearchProvider>
      </UserContextProvider>
    </Router>
  );
}

function MainLayout() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Main />;
}

function RequireAuth({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default App;
