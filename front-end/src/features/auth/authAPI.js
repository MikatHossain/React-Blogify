import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // register user
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, {queryFulfilled,dispatch}){

          try {
              const result = await queryFulfilled
              
              
              localStorage.setItem("auth", JSON.stringify({
                accessToken: result.data.token.accessToken,
                refreshToken: result.data.token.refreshToken,
                  user: result.data.user
              }))

              dispatch(userLoggedIn({
                accessToken: result.data.token.accessToken,
                refreshToken: result.data.token.refreshToken,
                  user: result.data.user
              }))

          } catch (error) {
              console.error(error)
          }
      }
    }),

    // login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("auth", JSON.stringify({
            accessToken: result.data.token.accessToken,
            refreshToken: result.data.token.refreshToken,
              user: result.data.user
          }))

          dispatch(userLoggedIn({
            accessToken: result.data.token.accessToken,
            refreshToken: result.data.token.refreshToken,
              user: result.data.user
          }))
          
        } catch (error) {
          console.error(error);
        }
      },
    }),

    

  }),
});

export const { useSignUpMutation, useLoginUserMutation } = authAPI;
