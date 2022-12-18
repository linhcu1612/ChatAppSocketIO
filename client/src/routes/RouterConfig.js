/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Room from "../pages/Room/Room";
import CreateRoom from "../pages/CreateRoom/CreateRoom";
import NotFound from "../pages/NotFound/NotFound";
import { ROOT, LOGIN, REGISTER, ROOMS, ROOM, CREATE_ROOM } from "./CONSTANTS";
import ProtectedRoute from "./ProtectedRoute";
import Rooms from "../pages/Rooms/Rooms";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route exact path={ROOT} element={<Home />} />
      <Route exact path={LOGIN} element={<Login />} />
      <Route exact path={REGISTER} element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path={CREATE_ROOM} element={<CreateRoom />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={ROOMS} element={<Rooms />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={ROOM + "/:roomId"} element={<Room />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
