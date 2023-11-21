import Container from "../../layouts/Container";

const PageTitle = ({children, image}) => {
    return (
      <div className="w-full relative">
        <img
          src={image}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full object-cover z-10 bg-black bg-opacity-30"></div>
        <Container className={`relative z-20 py-20 px-3`}>
          <h1 className="text-5xl text-center font-semibold block w-full text-neutral-50 uppercase">
            {children}
          </h1>
        </Container>
      </div>
    );
}
export default PageTitle;