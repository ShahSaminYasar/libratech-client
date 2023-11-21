import { NavLink } from "react-router-dom";

const FeaturedCategoryCard = ({ category }) => {
  return (
    <div className="block w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-neutral-50 text-neutral-800 font-medium shadow-md">
      <img
        src={category?.thumbnail}
        alt=""
        className="w-full aspect-[16/10] object-cover"
      />
      <div className="px-3 pt-5 pb-7">
        <h1 className="text-3xl capitalize mb-3">{category?.name}</h1>
        <NavLink
          to={`/category/${category?.name}`}
          className={`py-2 px-3 rounded-lg bg-neutral-800 text-white text-base block w-full`}
        >View Books</NavLink>
      </div>
    </div>
  );
};
export default FeaturedCategoryCard;
