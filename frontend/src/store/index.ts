import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import conversationReducer from "./conversation";

const store = configureStore({
  reducer: { auth: authReducer, conversation: conversationReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
