import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};

export default useAuthCheck;
