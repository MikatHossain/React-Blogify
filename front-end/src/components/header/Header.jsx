import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg";
import { userLoggedOut } from "../../features/auth/authSlice";
import CreateBlogPage from "../../pages/CreateBlogPage";
import Portal from "../../Portal";
import Search from "../search/Search";
import HeaderItem from "./HeaderItem";

const Header = () => {
  const auth = useSelector((state) => state.auth?.user);

  const user = useSelector((state) => state.profile?.user);

  const userAvatar = user?.avatar ?? auth?.avatar;

  const [open, setOpen] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const { id, firstName, lastName } = auth || {};
  const author = auth?.id === user?.id;
  const avatar = user?.avatar ?? auth?.avatar;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/login");
  };

  const handler = () => {
    if (auth) {
      setOpen(!open);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="fixed  right-0 left-0 top-0 z-50 ">
        <nav className="container ">
          <div>
            <Link
              to="/"
              className="font-roboto text-2xl uppercase tracking-widest "
            >
              React <span className="text-yellow-400">Blogify</span>
            </Link>
          </div>

          <div>
            <ul className="flex md:flex-row md:items-center space-y-4  flex-col justify-center  items-center md:space-x-5">
              <HeaderItem item="write" handler={handler} />

              <li>
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setOpenSearchModal(true)}
                >
                  <img src={SearchIcon} alt="Search" />
                  <span>Search</span>
                </button>

                {openSearchModal && auth && (
                  <Portal>
                    <Search onClose={() => setOpenSearchModal(false)} />
                  </Portal>
                )}
              </li>

              {auth ? (
                <li onClick={logoutHandler}>
                  <Link className="text-white/50 hover:text-white transition-all duration-200">
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>
              )}

              {auth && (
                <Link to={`/me/${id}`}>
                  <li className="flex items-center">
                    <div className="avater-img bg-orange-600 text-white w-[50px] h-[50px]  ">
                      {avatar ? (
                        <img
                          src={`${
                            import.meta.env.VITE_API_URL
                          }/uploads/avatar/${user?.avatar}`}
                          alt="avatar"
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      ) : (
                        <span>{auth.firstName[0].toUpperCase()}</span>
                      )}
                    </div>

                    <span className="text-white ml-2 capitalize">
                      {firstName} {lastName}
                    </span>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </nav>
      </header>
      {open && (
        <Portal>
          <CreateBlogPage handler={handler} />
        </Portal>
      )}
    </>
  );
};

export default Header;
