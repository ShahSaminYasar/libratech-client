import useAuth from "../hooks/useAuth";
import Container from "../layouts/Container";

const AdminRoute = ({children}) => {
  const { user } = useAuth();

  if (user?.email !== import.meta.env.VITE_LIBRARIAN_EMAIL) {
    return (
      <section className="bg-white">
        <Container
          className={`min-h-[70vh] flex flex-col gap-5 items-center justify-center text-neutral-800`}
        >
          <h1 className="text-6xl font-bold">Admin Page</h1>
          <p className="text-lg text-neutral-500 max-w-[400px] text-center mx-auto block">
            This page is accessible to the admin [librarian] only.
          </p>
        </Container>
      </section>
    );
  }

  return children;
};
export default AdminRoute;
