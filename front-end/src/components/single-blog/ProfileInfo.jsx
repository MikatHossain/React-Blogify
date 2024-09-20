import moment from "moment";
import { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../assets/icons/edit.svg";
import { useUpdateBlogMutation } from "../../features/blogs/blogsAPI";
import useAuthor from "../../hooks/useAuthor";
import useAvatar from "../../hooks/useAvatar";
import { showToast } from "../../utility/toast";
const ProfileInfo = ({ blog }) => {
  const { title, author, createdAt, id, likes, thumbnail } = blog || {};
  const { isAuthor } = useAuthor(blog);

  const navigate = useNavigate();
  const { avatarURL } = useAvatar(blog);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title || "");

  const [updateBlog] = useUpdateBlogMutation();

  const handleEditTitle = () => {
    showToast("Blog title updated!", "success");
    updateBlog({
      id,
      data: {
        title: editTitle,
      },
    });
    setEditMode(false);
  };

  return (
    <>
      <h1 className="font-bold text-3xl md:text-5xl flex justify-center gap-6">
        {!editMode && title}

        {editMode && (
          <textarea
            className="text-black p-3 text-2xl"
            name=""
            value={editTitle}
            rows={3}
            cols={30}
            onChange={(e) => setEditTitle(e.target.value)}
          ></textarea>
        )}
        {editMode ? (
          <ImCheckmark
            size={25}
            onClick={handleEditTitle}
            className="cursor-pointer"
          />
        ) : (
          isAuthor && (
            <img
              src={EditIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => setEditMode((mode) => !mode)}
            />
          )
        )}
      </h1>

      <div className="flex justify-center items-center my-4 gap-4">
        <div
          className="flex items-center capitalize space-x-2 cursor-pointer"
          onClick={() => navigate(`/me/${author.id}`)}
        >
          <div className="avater-img bg-indigo-600 text-white">
            {avatarURL ? (
              <img src={avatarURL} alt="" className="rounded-full" />
            ) : (
              <span className="">{author.firstName[0].toUpperCase()}</span>
            )}
          </div>
          <h5 className="text-slate-500 text-sm">
            {author.firstName} {author.lastName}
          </h5>
        </div>
        <span className="text-sm text-slate-700 dot">
          {moment(createdAt).fromNow()}
        </span>
        <span className="text-sm text-slate-700 dot">
          {likes?.length} Likes
        </span>
      </div>
      <img
        className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
        src={`${import.meta.env.VITE_API_URL}/uploads/blog/${thumbnail}`}
        alt="thumbnail"
      />
    </>
  );
};

export default ProfileInfo;
