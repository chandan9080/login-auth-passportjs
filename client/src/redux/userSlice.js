import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "abc",
    email: "",
    avatar: "",
    isLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.isLogin = action.payload.isLogin;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.isLogin = false;
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
