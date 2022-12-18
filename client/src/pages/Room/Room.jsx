/** @format */

import React, { useEffect, useRef, useContext, useState } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";

import { WebSocketContext } from "../../WebSocket";

import Chat from "../../components/Chat";

import classes from "./Room.module.css";

export default function Room() {
  const params = useParams();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [messageList, setMessageList] = useState([]);
  const [conversation, setConversation] = useState(null);

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    ws.joinRoom(params.roomId);
    return () => {
      ws.exitRoom(params.roomId);
    };
  }, [ws, params.roomId]);

  ws.socket.on("updateMessageList", async (data) => {
    const payload = JSON.parse(data);
    setConversation(payload.conversation);
    setMessageList(payload.messages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      content: textRef.current.value,
      conversation: params.roomId,
      session: userInfo.token,
    };
    ws.newMessage(data);
    textRef.current.value = "";
  };

  const handleBack = (e) => {
    navigate("/rooms");
  };

  const textRef = useRef();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header_wrapper}>
        <Button
          variant='contained'
          style={{
            color: "rgb(215, 75, 71)",
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "70px",
            fontWeight: "600",
          }}
          onClick={handleBack}
          startIcon={<ArrowBackIcon sx={{ color: pink[500] }} />}>
          Back
        </Button>
        <h1 className={classes.header}>
          {conversation != null ? conversation.title : ""}
        </h1>
      </div>
      <div className={classes.chat}>
        <List className={classes.messageArea}>
          {messageList?.map((message) => (
            <ListItem key={message.id}>
              <Chat
                conversation={message.conversation}
                id={message.id}
                message={message.text}
                creator={message.creator}
                timestamp={message.timestamp}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div className={classes.send_wrapper}>
          <input
            ref={textRef}
            type='text'
            placeholder='message text'
            className={classes.input}
          />
          <button
            type='submit'
            className={classes.submit_button}
            onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
