/** @format */

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { conversationList } from "../../store/conversation/conversationActions";

import classes from "./Rooms.module.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";

import { CREATE_ROOM } from "../../routes/CONSTANTS";

import { Link } from "react-router-dom";

export default function Rooms() {
  const dispatch = useDispatch();
  const { conversationInfo } = useSelector((state) => state.conversation);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(conversationList());
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>ROOM LIST</h1>
      <List className={classes.form}>
        {conversationInfo?.conversations?.map((conversation) => (
          <ListItem key={conversation.id}>
            <ListItemButton
              onClick={() => {
                navigate(`/room/${conversation.id}`);
              }}>
              <ListItemText primary={conversation.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className={classes.btn_wrapper}>
        <Link to={CREATE_ROOM} className={classes.link_wrapper}>
          <div className={classes.btn}>Create New Room</div>
        </Link>
      </div>
    </div>
  );
}
