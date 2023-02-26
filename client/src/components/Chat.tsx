import React, { useContext } from "react";
import "./chat.css";
import { GlobalContext } from "../state/Context";
import { io } from "socket.io-client";

type Props = {};

export default function Chat({}: Props) {
  const context = useContext(GlobalContext);

  const socket = io("http://localhost:8080");

  socket.on("connect", () => {
    console.log("WebSocket connection established!");
  });

  return (
    <div className="chat-container">
      <div className="heading-container">
        <div>LOGO</div>
        <button>Leave Room</button>
      </div>
      <div className="mid-container">
        <div className="room-users-container">
          <p>Room name:</p>

          <p>{context.state.user.room}</p>
          <p>Users</p>
          <ul>
            <li>USER</li>
          </ul>
        </div>
        <div className="messages-container"></div>
      </div>
      <div className="input-container">
        <input type="text"></input>
        <button>SEND</button>
      </div>
    </div>
  );
}
