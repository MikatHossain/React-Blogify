import { apiSlice } from "../api/apiSlice";

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addComment: builder.mutation({
      query: ({ content, id }) => ({
        url: `blogs/${id}/comment`,
        method: "POST",
        body: { content },
      }),
      async onQueryStarted({ id, content }, { queryFulfilled, dispatch }) {

        const tempId = Date.now().toString(36) + Math.random().toString(36);

        const res = dispatch(
          apiSlice.util.updateQueryData("getSingleBlog", id, (draft) => {
            draft.comments.push({
              id: tempId,
              content: content,
            });
          })
        );

        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getSingleBlog", id, (draft) => {
              const commentIndex = draft?.comments.findIndex(
                (comment) => comment?.id === tempId
              );

              if (commentIndex != -1) {
                draft.comments[commentIndex] = data.comments[commentIndex];
              }
            })
          );
        } catch (err) {
          console.log(err);
          res.undo();
        }
      },
    }),

    deleteComment: builder.mutation({
      query: ({ blogId, commentId }) => ({
        url: `blogs/${blogId}/comment/${commentId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { blogId, commentId },
        { queryFulfilled, dispatch }
      ) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getSingleBlog", blogId, (draft) => {
              draft.comments = draft?.comments.filter(
                (comment) => comment.id !== commentId
              );
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useAddCommentMutation, useDeleteCommentMutation } = commentApi;
