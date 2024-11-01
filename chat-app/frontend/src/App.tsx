import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProfileUpdate from "./pages/ProfileUpdate";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { AppContext } from "./context/AppContext";
const App = () => {
  const navigate = useNavigate();

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext not found");
  }

  const { loadUserData } = context;

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/chat");
        await loadUserData(user.uid);
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
