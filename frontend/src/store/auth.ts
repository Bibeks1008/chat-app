import { createSlice } from "@reduxjs/toolkit";

const initialAuthUser: any = JSON.parse(
  localStorage.getItem("chat-user") || "null"
);

const initialAuthState = { authUser: initialAuthUser };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;

      // if (action.payload) {
      //   localStorage.setItem("chat-user", JSON.stringify(action.payload));
      // } else {
      //   localStorage.removeItem("chat-user");
      // }
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
