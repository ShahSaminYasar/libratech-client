import { NavLink } from "react-router-dom";
import BorrowedBooksTableRow from "../../components/BorrowedBooksTableRow/BorrowedBooksTableRow";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import Title from "../../components/Title/Title";
import useAuth from "../../hooks/useAuth";
import useBorrowedBooks from "../../hooks/useBorrowedBooks";
import Container from "../../layouts/Container";
import BenzyBrookeGif from "../../assets/benzy_brooke.gif";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const borrowedBooks = useBorrowedBooks(user?.email);

  const books = borrowedBooks?.result;
  return (
    <>
      {user?.email === import.meta.env.VITE_LIBRARIAN_EMAIL ? (
        <section className="py-10 px-3 bg-white">
          <Container
            className={`min-h-[60vh] flex flex-col items-center justify-center gap-4`}
          >
            <h1 className="text-7xl font-bold text-neutral-800 text-center">
              Hi Admin!!!
            </h1>
            <p className="text-lg text-neutral-500 font-normal text-center block w-full max-w-[450px] mx-auto">
              You are the librarian, you don&apos;t need to borrow books...you
              can read any book anytime!
            </p>
          </Container>
        </section>
      ) : (
        <section className="py-10 px-3 bg-white">
          <Container>
          <Title>Borrowed Books</Title>
            {borrowedBooks?.isLoading ? (
              <LoaderDiv />
            ) : (
              borrowedBooks?.error && (
                <p className="text-lg block w-full text-red-500 font-medium text-center">
                  Error: {borrowedBooks?.error}
                </p>
              )
            )}

            {books?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="text-neutral-800 text-base font-normal">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Borrowed Date</th>
                      <th>Return Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books?.map((borrowedBook) => (
                      <BorrowedBooksTableRow
                        key={borrowedBook?._id}
                        borrowedBook={borrowedBook}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <img src={BenzyBrookeGif} alt="" className="block mx-auto w-full max-w-[300px] rounded-md mb-3" />
                <p className="text-lg text-neutral-500 font-normal text-center block w-full max-w-[450px] mx-auto">
                  You haven&apos;t borrowed any books yet.<br />Choose from the{" "}
                  <NavLink to="/all-books" className={`text-neutral-800 font-medium`}>vast collection</NavLink> now!
                </p>
              </>
            )}
          </Container>
        </section>
      )}
    </>
  );
};
export default BorrowedBooks;
