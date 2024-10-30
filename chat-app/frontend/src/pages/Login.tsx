import { useState } from "react";
import assets from "../assets/assets.ts";
import bg from "/background.png";
const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  return (
    <div
      className="login min-h-dvh flex items-center justify-evenly font-poppins "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img className="h-1/3 w-1/4" src={assets.logo_big} />
      <form className="flex flex-col gap-3 bg-slate-300 p-4 rounded-md">
        <h2 className="text-2xl font-medium">{currState}</h2>

        {
            currState === "Sign up" ? (
              <input
                type="text"
                className="p-2 rounded-md outline-none"
                placeholder="Full name"
                required
              />
            ) : null
        }
        <input
          type="email"
          className="p-2 rounded-md outline-none"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="p-2 rounded-md outline-none"
          placeholder="Password"
          required
        />
        <button
          className="p-2 rounded-md bg-orange-700 text-white "
          type="submit"
        >
          {currState}
        </button>
        <div className="flex gap-2">
          <input type="checkbox" className="outline-none mt-1" />
          <p> agree to the terms of use & privacy policy</p>
        </div>
        <p className="flex justify-evenly">
            {
                currState === "Sign up" ? (
                  <span className="">
                    Already have an account?
                  </span>
                ) : <span>don't have an account?</span>
            }

          <span
            className="text-orange-700 font-bold hover:underline cursor-pointer"
            onClick={() => setCurrState(currState === "Sign up" ? "Login" : "Sign up")}
          >
            click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
