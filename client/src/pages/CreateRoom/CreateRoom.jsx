/** @format */

import React, { useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Error from "../../components/Error";

import { conversationCreate } from "../../store/conversation/conversationActions";
import { createdConversation } from "../../store/conversation/conversationSlice";

import classes from "./CreateRoom.module.css";

export default function CreateRoom() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.conversation
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/rooms");
      dispatch(createdConversation());
    }
  }, [navigate, success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
    };
    dispatch(conversationCreate(data));
  };
  const titleRef = useRef();

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>CREATE NEW ROOM</h1>
      <form className={classes.form}>
        {error && <Error>{error}</Error>}
        <div>
          <label className={classes.label}>TITLE:</label>
          <input
            ref={titleRef}
            type='text'
            placeholder='conversation title'
            className={classes.input}
          />
        </div>
        <div>
          <button
            type='submit'
            className={classes.submit_button}
            onClick={handleSubmit}
            disabled={loading}>
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}
