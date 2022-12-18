/** @format */

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./routes/RouterConfig";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { WebSocketProvider } from "./WebSocket";

import Header from "./components/layout/Header/Header";

import background from "./assets/background/background.jpeg";

const Background = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-image: ${`url(${background})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.5s linear;
`;

function App() {
  return (
    <>
      <WebSocketProvider>
        <Background />
        <BrowserRouter>
          <Header />
          <Container maxWidth='md'>
            <RouterConfig />
          </Container>
        </BrowserRouter>
      </WebSocketProvider>
    </>
  );
}

export default App;
