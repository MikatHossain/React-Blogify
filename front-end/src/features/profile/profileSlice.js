import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userBlogs: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    addProfile: (state, action) => {
      state.user = action.payload;
    },

    updateData: (state, action) => {
      state.user.bio = action.payload;
    },

    imageUpdated: (state, action) => {
      state.user.avatar = action.payload;
    },

    addUserBlogs: (state, action) => {


      const newBlogs = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const uniqueBlogs = newBlogs.reduce((acc, blog) => {
        const exists = state.userBlogs.some(
          (existingBlog) => existingBlog.id === blog.id
        );

        if (!exists) {
          acc.push(blog);
        }

        return acc;
      }, []);
      state.userBlogs = [...state.userBlogs, ...uniqueBlogs];
    },

    removeUserBlog: (state, action) => {
      state.userBlogs = state.userBlogs.filter(
        (blog) => blog.id !== action.payload
      );
    },
  },
});

export const {
  addProfile,
  addUserBlogs,
  updateAvatar,
  imageUpdated,
  updateData,
  removeUserBlog,
} = profileSlice.actions;
export default profileSlice.reducer;
