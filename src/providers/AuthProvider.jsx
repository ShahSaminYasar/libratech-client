import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (authUser) {
        axios
          .post(
            "https://libratech-server.vercel.app/api/v1/jwt",
            { email: authUser?.email },
            { withCredentials: true }
          )
          .catch((error) => toast.error(error?.message));
      }
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const contexts = {
    loading,
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={contexts}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
