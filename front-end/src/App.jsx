import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Loader from "./components/loaders/Loader";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import { useGetProfileQuery } from "./features/profile/profileAPI";
import { addProfile } from "./features/profile/profileSlice";
import useAuthCheck from "./hooks/useAuthCheck";
import CreateBlogPage from "./pages/CreateBlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SingleBlogPage from "./pages/SingleBlogPage";

function App() {
  const authChecked = useAuthCheck();
  const userId = useSelector((state) => state.auth.user?.id);

  const { data } = useGetProfileQuery(userId, {
    skip: !userId,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(addProfile(data));
    }
  }, [data, dispatch]);

  return !authChecked ? (
    <Loader />
  ) : (
    <>
      <Header />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:blogId" element={<SingleBlogPage />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path="/me/:id" element={<ProfilePage />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
