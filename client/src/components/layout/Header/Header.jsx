/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authDetail } from "../../../store/auth/authActions";
import { logout } from "../../../store/auth/authSlice";

//MUI Components
import Box from "@mui/material/Box";

//Router
import { Link } from "react-router-dom";
import { ROOT } from "../../../routes/CONSTANTS";

//css file
import classes from "./Header.module.css";

export default function Header() {
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  useEffect(() => {
    if (token) {
      dispatch(authDetail());
    }
  }, [token, dispatch]);

  return (
    <Box className={classes.header_container} py={3} px={4}>
      <Link to={ROOT} className={classes.header_logo}>
        <div>CHATAPP</div>
      </Link>
      <div className={classes.header_status}>
        <span>
          {userInfo
            ? `Logged in as ${userInfo.username}`
            : "You're not logged in"}
        </span>
        <div className={classes.cta}>
          {userInfo ? (
            <div className={classes.btn} onClick={() => dispatch(logout())}>
              Logout
            </div>
          ) : (
            <NavLink className={classes.btn} to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </Box>
  );
}
