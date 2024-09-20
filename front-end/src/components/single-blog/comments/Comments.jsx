import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddCommentMutation } from "../../../features/comment/commentAPI";
import { showToast } from "../../../utility/toast";
import Comment from "./Comment";

const Comments = ({ blog }) => {
  const { comments, id } = blog || {};

  const [blogComment, setBlogComment] = useState("");
  const { firstName, avatar } = useSelector((state) => state.auth?.user);
  const [addComment] = useAddCommentMutation();

  const handleComment = () => {
    showToast("Comment is added!", "success");
    addComment({ id, content: blogComment });
    setBlogComment("");
  };

  return (
    <section>
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>
        <div className="flex items -center space-x-4">
          <div className="avater-img bg-indigo-600 text-white">
            {avatar ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/avatar/${avatar}`}
                alt=""
                className="rounded-full h-full w-full"
              />
            ) : (
              <span className="">{firstName[0].toUpperCase()}</span>
            )}
          </div>
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              id="comments"
              value={blogComment}
              onChange={(e) => setBlogComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} blogId={blog?.id} />
        ))}
      </div>
    </section>
  );
};

export default Comments;
