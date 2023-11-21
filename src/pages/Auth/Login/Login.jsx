import { NavLink, useLocation, useNavigate } from "react-router-dom";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import Title from "../../../components/Title/Title";
import Container from "../../../layouts/Container";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../../../components/Loaders/Loader";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  let location = useLocation();
  location = location?.state || "/";

  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const form = e.target;
    // Form field values
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((res) => {
        toast.success(`Logged in as ${res?.user?.displayName}`);
        setLoggingIn(false);
        navigate(location);
      })
      .catch((error) => {
        toast.error(error?.message);
        setLoggingIn(false);
      });
  };

  return (
    <section className="bg-teal-100 py-10">
      <Container
        className={`min-h-screen flex flex-col items-center justify-center`}
      >
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-5 rounded-lg bg-white shadow-md flex flex-col text-lg font-medium gap-4"
        >
          <Title className={`mb-[0px]`}>Login</Title>
          {/* Form Input Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base text-teal-500">
                Your Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              className="input input-bordered w-full bg-white text-lg text-teal-500"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base text-teal-500">
                Your Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              className="input input-bordered w-full bg-white text-lg text-teal-500"
            />
          </div>
          <button
            type="submit"
            className="btn btn-accent text-lg text-white disabled:bg-teal-900"
            disabled={loggingIn}
          >
            {loggingIn ? <Loader /> : "Login"}
          </button>

          <p className="flex items-center gap-3 text-lg font-normal">
            <span className="block w-full h-[1px] bg-slate-300" />
            or
            <span className="block w-full h-[1px] bg-slate-300" />
          </p>

          <GoogleButton location={location} />

          <p className="text-base font-normal">
            New to this site?{" "}
            <NavLink to="/register" className="text-blue-700">
              Register
            </NavLink>
          </p>
        </form>
      </Container>
    </section>
  );
};
export default Login;
