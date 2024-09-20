import { useSelector } from "react-redux";

const useAvatar = (blog) => {
  const profile = useSelector((state) => state?.profile?.user);

  const isMe = blog?.id === profile?.id;

  const avatar = isMe ? profile?.avatar : blog?.author?.avatar;

  const avatarURL = `${import.meta.env.VITE_API_URL}/uploads/avatar/${avatar}`;

  return { avatarURL };
};

export default useAvatar;
