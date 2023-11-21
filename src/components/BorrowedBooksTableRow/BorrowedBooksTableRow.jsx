import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loader from "../Loaders/Loader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const BorrowedBooksTableRow = ({ borrowedBook }) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getBorrowedBook", borrowedBook],
    queryFn: () => axios.get(`/books?id=${borrowedBook?.bookId}`),
  });

  if (isLoading)
    return (
      <tr className="flex items-center py-10 w-full">
        <Loader />
      </tr>
    );

  if (isError) return <p className="text-red-500">Error: {error}</p>;

  const bookInfo = data?.data?.[0];

  const handleReturn = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to return the book '${bookInfo?.name}' today?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b1b1b",
      cancelButtonColor: "#eb3443",
      confirmButtonText: "Yes, return!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/return-book`, {
            bookId: borrowedBook?.bookId,
            borrowedId: borrowedBook?._id,
          })
          .then((res) => {
            if (res?.data?.message === "success") {
              toast.success("Book returned");
              queryClient.invalidateQueries({
                id: ["getBorrowedBooks"],
              });
              queryClient.invalidateQueries({
                id: ["getBooks"],
              });
            } else {
              toast.error("Unknown error");
            }
          })
          .catch((error) => toast.error(error?.message));
      }
    });
  };

  return (
    <tr className="text-neutral-800 text-base font-medium">
      <td>
        <img
          src={bookInfo?.image}
          alt=""
          className="h-[100px] object-contain"
        />
      </td>
      <td>{bookInfo?.name}</td>
      <td>{bookInfo?.category}</td>
      <td>{borrowedBook?.borrowedDate}</td>
      <td>{borrowedBook?.returnDate}</td>
      <td>
        <button
          onClick={handleReturn}
          type="button"
          className="btn bg-neutral-800 text-white w-full"
        >
          Return
        </button>
      </td>
    </tr>
  );
};
export default BorrowedBooksTableRow;
