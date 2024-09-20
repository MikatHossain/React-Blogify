import Bio from "./Bio";
import ProfileImage from "./ProfileImage";

const ProfileInfo = ({ profile }) => {
  const { firstName, lastName, email } = profile || {};

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage profile={profile} />

      <div>
        <h3 className="text-2xl font-semibold capitalize tracking-wider text-white lg:text-[28px]">
          {firstName} {lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg text-indigo-400">{email}</p>
      </div>

      <Bio profile={profile} />

      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileInfo;
