import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProfileUpdate from "./pages/ProfileUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SettingPage from "./pages/SettingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Navbar from "./components/Navbar";
import { useThemes } from "./store/useThemes";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme, setTheme } = useThemes();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div data-theme={theme}>
        <div>
          <ToastContainer />
        </div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/setting" element={<SettingPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfileUpdate /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
