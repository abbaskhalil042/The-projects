import { useEffect, useState } from "react";
import assets from "../assets/assets";
import bg from "/background.png";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import upload from "../lib/Upload";
const ProfileUpdate = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const navigate = useNavigate();

  const profileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!previousImage && !image) {
        toast.error("Please provide an image");
        return;
      }

      const docRef = doc(db, "users", uid);
      if (image) {
        const imageUrl = await upload(image);
        // console.log(imageUrl);
        setPreviousImage(imageUrl as string);
        await updateDoc(docRef, {
          avatar: imageUrl,
          name,
          bio,
        });
      } else {
        await updateDoc(docRef, {
          name,
          bio,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.name) {
            setName(data.name);
          }
          if (data.bio) {
            setBio(data.bio);
          }
          if (data.avatar) {
            setPreviousImage(data.avatar);
          }
        } else {
          console.log("No such document!");
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <section className="profile-update">
      <div
        className="w-full  login min-h-dvh flex items-center justify-evenly font-poppins"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <form
          onSubmit={profileUpdate}
          className="flex w-1/4 bg-slate-800 flex-col gap-3  p-4 rounded-md justify-center items-center"
        >
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
              <img
                className="w-1/1 rounded-full object-scale-down"
                src={image ? URL.createObjectURL(image) : assets.profile}
                alt=""
              />
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              className="input input-bordered input-success w-full max-w-xs"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
          src={image ? URL.createObjectURL(image) : assets.profile}
          alt=""
        />
      </div>
    </section>
  );
};

export default ProfileUpdate;
