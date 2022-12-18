/** @format */

import React from "react";

import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.number_wrapper}>
        <h1 className={classes.number}>404</h1>
      </div>
      <h2 className={classes.error}>ERROR</h2>
      <h3 className={classes.description}>Page Not Found</h3>
    </div>
  );
};

export default NotFound;
