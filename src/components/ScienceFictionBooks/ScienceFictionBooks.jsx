import { NavLink } from "react-router-dom";
import useBooks from "../../hooks/useBooks";
import Container from "../../layouts/Container";
import CategoryBookCard from "../CategoryBooks/CategoryBookCard";
import LoaderDiv from "../Loaders/LoaderDiv";
import Title from "../Title/Title";

const ScienceFictionBooks = () => {
  const { data: books } = useBooks("science-fiction", null, 3);

  if (books?.isLoading) return <LoaderDiv />;
  if (books?.error) return <p>{books?.error}</p>;

  return (
<section className="py-10 px-3 bg-white">
      <Container>
        <Title>Science Fictions 🔭</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books?.data?.map((book) => (
            <CategoryBookCard key={book?._id} book={book} />
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <NavLink
            to="/category/science-fiction"
            className="btn w-fit ml-auto bg-neutral-100 text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 outline-none cursor-pointer mb-5"
          >
            See All
          </NavLink>
        </div>
      </Container>
    </section>
  );
};
export default ScienceFictionBooks;
