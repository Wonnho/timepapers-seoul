import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  accessToken: '',
  isLoggedIn: false,
  email: '',
  role: '',
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const accessToken = action.payload;
      const token = accessToken.replace('Bearer ', '');
      const decodedToken = jwtDecode(token);
      state.accessToken = action.payload;
      state.isLoggedIn = true;
      state.email = decodedToken.sub;
      state.role = decodedToken.roles[0];
      state.userId = decodedToken.userId;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.email = null;
      state.role = null;
      state.userId = null;
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;