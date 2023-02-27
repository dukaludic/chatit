import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import { GlobalContext } from "../state/Context";
import { io } from "socket.io-client";

type Props = {};

type Message = {
  username: string;
  message: string;
  isAdmin: boolean;
  room?: string;
};

type User = {
  username: string;
  room: string;
};

export default function Chat({}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [roomUsers, setRoomUsers] = useState<string[]>([]);
  const context = useContext(GlobalContext);

  const socket = io("http://localhost:8080");

  console.log("CHAT MOUNTED");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("WebSocket connection established!");
    });

    socket.on("botMessage", (msg) => {
      setMessages((prevState) => [
        ...prevState,
        {
          username: "ChatBot",
          isAdmin: true,
          message: msg,
        },
      ]);
    });

    socket.on("message", ({ username, message }) => {
      console.log(messages, "msgs");
      setMessages((prevState) => [
        ...prevState,
        { username, message, isAdmin: false },
      ]);
    });

    socket.emit("join", {
      username: context.state.user.name,
      room: context.state.user.room,
    });

    socket.on("roomUsers", (users) => {
      console.log(users, "SET ROOM USRS");
      setRoomUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    socket.emit("chatMessage", {
      username: context.state.user.name,
      room: context.state.user.room,
      message: input,
    });

    setInput("");
  };

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
            <>
              {console.log(roomUsers)}
              {roomUsers.map((u) => {
                return <li>{u}</li>;
              })}
            </>
          </ul>
        </div>
        <div className="messages-container">
          {messages.map((msg) => {
            return (
              <div className="msg-container">
                <h4>{msg.username}</h4>
                <p>{msg.message}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        ></input>
        <button onClick={handleSend}>SEND</button>
      </div>
    </div>
  );
}
