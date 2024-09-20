import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  total: 0,
  currentBlog: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // blogs add
    addBlogs: (state, action) => {
      const { blogs, total } = action.payload;

      if (state.blogs.length === 0 || !state.blogs) {
        state.blogs = blogs;
      } else {
        state.blogs = [...new Set([...state.blogs, ...blogs])];
      }
      state.total = total;
    },

    // add a single blog
    createBlog: (state, action) => {
      state.blogs.unshift(action.payload);
    },

    // delete a blog
    deleteSingleBlog: (state, action) => {
      state.blogs = state.blogs.filter((cart) => cart.id !== action.payload);
    },

    // update a blog
    updateBlogDetails: (state, action) => {
      if (state.currentBlog.id === action.payload.id) {
        state.currentBlog = action.payload;
      }

      const indexUpdateBlog = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (indexUpdateBlog !== -1) {
        state.blogs[indexUpdateBlog] = action.payload;
      }
    },

    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },

    toggleFavourite: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );

      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },

    // like a blog
    likedBlog: (state, action) => {
      const { id, data } = action.payload;
      const blog = state.blogs.find((b) => b.id === id);
      if (blog) {
        blog.likes = data?.likes;
        blog.isLiked = data?.isLiked;
      }
    },
  },
});

export const {
  addBlogs,
  createBlog,
  toggleFavourite,
  deleteSingleBlog,
  setCurrentBlog,
  updateBlogDetails,
  likedBlog,
} = blogsSlice.actions;
export default blogsSlice.reducer;
