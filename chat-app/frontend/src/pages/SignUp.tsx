import { useState } from "react";
import assets from "../assets/assets.ts";
import bg from "/background.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.ts";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username) {
      toast.error("Username is required.");
      return false;
    }
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

    console.log({ username, email, password }); // Log the form data

    try {
      if (validateForm()) {
        await signup({ username, email, password });
      } else {
        toast.error("All fields are required");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login min-h-screen flex items-center justify-evenly font-poppins">
      <img className="h-1/3 w-1/4" src={assets.logo_big} alt="Logo" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-slate-300 p-4 rounded-md"
      >
        <h2 className="text-2xl font-medium">Sign Up</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="p-2 rounded-md outline-none"
          placeholder="Full name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="p-2 rounded-md outline-none"
          placeholder="Email"
          required
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2/4 transform -translate-y-2/4"
          >
            {showPassword ? <Eye /> : <EyeOff />}
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
          className={`p-2 rounded-md bg-orange-700  ${
            isSigningUp ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSigningUp}
        >
          {isSigningUp ? "Submitting..." : "Submit"}
        </button>
        <p className="flex justify-evenly">
          <Link
            to="/login"
            className="text-orange-700 font-bold hover:underline"
          >
            Already have an account? Login here.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
