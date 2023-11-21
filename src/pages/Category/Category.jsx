import { useParams } from "react-router-dom";
import CategoryBooks from "../../components/CategoryBooks/CategoryBooks";
import Container from "../../layouts/Container";
import useCategories from "../../hooks/useCategories";
import PageTitle from "../../components/PageTitle/PageTitle";

const Category = () => {
  const { categoryName } = useParams();

  const category = useCategories({ name: categoryName });
  const categoryDetails = category?.data?.[0];

  return (
    <section className="bg-white">
      <PageTitle image={categoryDetails?.thumbnail}>
        {categoryDetails?.name}
      </PageTitle>
      <Container className={`py-10 px-3`}>
        <CategoryBooks categoryName={categoryName} />
      </Container>
    </section>
  );
};
export default Category;
