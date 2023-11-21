import { Navigate, useLocation } from "react-router-dom";
import LoaderDiv from "../components/Loaders/LoaderDiv";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();

  let location = useLocation();
  location = location?.pathname || "/";

  if (loading) {
    return <LoaderDiv />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location} />;
  }

  return children;
};
export default PrivateRoute;
