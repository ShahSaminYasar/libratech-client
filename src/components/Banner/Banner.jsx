import Container from "../../layouts/Container";
import HeroImage from "../../assets/hero.svg"
import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
      <section className="bg-neutral-800 py-16 px-3">
        <Container className={`grid sm:grid-cols-2 gap-10 items-center`}>
          <img src={HeroImage} alt="" className="w-full max-w-md block" />

          <div className="text-neutral-50 text-left flex flex-col items-start gap-3">
            <h2 className="text-5xl font-semibold">দুনিয়ার পাঠক এক হই!</h2>
            <NavLink
              to="/all-books"
              className="btn w-fit mt-5 bg-neutral-100 text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-950 hover:text-neutral-50 hover:border-neutral-50 outline-none cursor-pointer mb-5"
            >
              Browse Books
            </NavLink>
          </div>
        </Container>
      </section>
    );
}
export default Banner;