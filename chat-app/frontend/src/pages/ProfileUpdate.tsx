import { useState } from "react";
import bg from "/background.png";
import { Camera, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const [image, setImage] = useState();

  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();

  console.log("authUser", authUser);

  const profileUpdate = async (e) => {
    if (isUpdatingProfile) return;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result;
      setImage(file);
      updateProfile(base64String as string);
    };
    reader.readAsDataURL(file);
  };
  const imageUrl = image
    ? URL.createObjectURL(image)
    : "https://plus.unsplash.com/premium_photo-1677252438426-595a3a9d5e11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoYXR8ZW58MHx8MHx8fDA%3D";

  return (
    <section className="profile-update">
      <div
        className="w-full login min-h-dvh flex items-center justify-evenly font-poppins"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex w-1/4 bg-slate-800 flex-col gap-3 p-4 rounded-md justify-center items-center">
          <h2 className=" text-xl">Update Profile Picture</h2>
          <div className="w-full max-w-xs flex gap-2 flex-col justify-center items-center">
            <label
              className="cursor-pointer px-8 flex items-center justify-center flex-col relative"
              htmlFor="avatar"
            >
              <input
                onChange={profileUpdate}
                type="file"
                id="avatar"
                accept=".png, .jpg,.jpeg"
                hidden
                aria-label="Upload Profile Picture"
              />
              <Camera className="absolute right-[6rem] bottom-3 bg-slate-800 p-1 rounded-full" />
              <img
                className="w-1/2  rounded-full object-scale-down shadow-2xl"
                src={isUpdatingProfile ? "" : authUser?.profile}
                alt="Profile"
              />

              {isUpdatingProfile && (
                <div className="flex absolute top-0 left-0 w-full h-full justify-center items-center">
                  <Loader className="animate-spin" />
                </div>
              )}
            </label>
          </div>
          <div>
            <input
              type="text"
              value={authUser?.name}
              placeholder="Your Name"
              className="input input-bordered input-success w-full max-w-xs"
            />
            <textarea
              value={authUser?.email}
              className="textarea textarea-success w-full max-w-xs"
              placeholder="Bio"
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdate;
