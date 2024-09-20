import { useGetFavoriteBlogsQuery } from "../../../features/blogs/blogsAPI";
import NotFound from "../../common/NotFound";
import Error from "../../errors/Error";
import Loader from "../../loaders/Loader";
import FavoriteItem from "./FavoriteItem";

const Favorite = () => {
  const { data: favourites, isLoading, isError } = useGetFavoriteBlogsQuery();

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error message="blogs fetching error" />;
  } else if (!isLoading && !isError && favourites.blogs?.length === 0) {
    content = (
      <>
        <NotFound msg={"No Content Found!"} className={"text-3xl"} />
      </>
    );
  } else if (!isLoading && !isError && favourites?.blogs?.length > 0) {
    content = favourites?.blogs?.map((f) => (
      <FavoriteItem key={f.id} favourite={f} />
    ));
  }

  return (
    <div className="sidebar-card ">
      <h3 className="text-slate-300 underline text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      <ul className="space-y-5 my-5 ">{content}</ul>
    </div>
  );
};

export default Favorite;
