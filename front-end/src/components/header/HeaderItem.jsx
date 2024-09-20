import { Link } from "react-router-dom";

const HeaderItem = ({ item, handler }) => {
  return (
    <li onClick={handler}>
      <Link
        to="#"
        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
        {item}
      </Link>
    </li>
  );
};

export default HeaderItem;
