import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import conversationReducer from "./conversation";
import socketReducer from "./socket"

const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    socket: socketReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
