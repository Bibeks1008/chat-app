import { createSlice } from "@reduxjs/toolkit";

const initialSocketState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialSocketState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});


export default socketSlice.reducer

export const sockerActions = socketSlice.actions