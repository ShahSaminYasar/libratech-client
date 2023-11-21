import { useNavigate, useParams } from "react-router-dom";
import useBooks from "../../hooks/useBooks";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../../layouts/Container";
import Title from "../../components/Title/Title";
import Loader from "../../components/Loaders/Loader";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const EditBook = () => {
  const { bookId } = useParams();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {data: bookData} = useBooks(null, bookId);
  const book = bookData?.data?.[0];

  const [updating, setUpdating] = useState(false);

  const handleEditBook = (e) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.target;
    const image = form.image.value;
    const name = form.name.value;
    const quantity = Number(form.quantity.value);
    const author = form.author.value;
    const category = form.category.value;
    const rating = Number(form.rating.value);
    const description = form.description.value;
    const bookData = {
      image,
      name,
      quantity,
      author,
      category,
      description,
      rating,
    };

    axios
      .put(`/edit-book`, { bookId: book?._id, bookData })
      .then((res) => {
        if (res?.data?.message === "success") {
          toast.success("Book Details Updated");
        } else {
          toast.error(res?.data?.message);
        }
        queryClient.invalidateQueries({
          id: ["getBooks"],
        });
        setUpdating(false);
        navigate(`/book/${book?._id}`, { replace: true });
      })
      .catch((error) => {
        toast.error(error?.message);
        setUpdating(false);
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the book '${book?.name}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b1b1b",
      cancelButtonColor: "#eb3443",
      confirmButtonText: "Yes, DELETE!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/delete-book?bookId=${book?._id}`)
          .then((res) => {
            if (res?.data?.message === "success") {
              toast.success("Book Data Deleted");
            } else {
              toast.error(res?.data?.message);
            }
            queryClient.invalidateQueries({
              id: ["getBooks"],
            });
            navigate("/all-books", { replace: true });
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }
    });
  };

  return (
    <section className="py-10 px-3 bg-white">
      <Container>
        <Title>Edit book</Title>
        <form
          onSubmit={handleEditBook}
          className="libratech_form grid sm:grid-cols-2 gap-4 text-neutral-800 font-normal text-lg"
        >
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            required
            defaultValue={book?.image}
          />
          <input
            type="text"
            placeholder="Book Name"
            name="name"
            required
            defaultValue={book?.name}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min={1}
            required
            defaultValue={book?.quantity}
          />
          <input
            type="text"
            placeholder="Author Name"
            name="author"
            required
            defaultValue={book?.author}
          />
          <select
            name="category"
            placeholder="Category"
            required
            defaultValue={book?.category}
          >
            <option value="technology">Technology</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="adventure">Adventure</option>
            <option value="literature">Literature</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
            <option value="horror">Horror</option>
            <option value="drama">Drama</option>
          </select>
          <input
            type="number"
            name="rating"
            min={1}
            placeholder="Rating (1-5)"
            required
            defaultValue={book?.rating}
          />
          <textarea
            name="description"
            rows="5"
            placeholder="Short description about the book"
            className="sm:col-span-2"
            required
            defaultValue={book?.description}
          ></textarea>
          <div className="sm:col-span-2 grid grid-cols-3 gap-5 items-center">
            <button
              type="submit"
              className="btn w-full col-span-2 bg-neutral-800 text-white hover:bg-neutral-900 hover:text-white  disabled:bg-neutral-950 cursor-pointer disabled:cursor-progress"
              disabled={updating}
            >
              {updating ? <Loader /> : "Edit book"}
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="btn w-full col-span-1 bg-red-800 text-white hover:bg-red-900 hover:text-white  disabled:bg-red-950 cursor-pointer disabled:cursor-progress border-none"
              disabled={updating}
            >
              {updating ? <Loader /> : "Delete book"}
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
};
export default EditBook;
