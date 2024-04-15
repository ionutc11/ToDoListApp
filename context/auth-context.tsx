import { ReactNode, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext({
  authenticate: (user: any) => {},
  signOut: () => {},
  token: "",
  isAuthenticated: false,
  email: "",
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { removeData, storeData } = useLocalStorage();

  const authenticate = (user: any) => {
    storeData("user", JSON.stringify(user)).then(() => {
      setToken(user?.uid);
      setEmail(user?.email);
    });
  };

  const signOut = () => {
    removeData("user");
    setToken("");
    setEmail("");
  };

  const value = {
    authenticate,
    token,
    isAuthenticated: !!token,
    signOut,
    email,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
