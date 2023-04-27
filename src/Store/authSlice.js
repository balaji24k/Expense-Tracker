import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  token: localStorage.getItem("token"),
  userEmail: localStorage.getItem("email"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
    },
  },
});

// console.log(localStorage.getItem("isLoggedIn"));
export const authActions = authSlice.actions;

export default authSlice.reducer;