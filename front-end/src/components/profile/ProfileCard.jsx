import moment from "moment";
import { Link } from "react-router-dom";
const ProfileCard = ({ profile }) => {
  const { author, content, createdAt, likes, title, thumbnail, id } =
    profile || {};

  return (
    <Link to={`/blog/${id}`}>
      <div className="blog-card">
        <img className="blog-thumb" src={thumbnail} alt="thumbnail" />
        <div className="mt-2">
          <h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">{content}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">{author.firstName[0].toUpperCase()}</span>
              </div>

              <div>
                <h5 className="text-slate-500 text-sm">
                  {author.firstName} {author.lastName}
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{moment(createdAt).fromNow()}</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span>{likes?.length} Likes</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
