import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, userLoggedOut } from "../auth/authSlice";


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    
    

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  
  if (result?.error?.status === 403) {
 
    // Get refreshToken from state
    
    const refreshToken = api.getState().auth.refreshToken;
    
    if (refreshToken) {
      //  get a new token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      

      if (refreshResult?.data) {
        // Store the new tokens
        api.dispatch(
          setCredentials({
            accessToken: refreshResult.data.accessToken,
            refreshToken: refreshResult.data.refreshToken,
          })
        );

        // Retry the original query with the new access token
        result = await baseQuery(args, api, extraOptions);

      } else {
        // If refresh fails, log the user out
        api.dispatch(userLoggedOut());
      }
    } else {
      // If there's no refreshToken, log out the user
      api.dispatch(userLoggedOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
