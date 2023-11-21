import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loaders/Loader";

const GoogleButton = ({ location = "/" }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  return (
    <button
      onClick={() => {
        setLoggingIn(true);
        googleLogin()
          .then((res) => {
            toast.success(`Signed in as ${res?.user?.displayName}`);
            setLoggingIn(false);
            navigate(location);
          })
          .catch((error) => {
            setLoggingIn(false);
            toast.error(error?.message);
          });
      }}
      type="button"
      disabled={loggingIn}
      className="btn bg-white bordered border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 disabled:bg-red-700"
    >
      {loggingIn ? <Loader /> : "Sign in with Google"}
    </button>
  );
};
export default GoogleButton;
