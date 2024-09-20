import { useSelector } from "react-redux";

const useAuthor = (blog) => {
  const user = useSelector((state) => state?.auth?.user);
  const isAuthor = blog?.author?.id === user.id;
  return { isAuthor };
};

export default useAuthor;
