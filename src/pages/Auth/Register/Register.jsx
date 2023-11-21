import { NavLink, useLocation, useNavigate } from "react-router-dom";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import Title from "../../../components/Title/Title";
import Container from "../../../layouts/Container";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../../../components/Loaders/Loader";

const Register = () => {
  const { register, logout, login } = useAuth();
  const navigate = useNavigate();
  let location = useLocation();
  location = location?.state || "/";

  const [registering, setRegistering] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistering(true);
    const form = e.target;
    // Field Values
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dp = form.dp.value;

    await register(email, password)
      .then((res) =>
        updateProfile(res?.user, { displayName: name, photoURL: dp })
          .then(() => {
            logout()
              .then(() => {
                login(email, password)
                  .then((res) => {
                    toast.success(`Registered as ${res?.user?.displayName}`);
                    setRegistering(false);
                    navigate(location);
                  })
                  .catch((error) => toast.error(error?.message));
              })
              .catch((error) => toast.error(error?.message));
          })
          .catch((error) => {
            toast.error(error?.message);
            setRegistering(false);
          })
      )
      .catch((error) => {
        toast.error(error?.message);
        setRegistering(false);
      });
  };

  return (
    <section className="bg-teal-100 py-10">
      <Container
        className={`min-h-screen flex flex-col items-center justify-center`}
      >
        <form
          onSubmit={handleRegister}
          className="w-full max-w-sm p-5 rounded-lg bg-white shadow-md flex flex-col text-lg font-medium gap-4"
        >
          <Title className={`mb-[0px]`}>Register</Title>
          {/* Form Input Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base text-teal-500">
                Your Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              className="input input-bordered w-full bg-white text-lg text-teal-500"
            />
          </div>
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
          {/* Form Input Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base text-teal-500">
                Display Picture URL
              </span>
            </label>
            <input
              type="text"
              placeholder="DP (Optional)"
              name="dp"
              className="input input-bordered w-full bg-white text-lg text-teal-500"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base text-teal-500">
                Password
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
            className="btn btn-accent text-lg text-white disabled:bg-teal-800"
            disabled={registering}
          >
            {registering ? <Loader /> : "Register"}
          </button>

          <p className="flex items-center gap-3 text-lg font-normal">
            <span className="block w-full h-[1px] bg-slate-300" />
            or
            <span className="block w-full h-[1px] bg-slate-300" />
          </p>

          <GoogleButton location={location} />

          <p className="text-base font-normal">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-700">
              Login
            </NavLink>
          </p>
        </form>
      </Container>
    </section>
  );
};
export default Register;
