const Container = ({ children, className }) => {
  return (
    <div
      className={`block w-full max-w-[1200px] mx-auto ${
        className && className
      }`}
    >
      {children}
    </div>
  );
};
export default Container;
