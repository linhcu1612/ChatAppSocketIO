/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  messageList,
  messageCreate,
  messageDetail,
  messageDelete,
} from "./messageActions";

const initialState = {
  loading: false,
  messagesList: [],
  conversation: null,
  messageDetail: null,
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createdMessage: (state) => {
      state.success = false;
    },
    setMessagesList: (state, payload) => {
      state.messagesList = payload;
    },
  },
  extraReducers: {
    // get message list
    [messageList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [messageList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.messagesList = payload.messages;
      state.conversation = payload.conversation;
    },
    [messageList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // create message
    [messageCreate.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [messageCreate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [messageCreate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // get message detail
    [messageDetail.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [messageDetail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.messageDetail = payload;
      state.success = true;
    },
    [messageDetail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // delete message
    [messageDelete.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [messageDelete.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [messageDelete.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { createdMessage, setMessagesList } = messageSlice.actions;

export default messageSlice.reducer;
