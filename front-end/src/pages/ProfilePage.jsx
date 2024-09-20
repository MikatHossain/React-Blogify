import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../components/errors/Error";
import Loader from "../components/loaders/Loader";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useGetProfileQuery } from "../features/profile/profileAPI";
import { addProfile } from "../features/profile/profileSlice";

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetProfileQuery(id);

  useEffect(() => {
    dispatch(addProfile(data));
  }, [data, dispatch]);

  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error message="profile fetching error" />;
  } else {
    content = (
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <ProfileInfo profile={data} />
          <MyPosts profile={data} />
        </div>
      </main>
    );
  }

  return <>{content}</>;
};

export default ProfilePage;
