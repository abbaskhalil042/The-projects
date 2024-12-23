import { useState } from "react";
import assets from "../assets/assets.ts";
import bg from "/background.png";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.ts";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";
// import { signup, login } from "../config/firebase.ts";
// import { useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate() ;

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        toast.error("All fields are required");
        return;
      }
      console.log({ email, password });
      await login({ email, password });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div
      className="login min-h-dvh flex items-center justify-evenly font-poppins"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img className="h-1/3 w-1/4" src={assets.logo_big} alt="Logo" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-slate-300 p-4 rounded-md"
      >
        <h2 className="text-2xl font-medium">Login</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="p-2 rounded-md outline-none"
          placeholder="Email"
          required
        />

        <div className="relative">
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye className="absolute right-2 top-1/4 cursor-pointer" />
            ) : (
              <EyeOff className="absolute right-2 top-1/4 cursor-pointer" />
            )}
          </button>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="p-2 rounded-md outline-none w-full"
            placeholder="Password"
            required
          />
        </div>

        <button
          className="p-2 rounded-md bg-orange-700 "
          type="submit"
          disabled={isLoggingIn}
        >
          login
        </button>
        <p className="flex justify-evenly">
          <span>Don't have an account?</span>
          <span className="text-orange-700 font-bold hover:underline cursor-pointer">
            <Link to="/signup">SignUp</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
