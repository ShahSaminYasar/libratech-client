import Banner from "../../components/Banner/Banner";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import Container from "../../layouts/Container";
import AdventureBooks from "../../components/AdventureBooks/AdventureBooks";
import ScienceFictionBooks from "../../components/ScienceFictionBooks/ScienceFictionBooks";
import BestSelling from "../BestSelling/BestSelling";

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedCategories />
      <section>
        <div className="w-full relative bg-[url('https://pixexid.com/api/download/image/a-4k-ultra-hd-wallpaper-of-a-heart-shaped-bookshelf-filled-with-colorful-books-a-asj9pjha.jpeg')] bg-cover bg-fixed bg-center">
          <div className="absolute top-0 left-0 w-full h-full object-cover z-10 bg-black bg-opacity-60"></div>
          <Container className={`relative z-20 py-40 px-3`}>
            <h1 className="text-5xl text-center font-semibold block w-full text-neutral-50 uppercase">
              Borrow books for absolutely free!!!
            </h1>
          </Container>
        </div>
      </section>
      <AdventureBooks />
      <ScienceFictionBooks />
      <BestSelling />
    </>
  );
};
export default Home;
