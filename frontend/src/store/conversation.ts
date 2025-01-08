import { createSlice } from "@reduxjs/toolkit";

const initialConversation = { selectedConverstion: {} };
const conversationSlice = createSlice({
  name: "selected-conversation",
  initialState: initialConversation,
  reducers: {
    setSelectedConversation(state, action) {
      state.selectedConverstion = action.payload;
    },
  },
});

export default conversationSlice.reducer;

export const conversationActions = conversationSlice.actions;
