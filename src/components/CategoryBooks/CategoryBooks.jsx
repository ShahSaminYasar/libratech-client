import useBooks from "../../hooks/useBooks";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import CategoryBookCard from "./CategoryBookCard";

const CategoryBooks = ({ categoryName }) => {
  const { data: books } = useBooks(categoryName);

  return (
    <>
      <section className="bg-white">
        {books?.isLoading ? (
          <LoaderDiv />
        ) : (
          books?.error && (
            <p className="text-lg block w-full text-red-500 font-medium text-center">
              Error: {books?.error}
            </p>
          )
        )}

        {books?.data?.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {books?.data.map((book) => (
              <CategoryBookCard key={book?._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center py-10">
            <h2 className="text-5xl font-semibold text-neutral-800">Umm..</h2>
            <p className="text-lg font-normal text-neutral-600">
              Looks like there are no books currently available under this
              category.
            </p>
          </div>
        )}
      </section>
    </>
  );
};
export default CategoryBooks;
