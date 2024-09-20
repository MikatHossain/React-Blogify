import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state?.auth);

  const { accessToken, user } = auth || {};

  if (accessToken && user?.id) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
