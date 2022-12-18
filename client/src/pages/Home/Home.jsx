/** @format */

import React from "react";

import classes from "./Home.module.css";

import { useSelector } from "react-redux";

import { REGISTER, LOGIN, ROOMS } from "../../routes/CONSTANTS";

import { Link } from "react-router-dom";

export default function Home() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>WELCOME TO CHATAPP</h1>
      <div className={classes.btn_wrapper}>
        {!userInfo ? (
          <>
            <Link to={LOGIN} className={classes.link_wrapper}>
              <div className={classes.btn}>Login</div>
            </Link>
            <Link to={REGISTER} className={classes.link_wrapper}>
              <div className={classes.btn}>Register</div>
            </Link>
          </>
        ) : (
          <Link to={ROOMS} className={classes.link_wrapper}>
            <div className={classes.btn}>Rooms</div>
          </Link>
        )}
      </div>
    </div>
  );
}
