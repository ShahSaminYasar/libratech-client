import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useFilteredBooks = (
  categoryName,
  id,
  limit = 5000,
  skip = 0,
  quantity = 0,
  value = "gt"
) => {
  const axios = useAxios();

  let url = "/filtered-books";

  if (categoryName && id) {
    url = `/filtered-books?category=${categoryName}&id=${id}&limit=${limit}&skip=${skip}&quantity=${quantity}&value=${value}`;
  } else if (categoryName) {
    url = `/filtered-books?category=${categoryName}&limit=${limit}&skip=${skip}&quantity=${quantity}&value=${value}`;
  } else if (id) {
    url = `/filtered-books?id=${id}&limit=${limit}&skip=${skip}&quantity=${quantity}&value=${value}`;
  } else {
    url = `/filtered-books?limit=${limit}&skip=${skip}&quantity=${quantity}&value=${value}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getFilteredBooks"],
    queryFn: () => axios.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { data, refetch };
};
export default useFilteredBooks;
