/** @format */

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const messageList = createAsyncThunk(
  "message/list",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { auth } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Basic ${auth.token}`,
        },
      };

      const { data } = await axios.get(`/api/conversations/${id}`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const messageCreate = createAsyncThunk(
  "message/create",
  async ({ text, id }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth.token}`,
        },
      };

      await axios.post(`/api/conversations/${id}`, { text }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const messageDetail = createAsyncThunk(
  "message/detail",
  async ({ id, messageId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { auth } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Basic ${auth.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/conversations/${id}/${messageId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const messageDelete = createAsyncThunk(
  "message/delete",
  async ({ id, messageId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { auth } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Basic ${auth.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/conversations/${id}/${messageId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
