import React, { useState } from "react";
import "./Input.css";
import axios from "axios";
import { chat } from "../../utils/APIRoutes";
import { io } from "socket.io-client";
import Button from "../Button";
import { IoIosSend } from "react-icons/io";

function Input({ currentGrp, user}) {
  const socket = io(import.meta.env.VITE_API_URL);
  const [msg, setMsg] = useState("");
  const sendMsg = async (e) => {
    e.preventDefault();
    if (msg === "") return;
    setMsg("");
    try {
      console.log(msg);
      socket.on("connect", () => {
        console.log("sender connected");
      });
      socket.emit("send-message", msg, currentGrp, user);
      const res = await axios.post(chat, {
        grp: currentGrp,
        msg: msg,
        from: user,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(msg);
  };
  return (
    <form onSubmit={sendMsg} className="flex gap-2 px-4 py-2">
      <input
        type="text"
        placeholder="Enter your msg"
        className="inputdata bg-zinc-900"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      ></input>
      <Button
        type="submit"
        text="Send"
        variant="gradient"
        rightIcon={<IoIosSend />}
      />
    </form>
  );
}

export default Input;
