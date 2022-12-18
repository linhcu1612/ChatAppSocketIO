/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { conversationList, conversationCreate } from "./conversationActions";

const initialState = {
  loading: false,
  conversationInfo: [],
  error: null,
  success: false,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    createdConversation: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    // get conversation list
    [conversationList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [conversationList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.conversationInfo = payload;
    },
    [conversationList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // create conversation
    [conversationCreate.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [conversationCreate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [conversationCreate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { createdConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
