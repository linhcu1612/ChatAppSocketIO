/** @format */

import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { WebSocketContext } from "../WebSocket";

const Chat = ({ creator, message, timestamp, id, conversation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const align = creator === userInfo.username ? "right" : "left";
  const time = new Date(timestamp).toLocaleString();

  const ws = useContext(WebSocketContext);

  const handleDelete = (e) => {
    e.stopPropagation();
    const data = {
      conversation: conversation,
      id: id,
    };
    ws.deleteMessage(data);
  };

  return (
    <Grid container>
      {creator === userInfo.username && (
        <Grid item xs={2}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}
      <Grid item xs={creator === userInfo.username ? 10 : 12}>
        <ListItemText
          style={{ wordBreak: "break-all" }}
          align={align}
          primary={message}></ListItemText>
        <ListItemText align={align} secondary={time}></ListItemText>
      </Grid>
    </Grid>
  );
};

export default Chat;
