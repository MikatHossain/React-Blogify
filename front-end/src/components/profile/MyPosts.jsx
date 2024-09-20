import { useSelector } from "react-redux";
import BlogCard from "../blog-card/BlogCard";
import NotFound from "../common/NotFound";

const MyPosts = ({ profile }) => {
  const blogs = useSelector((state) => state.blogs.blogs);

  const authorBlogs = blogs.filter((blog) => blog.author.id === profile.id);

  let content = null;
  if (blogs.length === 0) {
    content = (
      <NotFound
        msg="You have no blogs! click on write button"
        className={"text-2xl"}
      />
    );
  } else {
    content = (
      <div className="my-6 space-y-4">
        {authorBlogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl font-roboto tracking-wider">
        Your <span className="text-yellow-300">Blogs</span>
      </h4>
      {content}
    </>
  );
};

export default MyPosts;
