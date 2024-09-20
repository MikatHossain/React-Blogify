import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/icons/close.svg";
import { useGetSearchQuery } from "../../features/search/searchAPI";
import NotFound from "../common/NotFound";
import Loader from "../loaders/Loader";
const Search = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useGetSearchQuery(searchTerm, {
    skip: !searchTerm,
  });

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    if (value) {
      setSearchTerm(value);
    }
  };

  const handleSearch = debounceHandler(doSearch, 1000);

  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <NotFound msg="No search result found!" />;
  } else if (!isLoading && !isError && data?.data?.length === 0) {
    content = <NotFound msg="No search result found!" />;
  } else if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((result) => (
      <div className="flex gap-6 py-2" key={result.id}>
        <Link
          className="flex space-x-2"
          to={`/blog/${result.id}`}
          onClick={onClose}
        >
          <img
            className="h-28 object-contain"
            src={`${import.meta.env.VITE_API_URL}/uploads/blog/${
              result.thumbnail
            }`}
            alt=""
          />
          <div className="mt-2">
            <h3 className="text-slate-300 text-xl font-bold">{result.title}</h3>

            <p className="mb-6 text-sm text-slate-500 mt-1">
              {result.content.split(" ").slice(0, 20).join(" ")}...
            </p>
          </div>
        </Link>
      </div>
    ));
  }

  return (
    <>
      <section className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
        <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
          <div>
            <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
              Search for Your Desire Blogs
            </h3>
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Start Typing to Search"
              className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            />
          </div>

          <div className="">
            <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>

            <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
              {content}
            </div>
          </div>

          <Link onClick={onClose}>
            <img
              src={CloseIcon}
              alt="Close"
              className="absolute right-2 top-2 cursor-pointer w-8 h-8"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Search;
