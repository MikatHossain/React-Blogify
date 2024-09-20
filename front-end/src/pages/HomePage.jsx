import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import BlogCard from "../components/blog-card/BlogCard";
import NotFound from "../components/common/NotFound";
import Error from "../components/errors/Error";
import Favorite from "../components/home/sidebar/Favorites";
import MostPopular from "../components/home/sidebar/MostPopular";
import Loader from "../components/loaders/Loader";
import { useGetBlogsQuery } from "../features/blogs/blogsAPI";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isError } = useGetBlogsQuery(page);

  const blogsObject = useSelector((state) => state.blogs);

  const { blogs, total } = blogsObject || {};

  const fetchMore = () => {
    if (blogs.length < total) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error message="blogs fetching error" />;
  } else if (!isLoading && !isError && blogs?.length === 0) {
    content = (
      <>
        <NotFound msg={"No Content Found!"} className={"text-3xl"} />
      </>
    );
  } else if (!isLoading && !isError && blogs?.length > 0) {
    content = blogs?.map((blog) => (
      <BlogCard key={blog.id} blog={blog} page={page} />
    ));
  }

  return (
    <main>
      <section>
        <InfiniteScroll
          dataLength={blogs?.length}
          next={fetchMore}
          hasMore={blogs?.length < total}
          loader={<p>loading...card</p>}
          // height={window.innerHeight}
        >
          <div className="container ">
            <div className="grid grid-cols-1 md:grid-cols-7  gap-4">
              <div className="space-y-3 md:col-span-5 mt-10">{content}</div>

              <div className="md:col-span-2 h-full w-full space-y-5">
                <div className="space-y-5 mt-10  right-44">
                  <MostPopular />
                  <Favorite />
                </div>
              </div>
            </div>
          </div>
        </InfiniteScroll>
      </section>
    </main>
  );
};

export default HomePage;
