import { Link } from "react-router-dom";

const PopularItem = ({ blog }) => {
  const { author, title, likes, id } = blog || {};
  return (
    <li>
      <Link to={`/blog/${id}`}>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {title}
        </h3>
      </Link>
      <p className="text-slate-600 text-sm">
        by{" "}
        <Link to="/me">
          {author.firstName} {author.lastName}
        </Link>
        <span>·</span> {likes?.length} Likes
      </p>
    </li>
  );
};

export default PopularItem;
