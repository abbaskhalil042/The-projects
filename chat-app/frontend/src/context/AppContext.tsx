import { doc, getDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

interface AppContextType {
  userData: string | null;
  setUserData: React.Dispatch<React.SetStateAction<string | null>>;
  chatData: string | null;
  setChatData: React.Dispatch<React.SetStateAction<string | null>>;
  loadUserData: (uid: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<string | null>(null);
  const [chatData, setChatData] = useState<string | null>(null);

  const loadUserData = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      console.log("user snap from context file", userSnap.data());
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      toast.error(errorMessage.split("/")[1]);
    }
  };

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
