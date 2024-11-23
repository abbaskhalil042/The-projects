import { LogOut, MessagesSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false); // State to track visibility
  const [lastScrollY, setLastScrollY] = useState(0); //

  const { logout, authUser } = useAuthStore();



  useEffect(() => {
    const handleScroll = () => {
      // If scrollY is greater than lastScrollY, we're scrolling down, so hide the navbar
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        // Otherwise, show the navbar
        setIsHidden(false);
      }

      // Update the last scroll position to the current scroll position
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, [lastScrollY]);
  return (
    <header       className={`flex justify-between items-center p-2 sticky top-0 left-0 right-0 z-[1000]   rounded-b-lg shadow-md w-full transition-transform ${
      isHidden ? "-translate-y-full" : "translate-y-0"
    }`}
>
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-center justify-center">
          <Link className="flex gap-2 items-center" to="/">
            <MessagesSquare /> <span className="hidden sm:inline">chat</span>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            className="flex gap-2 items-center flex-col  p-1 rounded-lg "
            to="/setting"
          >
            <Settings />
            <span className="hidden sm:inline text-[10px]">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                className="flex gap-2 items-center flex-col  p-1 rounded-lg "
                to={"/profile"}
              >
                <User />
                <span className="hidden sm:inline text-[10px]">Profile</span>
              </Link>

              <button
                className="flex gap-2 items-center flex-col  p-1 rounded-lg "
                onClick={logout}
              >
                <LogOut />
                <span className="hidden sm:inline text-[10px]">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
