const Title = ({children, className}) => {
    return (
        <h3 className={`block w-full text-left pl-2 border-l-4 border-neutral-800 text-neutral-800 font-semibold text-4xl mb-6 ${className && className}`}>{children}</h3>
    );
}
export default Title;