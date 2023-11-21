import { NavLink } from "react-router-dom";
import CategoryBookCard from "../../components/CategoryBooks/CategoryBookCard";
import Title from "../../components/Title/Title";
import Container from "../../layouts/Container";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import useFilteredBooks from "../../hooks/useFilteredBooks";

const BestSelling = () => {
  const { data: booksData } = useFilteredBooks(null, null, 3, 0, 11, "lt");

  if (booksData?.isLoading) return <LoaderDiv />;
  if (booksData?.error) return <p>{booksData?.error}</p>;

  const books = booksData?.data?.result;

  return (
    <section className="pb-10 px-3 bg-white">
      <Container>
        <Title>Best Selling 📈</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books?.map((book) => (
            <CategoryBookCard key={book?._id} book={book} />
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <NavLink
            to="/all-books"
            className="btn w-fit ml-auto bg-neutral-100 text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 outline-none cursor-pointer mb-5"
          >
            See All Books
          </NavLink>
        </div>
      </Container>
    </section>
  );
};
export default BestSelling;
