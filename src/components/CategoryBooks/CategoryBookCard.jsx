import { NavLink } from "react-router-dom";
import { Rating } from "primereact/rating";

const CategoryBookCard = ({ book }) => {
  return (
    <div className="bg-neutral-50 pt-5 pb-3 px-2 rounded-md overflow-hidden border-2 border-neutral-800 flex flex-col justify-start items-center w-full max-w-sm mx-auto">
      <img
        src={book?.image}
        alt=""
        className="h-[250px] aspect[9/16] object-contain"
      />
      <div className="w-full mb-auto py-5 px-2 flex flex-col items-start gap-3 text-neutral-700 font-normal text-base">
        <p className="capitalize py-0 px-3 bg-neutral-200 rounded-sm text-neutral-500">
          {book?.category}
        </p>
        <h3 className="text-2xl">
          {book?.name?.length > 50
            ? book?.name?.slice(0, 50) + "..."
            : book?.name}
        </h3>
        <p className="text-lg">Author: {book?.author}</p>
        <p className="text-neutral-500">
          {book?.description?.length > 100
            ? book?.description.slice(0, 100) + "..."
            : book?.description}
        </p>
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
        <p className="flex gap-2">
          Rating: <Rating value={book?.rating} readOnly cancel={false} />
        </p>
      </div>
      <NavLink
        to={`/book/${book?._id}`}
        className="btn bg-neutral-800 text-white text-center w-full"
      >
        Details
      </NavLink>
    </div>
  );
};
export default CategoryBookCard;
