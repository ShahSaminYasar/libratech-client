import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBorrowedBooks = (email) => {
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getBorrowedBooks"],
    queryFn: () => axios.get(`/borrow-book?email=${email}`),
  });

  if (isLoading) return { isLoading: true };

  if (isError) return { error };

  return data?.data;
};
export default useBorrowedBooks;
