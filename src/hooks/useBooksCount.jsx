import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBooksCount = () => {
const axios = useAxios()

    const {data, isLoading, isError} = useQuery({
        queryKey: ["booksCount"],
        queryFn: () => axios.get("/books-count")
    })

    if(isLoading || isError) return 0;

    return data?.data?.count;
}
export default useBooksCount;