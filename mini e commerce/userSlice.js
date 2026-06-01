import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Sakshi",
    isLoggedIn: true,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user.name = action.payload;
      state.user.isLoggedIn = true;
    },
    logout: (state) => {
      state.user.name = "";
      state.user.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
