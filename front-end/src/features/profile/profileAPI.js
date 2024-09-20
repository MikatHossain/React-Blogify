import { apiSlice } from "./../api/apiSlice";
import { addProfile, imageUpdated } from "./profileSlice";

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get profile
    getProfile: builder.query({
      query: (id) => `/profile/${id}`,

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          dispatch(addProfile(res.data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // upload image
    uploadProfileImage: builder.mutation({
      query: ({ formData, profileId }) => ({
        url: "/profile/avatar",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted({ profileId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getProfile", profileId, (draft) => {
              draft.avatar = data.user.avatar;
            })
          );

        


          dispatch(imageUpdated(data.user.avatar));



        } catch (err) {
          console.log("Error uploading avatar:", err);
        }
      },
    }),

    // update profile bio
    updateProfileBio: builder.mutation({
      query: ({ bio }) => ({
        url: "/profile",
        method: "PATCH",
        body: { bio },
      }),

      async onQueryStarted({ bio }, { dispatch, queryFulfilled }) {
        console.log(bio);

        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getProfile",
              data.user.id,
              (draft) => {
                if (draft) {
                  draft.bio = data.user.bio;
                }
              }
            )
          );
        } catch (err) {
          console.log("bio updating error: ", err);
        }
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateImageApiMutation,
  useUpdateProfileBioMutation,
  useUploadProfileImageMutation,
} = profileApi;
