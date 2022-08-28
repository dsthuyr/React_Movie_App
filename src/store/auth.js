import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      token: token,
      isLoggedIn: true,
    };
  }
  return {
    token: "",
    isLoggedIn: false,
  };
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      // console.log(action.payload.expirationTime);
      // logoutTimer = setTimeout(() => {
      //   state.isLoggedIn = false;
      //   state.token = null;
      //   localStorage.removeItem("token");
      // }, action.payload.expirationTime);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
