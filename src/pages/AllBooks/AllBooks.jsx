import { useEffect, useState } from "react";
import CategoryBookCard from "../../components/CategoryBooks/CategoryBookCard";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import Title from "../../components/Title/Title";
import useBooks from "../../hooks/useBooks";
import useBooksCount from "../../hooks/useBooksCount";
import Container from "../../layouts/Container";
import { useQueryClient } from "@tanstack/react-query";
import useFilteredBooks from "../../hooks/useFilteredBooks";

const AllBooks = () => {
  const queryClient = useQueryClient();

  const [filtered, setFiltered] = useState(false);

  const handleFilter = () => {
    setFiltered(!filtered);
  };

  const booksCount = useBooksCount();
  const [pages, setPages] = useState([]);
  // const [limit, setLimit] = useState(9);
  const limit = 9;
  const [currentPage, setCurrentPage] = useState(1);
  // const [skip, setSkip] = useState((currentPage - 1) * limit);
  const skip = (currentPage - 1) * limit;

  useEffect(() => {
    setPages([...Array(Math.ceil(booksCount / limit)).keys()]);
  }, [booksCount, limit]);

  const { data: allBooks, refetch: refetchAll } = useBooks(
    null,
    null,
    limit,
    skip
  );
  const { data: filteredBooks, refetch: refetchFiltered } = useFilteredBooks(null, null, limit, skip);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (filtered) {
      setBooks(filteredBooks?.data?.result);
    } else {
      setBooks(allBooks?.data);
    }
  }, [filtered, allBooks, filteredBooks]);

  useEffect(() => {
    if (filtered) {
      refetchFiltered();
    } else {
      refetchAll();
    }
  }, [
    currentPage,
    limit,
    skip,
    queryClient,
    refetchAll,
    filtered,
    refetchFiltered,
  ]);

  return (
    <>
      <section className="bg-white">
        <Container className={`py-10 px-3`}>
          <Title>All books</Title>

          {!filtered ? (
            <button
              className="btn block w-fit ml-auto bg-neutral-100 text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 outline-none cursor-pointer mb-5"
              onClick={handleFilter}
            >
              Show Available Books
            </button>
          ) : (
            <button
              className="btn block w-fit ml-auto bg-neutral-100 text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 outline-none cursor-pointer mb-5"
              onClick={handleFilter}
            >
              Show All Books
            </button>
          )}

          {books?.isLoading ? (
            <LoaderDiv />
          ) : (
            books?.error && (
              <p className="text-lg block w-full text-red-500 font-medium text-center">
                Error: {books?.error}
              </p>
            )
          )}

          {books && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books?.map((book) => (
                <CategoryBookCard key={book?._id} book={book} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-row justify-end items-center mt-10">
            <div className="join">
              {pages?.map((page) => (
                <input
                  key={page + 1}
                  className="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label={page + 1}
                  checked={currentPage === page + 1}
                  onChange={() => setCurrentPage(page + 1)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default AllBooks;
