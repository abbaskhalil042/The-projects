import { useState } from "react";
import assets from "../assets/assets";
import bg from "/background.png";
const ProfileUpdate = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <section className="profile-update">
      <div
        className="w-full  login min-h-dvh flex items-center justify-evenly font-poppins"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <form className="flex w-1/4 bg-slate-800 flex-col gap-3  p-4 rounded-md justify-center items-center">
          <h2>Profile Details</h2>
          <div className="w-full max-w-xs flex gap-2 flex-col justify-center items-center">
            <label
              className="cursor-pointer px-8 flex items-center justify-center flex-col"
              htmlFor="avatar"
            >
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setImage(files[0]);
                  } else {
                    setImage(null);
                  }
                }}
                type="file"
                id="avatar"
                accept=".png, .jpg,.jpeg"
                hidden
              />
              <img className="w-1/1 rounded-full object-scale-down" src={ image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10 w-full bg-slate-800 cursor-pointer p-2 rounded-lg hover:text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered input-success w-full max-w-xs"
            /> 
            <textarea
              className="textarea textarea-success w-full max-w-xs"
              placeholder="Bio"
            ></textarea>
          </div>
          <button className="btn btn-success w-full max-w-xs" type="submit">
            Update
          </button>
        </form>
        <img
          className="w-1/4 rounded-lg"
          src={ image ? URL.createObjectURL(image) : assets.avatar_icon}
          alt=""
        />
      </div>
    </section>
  );
};

export default ProfileUpdate;
