import { NavLink } from "react-router-dom";
import Container from "../../layouts/Container";

const Footer = () => {
  return (
    <section className="bg-neutral-50">
      <Container>
        <footer className="footer p-10 bg-neutral-50 border-t-4 border-t-neutral-800 text-neutral-800">
          <aside>
            <h2 className="text-5xl">LibraTech</h2>
            <p>Let&apos;s read!</p>
          </aside>
          <nav>
            <header className="footer-title">Pages</header>
            <NavLink to="/" className={`link link-hover`}>
              Home
            </NavLink>
            <NavLink to="/all-books" className={`link link-hover`}>
              All Books
            </NavLink>
            <NavLink to="/borrowed-books" className={`link link-hover`}>
              Borrowed Books
            </NavLink>
          </nav>
          <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </Container>
    </section>
  );
};
export default Footer;
