import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { useSelector } from "react-redux";
import EditIcon from "../../assets/icons/edit.svg";
import { useUpdateProfileBioMutation } from "../../features/profile/profileAPI";
import { showToast } from "../../utility/toast";

const Bio = ({ profile }) => {
  const auth = useSelector((state) => state.auth.user);

  const author = auth.id === profile.id;

  const [bioText, setBioText] = useState(profile?.bio || "");
  const [editMode, setEditMode] = useState(false);

  const [updateProfileBio] = useUpdateProfileBioMutation();

  const handleBioEdit = async () => {
    showToast("Profile bio updated!", "success");
    await updateProfileBio({ bio: bioText });

    setEditMode(false);
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-slate-400 mr-4 lg:text-lg text-xl">
            {bioText}
          </p>
        ) : (
          <textarea
            className="bg-transparent border-2 p-4 text-xl rounded-md"
            value={bioText}
            rows={4}
            cols={50}
            onChange={(e) => setBioText(e.target.value)}
          ></textarea>
        )}
      </div>
      {author && (
        <div>
          {!editMode ? (
            <button
              className="flex-center h-7 w-7 rounded-full"
              onClick={() => setEditMode(true)}
            >
              <img src={EditIcon} alt="Edit" className="w-6 " />
            </button>
          ) : (
            <button onClick={handleBioEdit} className="ml-3 ">
              {<GiConfirmed size={32} color="pink" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Bio;
