import { createSlice } from "@reduxjs/toolkit";

export type ConversationType = {
  _id: string;
  fullName: string;
  username: string;
  gender: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};

const initialConversation = { selectedConversation: {}, messages: [] };
const conversationSlice = createSlice({
  name: "selected-conversation",
  initialState: initialConversation,
  reducers: {
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export default conversationSlice.reducer;

export const conversationActions = conversationSlice.actions;
