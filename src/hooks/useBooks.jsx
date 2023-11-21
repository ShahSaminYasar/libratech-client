import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBooks = (categoryName, id, limit = 5000, skip = 0) => {
  const axios = useAxios();

  let url = "/books";

  if (categoryName && id) {
    url = `/books?category=${categoryName}&id=${id}&limit=${limit}&skip=${skip}`;
  } else if (categoryName) {
    url = `/books?category=${categoryName}&limit=${limit}&skip=${skip}`;
  } else if (id) {
    url = `/books?id=${id}&limit=${limit}&skip=${skip}`;
  } else {
    url = `/books?limit=${limit}&skip=${skip}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getBooks", categoryName, id, limit, skip],
    queryFn: () => axios.get(url),
  });

  if (isLoading) {
    return { isLoading: true, refetch };
  }

  if (isError) {
    return { error, refetch };
  }

  return { data, refetch };
};
export default useBooks;
