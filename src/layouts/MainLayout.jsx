import { NavLink, Outlet } from "react-router-dom";
import navlinks from "../utils/Navlinks";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loaders/Loader";
import UserDropdown from "../components/UserDropdown/UserDropdown";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const { loading, user } = useAuth();
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full fixed top-0 left-0 z-[998] bg-neutral-50 text-neutral-800 border-b-2 border-b-neutral-800">
            <Container>
              <div className="w-full navbar">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>

                {/* Logo */}
                <div className="flex-1 mr-2 text-3xl font-semibold text-neutral-800">
                  <NavLink to="/">LibraTech</NavLink>
                </div>

                {/* Nav Menu */}
                <div className="flex-none hidden lg:block">
                  <div className="flex flex-row gap-5 items-center justify-end">
                    {/* Nav Menu */}
                    {navlinks?.map((navlink) => (
                      <NavLink
                        key={navlink?.path}
                        to={navlink?.path}
                        className={({ isActive }) =>
                          `${
                            isActive ? "bg-slate-200 bg-opacity-70" : undefined
                          } py-2 px-3 rounded-[2px] text-neutral-800 font-medium`
                        }
                      >
                        {navlink?.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                {loading ? (
                  <Loader />
                ) : user ? (
                  <UserDropdown />
                ) : (
                  <NavLink
                    to="/login"
                    className={`btn bg-teal-200 text-teal-600 text-base border-none outline-none`}
                  >
                    Login/Register
                  </NavLink>
                )}
              </div>
            </Container>
          </div>
          {/* Page content here */}
          <div className="mt-[63px]"></div>
          <Outlet />
        </div>
        <div className="drawer-side z-[999]">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-neutral-50 text-neutral-800 text-base font-normal">
            {/* Sidebar content here */}
            {navlinks?.map((navlink) => (
              <li key={navlink?.path}>
                <NavLink to={navlink?.path}>{navlink?.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};
export default MainLayout;
