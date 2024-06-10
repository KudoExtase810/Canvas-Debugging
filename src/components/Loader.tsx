import { CgSpinner } from "react-icons/cg";

interface LoaderProps {
    size?: number;
}

const Loader = ({ size = 22 }: LoaderProps) => {
    return <CgSpinner size={size} className="animate-spin duration-1000" />;
};

export default Loader;
