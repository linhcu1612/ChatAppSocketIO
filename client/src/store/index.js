/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import conversationReducer from "./conversation/conversationSlice";
import messageReducer from "./message/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    message: messageReducer,
  },
});

export default store;
