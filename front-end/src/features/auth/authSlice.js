import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken:null,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
   
      
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
    },

    setCredentials: (state, action)=>{
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
    }
  },
});

export const { userLoggedIn, userLoggedOut, setCredentials} = authSlice.actions;
export default authSlice.reducer;
