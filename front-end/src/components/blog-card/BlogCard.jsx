import moment from "moment";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useDeleteBlogMutation } from "../../features/blogs/blogsAPI";
import { deleteSingleBlog } from "../../features/blogs/blogsSlice";
import useAvatar from "../../hooks/useAvatar";
import { showToast } from "../../utility/toast";
import Modal from "../common/Modal";
import Loader from "../loaders/Loader";

const BlogCard = ({ blog, page }) => {
  const {
    author,
    content,
    isFavourite,
    createdAt,
    likes,
    title,
    thumbnail,
    id,
  } = blog || {};

  const auth = useSelector((state) => state.auth?.user);
  const user = useSelector((state) => state.profile.user);
  const owner = auth.id === author.id;

  const [showAction, setShowAction] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBlog, { isSuccess, isLoading }] = useDeleteBlogMutation();
  const { avatarURL } = useAvatar(blog);
  useEffect(() => {
    if (isSuccess) {
      dispatch(deleteSingleBlog(id));
    }
  }, [dispatch, id, deleteBlog, isSuccess]);

  const deleteBlogHandler = () => {
    showToast("Blog has been deleted", "success");
    deleteBlog({ id, page });
    setIsModalOpen(false);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    navigate(`/blog/${id}`);
  };

  const handleAction = (e) => {
    e.stopPropagation();
    setShowAction((prev) => !prev);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  let contents = null;
  if (isLoading) {
    contents = <Loader />;
  } else {
    contents = (
      <div className="blog-card relative " onClick={handleCardClick}>
        <img
          className="blog-thumb "
          src={`${import.meta.env.VITE_API_URL}/uploads/blog/${thumbnail}`}
          alt="thumbnail"
        />

        <div className="mt-2">
          <h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">{content}</p>

          <div className="flex justify-between items-center">
            <Link to={`/me/${author.id}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center capitalize space-x-2">
                <div className="avater-img bg-indigo-600 text-white">
                  <img
                    // src={`${import.meta.env.VITE_API_URL}/uploads/avatar/${
                    //   user?.avatar
                    // }`}
                    src={avatarURL}
                    alt="avatar"
                    className="rounded-full w-[40px] h-[40px]"
                  />
                </div>

                <div>
                  <h5 className="text-slate-300 text-sm ">
                    {author.firstName} {author.lastName}
                  </h5>
                  <div className="flex items-center text-sm text-slate-700">
                    <span>{moment(createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
            </Link>
            <div className="text-sm px-2 py-1 text-slate-700 space-x-4">
              {isFavourite && <span className="text-xl">❤️</span>}
              <span className="text-xl">{likes?.length} Likes</span>
            </div>
          </div>

          {owner && (
            <div className="absolute right-2  top-2">
              <button onClick={handleAction}>
                <img
                  src={ThreeDotsIcon}
                  alt="3dots of Action"
                  className="w-8"
                />
              </button>
              {showAction && (
                <div className="action-modal-container">
                  <button className="action-menu-item hover:text-lwsGreen">
                    <img src={EditIcon} alt="Edit" />
                    Edit
                  </button>

                  <button
                    className="action-menu-item hover:text-red-500"
                    onClick={openDeleteModal}
                  >
                    <img src={DeleteIcon} alt="Delete" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {contents}
      <Modal isOpen={isModalOpen} onClose={closeDeleteModal}>
        <p className="text-black font-semibold text-xl">
          Are you sure you want to delete this blog post?
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={closeDeleteModal}
          >
            cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-1"
            onClick={deleteBlogHandler}
          >
            <FaRegTrashAlt /> <span> Delete</span>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BlogCard;
