import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  return (
    <div className="dropdown dropdown-end ml-4">
      <label tabIndex={0}>
        <img
          src={
            user?.photoURL ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt=""
          className="w-[40px] aspect-square object-cover rounded-full cursor-pointer border-2 border-neutral-800"
        />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-neutral-50 rounded-box w-52 border-2 border-neutral-800"
      >
        <p className="text-base text-neutral-800 font-medium text-left">
          {user?.displayName}
        </p>
        <p className="text-xs text-neutral-800 font-medium text-left w-full overflow-x-auto">
          {user?.email}
        </p>
        {/* <div className="divider"></div> */}
        <button
          onClick={() => {
            logout()
              .then(() => toast("Logged out"))
              .catch((error) => toast.error(error?.message));
          }}
          className="py-2 rounded-lg text-sm border-2 border-neutral-800 outline-none bg-slate-200 text-neutral-800 mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default UserDropdown;
