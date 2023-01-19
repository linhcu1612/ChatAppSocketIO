/** @format */

import React, { useContext } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";

import { WebSocketContext } from "../WebSocket";

const RoomDisplay = ({ id, title, deleteAble }) => {
  const ws = useContext(WebSocketContext);

  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    // const data = {
    //   conversation: conversation,
    // };
    // ws.deleteMessage(data);
  };

  return (
    <ListItem key={id}>
      <ListItemButton
        onClick={() => {
          navigate(`/room/${id}`);
        }}>
        <ListItemText primary={title} />
      </ListItemButton>
      {deleteAble && (
        <IconButton onClick={handleDelete}>
          <ClearIcon />
        </IconButton>
      )}
    </ListItem>
  );
};

export default RoomDisplay;
