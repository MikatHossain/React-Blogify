import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EditIcon from "../assets/icons/edit.svg";
import Error from "../components/errors/Error";
import Loader from "../components/loaders/Loader";
import ProfileInfo from "../components/single-blog/ProfileInfo";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "../features/blogs/blogsAPI";
import useAuthor from "../hooks/useAuthor";
import { showToast } from "../utility/toast";
import Comments from "./../components/single-blog/comments/Comments";
import { FloatingActions } from "./../components/single-blog/FloatingActions";
import Tags from "./../components/single-blog/tags/Tags";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [contentText, setContentText] = useState();

  const dispatch = useDispatch();

  const { data: blog, isLoading, isError } = useGetSingleBlogQuery(blogId);

  const { isAuthor } = useAuthor(blog);

  const [updateBlog, { data: updateData, isSuccess: updateSuccess }] =
    useUpdateBlogMutation();

  const handleEditContent = (content) => {
    setEditMode((prev) => !prev);
    setContentText(content);
  };

  const submitContentHandler = () => {
    showToast("Blog content updated!", "success");
    updateBlog({
      id: blogId,
      data: {
        content: contentText,
      },
    });

    setEditMode(false);
  };

  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error message="blogs fetching error" />;
  } else if (!isLoading && !isError && !blog?.id) {
    content = <p>no blog found!</p>;
  } else if (!isLoading && !isError && blog?.id) {
    content = (
      <>
        <main>
          <section>
            <div className="container  py-8">
              <ProfileInfo blog={blog} />

              <Tags tags={blog?.tags} />

              <div className=" justify-center w-full text-slate-300 text-base md:text-lg leading-8 py-2 !text-left flex space-x-4 ">
                {!editMode && blog?.content}
                {editMode && (
                  <textarea
                    value={contentText}
                    name=""
                    rows={4}
                    cols={55}
                    className="bg-transparent border-2 rounded-md p-4"
                    onChange={(e) => setContentText(e.target.value)}
                  ></textarea>
                )}
                {editMode ? (
                  <GiConfirmed
                    size={32}
                    color="pink"
                    className="cursor-pointer"
                    onClick={submitContentHandler}
                  />
                ) : (
                  isAuthor && (
                    <img
                      className="cursor-pointer w-8 m-2"
                      src={EditIcon}
                      alt="edit"
                      onClick={() => handleEditContent(blog?.content)}
                    />
                  )
                )}
              </div>
            </div>
          </section>

          <Comments blog={blog} />
        </main>

        <FloatingActions blog={blog} />
      </>
    );
  }

  return <>{content}</>;
};

export default SingleBlogPage;
