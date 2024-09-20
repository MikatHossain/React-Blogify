import { apiSlice } from "./../api/apiSlice";
import { addBlogs, createBlog, likedBlog } from "./blogsSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // get all blogs
    getBlogs: builder.query({
      query: (page) =>
        `/blogs?page=${page}&limit=${import.meta.env.VITE_LOAD_CARD_PER_PAGE}`,
      async onQueryStarted(page,{dispatch, queryFulfilled}){
     
      try {
           const {data} = await queryFulfilled
          
           dispatch(addBlogs(data))
           
           
      } catch (err) {
          console.log(err);
          
      }

      }
    }),

    // get single blog
    getSingleBlog: builder.query({
      query: (id) => `blogs/${id}`,
    }),

    // get popular blogs
    getPopularBlogs: builder.query({
      query: () => `/blogs/popular`,
    }),

    // get favorite blogs
    getFavoriteBlogs: builder.query({
      query: () => `/blogs/favourites`,
    }),

    //  ------------------------- mutations------------------------

    // create a blog
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blogs",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch, getState }) {
        try {
          const user = getState().auth.user;

          const { data: newBlog } = await queryFulfilled;

          dispatch(createBlog(newBlog.blog))

          // dispatch(
          //   apiSlice.util.updateQueryData("getBlogs", 1, (draft) => {
          //     draft.blogs.unshift(newBlog.blog);
          //   })
          // );

          // dispatch(
          //   apiSlice.util.updateQueryData("getProfile", user.id, (draft) => {
          //     draft.blogs.unshift(newBlog.blog);
          //   })
          // );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // delete a blog
    deleteBlog: builder.mutation({
      query: ({ id, page }) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(
        { id, page },
        { queryFulfilled, getState, dispatch }
      ) {
        const user = getState().auth.user;

        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getBlogs", page, (draft) => {
            if (draft.blogs) {
              draft.blogs = draft.blogs.filter((blog) => blog.id !== id);
            }
          })
        );

        // update profile page after delete
        const patchResult2 = dispatch(
          apiSlice.util.updateQueryData("getProfile", user.id, (draft) => {
            if (draft.blogs) {
              draft.blogs = draft.blogs.filter((blog) => blog.id !== id);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.error("Error deleting blog:", err);
          patchResult.undo();
          patchResult2.undo();
        }
      },
    }),

    // update blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getSingleBlog", id, (draft) => {
              if (draft) {
                draft.content = data?.content;
                draft.title = data?.title;
              }
            })
          );
        } catch (err) {
          console.log(err);
          // patchResult.undo()
        }
      },
    }),

    // liked a blog
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}/like`,
        method: "POST",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const user = getState().auth.user;



        // cache update blogs
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getBlogs", 1, (draft) => {
            const index = draft.blogs.findIndex((blog) => blog.id === id);

            if (index !== -1) {
              const likeIndex = draft.blogs[index].likes.findIndex(
                (like) => like.id === user?.id
              );

              if (likeIndex !== -1) {
                draft.blogs[index].likes.splice(likeIndex, 1);
              } else {
                draft.blogs[index].likes.push({ id: user.id });
              }
            }
          })
        );

        // cache update single blog
        const patchResult2 = dispatch(
          apiSlice.util.updateQueryData("getSingleBlog", id, (draft) => {
            const likeIndex = draft.likes.findIndex(
              (like) => like.id === user.id
            );

            if (likeIndex !== -1) {
              draft.likes.splice(likeIndex, 1);
            } else {
              draft.likes.push({ id: user.id });
            }
          })
        );

        try {
         const {data} =  await queryFulfilled;
          dispatch(likedBlog({data,id}))

        } catch (err) {
          console.error("Failed to like the blog.", err);
          patchResult.undo();
          patchResult2.undo();
        }
      },
    }),

    // Favorite blog
    toggleFavoriteBlog: builder.mutation({
      query: (blogId) => ({
        url: `blogs/${blogId}/favourite`,
        method: "PATCH",
      }),

      async onQueryStarted(blogId, { dispatch, queryFulfilled }) {
        // cache update single blog
        const dispatchFav = dispatch(
          apiSlice.util.updateQueryData("getSingleBlog", blogId, (draft) => {
            if (draft) {
              draft.isFavourite = !draft.isFavourite;
            }
          })
        );

        // cache update  blogs
        const dispatchFav2 = dispatch(
          apiSlice.util.updateQueryData("getBlogs", 1, (draft) => {
            const blogIndex = draft.blogs.findIndex(
              (blog) => blog.id === blogId
            );
            if (blogIndex !== -1) {
              draft.blogs[blogIndex].isFavourite =
                !draft.blogs[blogIndex].isFavourite;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          dispatchFav.undo();
          dispatchFav2.undo();
        }
      },
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetFavoriteBlogsQuery,
  useGetPopularBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useLikeBlogMutation,
  useToggleFavoriteBlogMutation,
} = blogsApi;
