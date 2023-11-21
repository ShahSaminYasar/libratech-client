import useCategories from "../../hooks/useCategories";
import Container from "../../layouts/Container";
import LoaderDiv from "../Loaders/LoaderDiv";
import Title from "../Title/Title";
import FeaturedCategoryCard from "./FeaturedCategoryCard";

const FeaturedCategories = () => {
  const categories = useCategories(3);
  return (
    <section className="section bg-white">
      <Container>
        <Title>Featured Categories</Title>
        {categories?.isLoading ? (
          <LoaderDiv />
        ) : (
          categories?.error && (
            <p className="text-lg block w-full text-red-500 font-medium text-center">
              Error: {categories?.error}
            </p>
          )
        )}

        {categories?.data && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories?.data.map((category) => (
              <FeaturedCategoryCard key={category?._id} category={category} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
export default FeaturedCategories;
