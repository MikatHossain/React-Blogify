import { useGetPopularBlogsQuery } from "../../../features/blogs/blogsAPI";
import NotFound from "../../common/NotFound";
import Error from "../../errors/Error";
import Loader from "../../loaders/Loader";
import PopularItem from "./PopularItem";

const MostPopular = () => {
  const { data, isLoading, isError, error } = useGetPopularBlogsQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error message="blogs fetching error" />;
  } else if (!isLoading && !isError && data.blogs?.length === 0) {
    content = (
      <>
        <NotFound msg={"Popular Blogs Empty!"} className={"text-xl"} />
      </>
    );
  } else if (!isLoading && !isError && data.blogs?.length > 0) {
    content = data.blogs.map((blog) => (
      <PopularItem key={blog.id} blog={blog} />
    ));
  }

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold underline">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">{content}</ul>
    </div>
  );
};

export default MostPopular;
