import toast from "react-hot-toast";
import Title from "../../components/Title/Title";
import useAxios from "../../hooks/useAxios";
import Container from "../../layouts/Container";
import { useState } from "react";
import Loader from "../../components/Loaders/Loader";

const AddBook = () => {
  const axios = useAxios();
  const [adding, setAdding] = useState(false);

  const handleAddBook = (e) => {
    e.preventDefault();
    setAdding(true);
    const form = e.target;
    const image = form.image.value;
    const name = form.name.value;
    const quantity = Number(form.quantity.value);
    const author = form.author.value;
    const category = form.category.value;
    const rating = Number(form.rating.value);
    const description = form.description.value;
    const book = {
      image,
      name,
      quantity,
      author,
      category,
      description,
      rating,
    };

    axios
      .post(`/add-book`, book)
      .then((res) => {
        if (res?.data?.message === "success") {
          toast.success("Book Added");
        } else {
          toast.error(res?.data?.message);
        }
        setAdding(false);
        form.reset();
      })
      .catch((error) => {
        toast.error(error?.message);
        setAdding(false);
      });
  };

  return (
    <section className="py-10 px-3 bg-white">
      <Container>
        <Title>Add book</Title>
        <form
          onSubmit={handleAddBook}
          className="libratech_form grid sm:grid-cols-2 gap-4 text-neutral-800 font-normal text-lg"
        >
          <input type="text" placeholder="Image URL" name="image" required />
          <input type="text" placeholder="Book Name" name="name" required />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min={1}
            required
          />
          <input type="text" placeholder="Author Name" name="author" required />
          <select name="category" placeholder="Category" required>
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
          />
          <textarea
            name="description"
            rows="5"
            placeholder="Short description about the book"
            className="sm:col-span-2"
            required
          ></textarea>
          <button
            type="submit"
            className="btn w-full bg-neutral-800 text-white hover:bg-neutral-900 hover:text-white sm:col-span-2 disabled:bg-neutral-950 cursor-pointer disabled:cursor-progress"
            disabled={adding}
          >
            {adding ? <Loader /> : "Add book"}
          </button>
        </form>
      </Container>
    </section>
  );
};
export default AddBook;
