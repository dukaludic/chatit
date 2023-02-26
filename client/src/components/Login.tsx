import React, { useState, useContext } from "react";
import { GlobalContext } from "../state/Context";
import { useNavigate } from "react-router-dom";
type Props = {};

export default function Login({}: Props) {
  const context = useContext(GlobalContext);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    //@ts-ignore
    context.dispatch({ type: "LOGIN", payload: { name: name, room: room } });

    navigate("/chat");
  };

  return (
    <div>
      <div className="input-container">
        <p>Username</p>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className="input-container">
        <p>Room</p>
        <select
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        >
          <option value="">Select a room</option>
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}
