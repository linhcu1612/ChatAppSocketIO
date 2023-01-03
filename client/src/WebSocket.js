/** @format */

import React, { createContext } from "react";
import io from "socket.io-client";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export const WebSocketProvider = ({ children }) => {
  let socket;
  let ws;

  const newMessage = (payload) => {
    socket.emit("newMessage", JSON.stringify(payload));
  };

  const deleteMessage = (payload) =>
    socket.emit("deleteMessage", JSON.stringify(payload));

  const joinRoom = (payload) => {
    socket.emit("userJoined", payload);
  };

  const exitRoom = (payload) => {
    socket.emit("exitRoom", payload);
  };

  const newConversation = (payload) => {
    socket.emit("newConversation", JSON.stringify(payload));
  };

  if (!socket) {
    socket = io("wss://localhost:3001/");

    ws = {
      socket: socket,
      newMessage,
      newConversation,
      joinRoom,
      exitRoom,
      deleteMessage,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
