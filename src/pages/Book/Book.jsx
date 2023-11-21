import { NavLink, useParams } from "react-router-dom";
import useBooks from "../../hooks/useBooks";
import Container from "../../layouts/Container";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import { Rating } from "primereact/rating";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../../components/Loaders/Loader";

const Book = () => {
  const { bookId } = useParams();
  const {data: bookDetails} = useBooks(null, bookId);
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [borrowing, setBorrowing] = useState(false);

  const book = bookDetails?.data?.[0];

  const isAdmin = user?.email === import.meta.env.VITE_LIBRARIAN_EMAIL;

  const handleBorrow = (e) => {
    e.preventDefault();
    setBorrowing(true);
    // Admin Check
    if (isAdmin) {
      return toast("You are the admin!!!");
    }
    // Format Dates
    const currentDate = new Date();
    const borrowedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const returnDateCalendar = new Date(e.target.returnDate.value);
    const returnDate = `${returnDateCalendar.getDate()}/${
      returnDateCalendar.getMonth() + 1
    }/${returnDateCalendar.getFullYear()}`;
    // Check Date
    if (currentDate > returnDateCalendar) {
      setBorrowing(false);
      return toast("Please provide a valid return date");
    }
    // Get User Data
    const userEmail = user?.email;
    const userName = user?.displayName;
    // Make Data Object
    const borrowData = {
      bookId: book?._id,
      email: userEmail,
      name: userName,
      borrowedDate,
      returnDate,
    };
    axios
      .post("/borrow-book", borrowData)
      .then((res) => {
        if (
          res?.data?.message === "success" &&
          res?.data?.result?.acknowledged === true
        ) {
          toast.success("You borrowed the book");
          queryClient.invalidateQueries({ queryKey: ["getBooks"] });
        } else {
          toast.error(res?.data?.message);
        }
        setBorrowing(false);
      })
      .catch((error) => {
        toast.error(error?.message);
        setBorrowing(false);
      });
  };

  return (
    <section className="bg-white">
      {bookDetails?.isLoading ? (
        <LoaderDiv />
      ) : (
        bookDetails?.error && (
          <p className="text-lg block w-full text-red-500 font-medium text-center">
            Error: {bookDetails?.error}
          </p>
        )
      )}

      {bookDetails?.data && (
        <Container
          className={`py-10 px-3 grid gap-10 md:grid-cols-2 items-start`}
        >
          <div>
            <img
              src={book?.image}
              alt=""
              className="h-full max-h-[500px] object-contain block mx-auto"
            />
          </div>
          <div className="flex flex-col gap-5 items-start text-neutral-800 font-normal text-lg">
            <h1 className="font-semibold text-4xl">{book?.name}</h1>
            <p className="text-2xl">Author: {book?.author}</p>
            <p className="text-lg text-neutral-600">{book?.description}</p>
            <p
              className={`text-lg ${
                book?.quantity <= 10 ? "text-red-500" : "text-neutral-600"
              }`}
            >
              {book?.quantity <= 10 && book?.quantity > 0
                ? `Only ${book?.quantity} copies available`
                : book?.quantity === 0
                ? `Currently no copies available`
                : `Quantity available: ${book?.quantity}`}
            </p>
            <p className="capitalize py-0 px-3 bg-neutral-200 rounded-sm text-neutral-500">
              {book?.category}
            </p>
            <p className="flex gap-2">
              Rating: <Rating value={book?.rating} readOnly cancel={false} />
            </p>
            <div className="flex flex-row gap-3 items-center">
              {isAdmin ? (
                <NavLink
                  to={`/edit-book/${book?._id}`}
                  className="btn bg-neutral-800 text-white text-lg font-medium border-2 border-neutral-800 hover:bg-neutral-50 hover:text-neutral-800 w-full"
                >
                  Edit
                </NavLink>
              ) : (
                book?.quantity > 0 && (
                  <button
                    onClick={() =>
                      document.getElementById("borrow_modal").showModal()
                    }
                    className="btn bg-neutral-800 text-white text-lg font-medium border-2 border-neutral-800 hover:bg-neutral-50 hover:text-neutral-800 w-full"
                  >
                    Borrow
                  </button>
                )
              )}
              <button className="btn bg-neutral-50 text-neutral-800 text-lg font-medium border-2 border-neutral-800 hover:bg-neutral-700 hover:text-white w-full">
                Read
              </button>
            </div>
          </div>
        </Container>
      )}

      <dialog id="borrow_modal" className="modal">
        <div className="modal-box bg-neutral-50 text-neutral-800 border-4 border-neutral-800 flex flex-col gap-3 items-start">
          <h3 className="font-normal text-2xl">
            Borrow <span className="font-medium">{book?.name}</span>
          </h3>
          <form onSubmit={handleBorrow}>
            <label
              htmlFor="returnDate"
              className="text-lg text-neutral-500 block"
            >
              When will you return the book?
            </label>
            <input
              type="date"
              required
              placeholder="Enter return date"
              name="returnDate"
              className="block mb-5 py-2 px-2 mt-3 bg-neutral-800 text-white border-2 border-neutral-800 rounded-md"
            />
            <button
              className="btn bg-neutral-100 text-neutral-800 text-lg border-2 border-neutral-800 hover:bg-white hover:text-neutral-800 disabled:cursor-default"
              disabled={borrowing}
            >
              {borrowing ? <Loader /> : "Borrow"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop backdrop-blur-[2px]">
          <button>Cancel</button>
        </form>
      </dialog>
    </section>
  );
};
export default Book;
