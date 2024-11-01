import { useState } from "react";
import assets from "../assets/assets.ts";
import bg from "/background.png";

import { toast } from "react-toastify";
import { signup, login } from "../config/firebase.ts";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [currState, setCurrState] = useState("Sign up");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currState === "Sign up") {
      await signup(username, email, password);
      toast("Signed up successfully");
      setUsername("");
      setEmail("");
      setPassword("");
      setCurrState("Sign in");
    } else {
      login(email, password);
      toast("Logged in successfully");

      setEmail("");
      setPassword("");

      navigate("/chat");
    }
  };

  return (
    <div
      className="login min-h-dvh flex items-center justify-evenly font-poppins "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img className="h-1/3 w-1/4" src={assets.logo_big} />
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 bg-slate-300 p-4 rounded-md"
      >
        <h2 className="text-2xl font-medium">{currState}</h2>

        {currState === "Sign up" ? (
          <input
            type="text"
            className="p-2 rounded-md outline-none"
            placeholder="Full name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : null}
        <input
          type="email"
          className="p-2 rounded-md outline-none"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="p-2 rounded-md outline-none"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-2 rounded-md bg-orange-700 text-white "
          type="submit"
        >
          {currState}
        </button>

        <p className="flex justify-evenly">
          {currState === "Sign up" ? (
            <span className="">Already have an account?</span>
          ) : (
            <span>don't have an account?</span>
          )}

          <span
            className="text-orange-700 font-bold hover:underline cursor-pointer"
            onClick={() =>
              setCurrState(currState === "Sign up" ? "Login" : "Sign up")
            }
          >
            click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
