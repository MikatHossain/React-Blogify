import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import CommentIcon from "../../assets/icons/comment.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import LikeIcon from "../../assets/icons/like.svg";
import {
  useLikeBlogMutation,
  useToggleFavoriteBlogMutation,
} from "../../features/blogs/blogsAPI";

export const FloatingActions = ({ blog }) => {
  const { likes, id, comments, isFavourite } = blog || {};

  const auth = useSelector((state) => state.auth.user);

  const [liked, setLiked] = useState(false);

  const [toggleFavoriteBlog] = useToggleFavoriteBlogMutation();

  const [likeBlog, { data }] = useLikeBlogMutation();

  const handleFavorite = () => {
    toggleFavoriteBlog(blog.id);
  };

  useEffect(() => {
    setLiked(likes.some((like) => like.id === auth.id));
  }, [likes, auth.id]);

  const handleLikes = () => {
    likeBlog(id);
  };

  return (
    <div className="floating-action mb-8">
      <ul className="floating-action-menus">
        <li onClick={handleLikes}>
          {liked ? (
            <BiSolidLike size={30} />
          ) : (
            <img src={LikeIcon} alt="like" />
          )}
          <span>{likes?.length ?? 0}</span>
        </li>

        <li onClick={handleFavorite}>
          {isFavourite ? (
            <AiFillHeart size={30} color="red" />
          ) : (
            <img src={HeartIcon} alt="Favourite" />
          )}
        </li>
        <a href="#comments">
          <li>
            <img src={CommentIcon} alt="Comments" />
            <span>{comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};
