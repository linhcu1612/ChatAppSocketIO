/** @format */

import React from "react";

import { Link } from "react-router-dom";

import { LOGIN } from "../../../routes/CONSTANTS";

import classes from "./Unauthorized.module.css";

const Unauthorized = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>UNAUTHORIZED</h1>
      <div className={classes.btn_wrapper}>
        <Link to={LOGIN} className={classes.link_wrapper}>
          <div className={classes.btn}>Login</div>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
