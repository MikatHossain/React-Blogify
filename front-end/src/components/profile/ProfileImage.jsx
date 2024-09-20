import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "../../assets/icons/edit.svg";
import ProfileImageIcon from "../../assets/profile.png";
import { useUploadProfileImageMutation } from "../../features/profile/profileAPI";
import { showToast } from "../../utility/toast";

const ProfileImage = ({ profile }) => {
  const auth = useSelector((state) => state.auth.user);

  const author = auth.id === profile.id;
  const { avatar, id: profileId } = profile;

  const [uploadProfileImage] = useUploadProfileImageMutation();

  const [previewImage, setPreviewImage] = useState(
    `${import.meta.env.VITE_API_URL}/uploads/avatar/${avatar}`
  );

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = () => {
    const formData = new FormData();
    for (const file of fileUploadRef.current.files) {
      formData.append("avatar", file);

      const localImageUrl = URL.createObjectURL(file);

      setPreviewImage(localImageUrl);
    }

    showToast("Image uploaded successfully!", "success");
    uploadProfileImage({ formData, profileId });
  };

  return (
    <div className="relative mb-8 max-h-[200px] max-w-[200px] h-[180px] w-[180px]  rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {previewImage ? (
        <img
          src={previewImage}
          className=" rounded-full h-[180px] w-[180px]"
          alt="profile image"
        />
      ) : (
        <img
          src={ProfileImageIcon}
          alt="profile image"
          className="rounded-full h-[180px] w-[180px]"
        />
      )}
      {author && (
        <form id="form" encType="multipart/form-data">
          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            type="submit"
            onClick={handleImageUpload}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input type="file" id="file" ref={fileUploadRef} hidden />
        </form>
      )}
    </div>
  );
};

export default ProfileImage;
