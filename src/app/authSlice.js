import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  roles: [],
  dashboard: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.jwtToken;
      state.username = action.payload.username;
      state.roles = action.payload.roles;
      state.dashboard = action.payload.dashboardResponse;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.token = null;
      state.username = null;
      state.roles = [];
      state.dashboard = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
