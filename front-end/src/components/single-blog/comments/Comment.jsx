import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteCommentMutation } from "../../../features/comment/commentAPI";

import { showToast } from "../../../utility/toast";

const Comment = ({ comment, blogId }) => {
  const { author, content, id } = comment || {};
  const fullName = `${author?.firstName} ${author?.lastName}`;

  const { id: userId, avatar } = useSelector((state) => state.auth.user);

  const commentAvatar = author?.id === userId ? avatar : author?.avatar;

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = () => {
    if (confirm("Do you want to delete this comment?")) {
      showToast("Comment has been deleted!", "success");
      deleteComment({
        blogId: blogId,
        commentId: id,
      });
    } else {
      console.log("you have selected not");
    }
  };

  return (
    <div className="flex items-start space-x-4 my-8 ">
      <div className="avater-img bg-indigo-600 text-white ">
        {commentAvatar ? (
          <img
            className="rounded-full w-full h-full"
            src={`${
              import.meta.env.VITE_API_URL
            }/uploads/avatar/${commentAvatar}`}
            alt=""
          />
        ) : (
          <span className="">{author?.firstName[0].toUpperCase()}</span>
        )}
      </div>

      <div className="w-full ">
        <h5 className="text-slate -500 font-bold capitalize">
          <Link to={`/me/${author?.id}`}>{fullName}</Link>
        </h5>
        <div className="text-white">
          <p className="text-xl text-indigo-100">{content}</p>
          {author?.id === userId && (
            <button
              className="flex items-center space-x-1 py-1 px-2 ml-10 rounded-md capitalize  bg-red-500 text-sm"
              onClick={handleDeleteComment}
            >
              <FaRegTrashAlt /> <span>delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
