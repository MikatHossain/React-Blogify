import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import blogsSlice from "../features/blogs/blogsSlice";
import profileSlice from "../features/profile/profileSlice";


const store = configureStore({
    reducer:{
            [apiSlice.reducerPath]: apiSlice.reducer,
            auth:authSliceReducer,
            profile: profileSlice,
            blogs: blogsSlice
    },
    middleware: (getDefaultMiddlewares )=>getDefaultMiddlewares().concat(apiSlice.middleware),

})

export default store