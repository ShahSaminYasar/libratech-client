import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCategories = ({ limit = 500, name }) => {
  const axios = useAxios();
  let url = ``;
  if (name) {
    url = `/categories?name=${name}&limit=${limit}`;
  } else {
    url = `/categories?limit=${limit}`;
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCategories", name, limit],
    queryFn: () => axios.get(url),
  });

  if (isLoading) {
    return { isLoading: true };
  }

  if (isError) {
    return { error };
  }

  return data;
};
export default useCategories;
