import React, { useEffect, useState , useRef} from "react";
import "./ChatSpace.css";
import Input from "../Input/Input";
import axios from "axios";
import { clctMsg } from "../../utils/APIRoutes";
import { io } from "socket.io-client";
import { MdVideocam } from "react-icons/md";

export default function ChatSpace({ selectedGrp, user }) {
  const chatBoxRef = useRef(null)

  const scrollDown = () => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const socket = io(import.meta.env.VITE_API_URL);
  socket.on("connect", () => {
    socket.on("receive-message", (message) => {
      console.log(message);
      extractMsg(message.content, message.sender);
      scrollDown()
    });
  });

  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        socket.emit("join", selectedGrp);
        const response = await axios.post(clctMsg, {
          grp: selectedGrp,
        });
        setMsg(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
    setTimeout(() => {
      scrollDown();
    },[300])
  }, [selectedGrp]);
  const extractMsg = (message, user) => {
    setMsg((prev) => [...prev, { sender: user, content: message }]);
    scrollDown()
  };

  const msgUserType = (msg) => {
    return msg.sender == user ? 'ml-auto text-right' : 'mr-auto text-left'
  }
  return (
    <div className="flex flex-col w-full bg-zinc-950 rounded-md h-[calc(100vh-19rem)] relative">
      <div className="font-[600] text-xl bg-[#721da1] rounded-t-md px-4 py-2 flex justify-between items-center">
        {selectedGrp}
        <MdVideocam/>
      </div>
      <div className="flex flex-col w-full overflow-scroll px-4 py-2 gap-2 mb-20">
        {msg.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msgUserType(msg)} min-w-[100px] max-w-[350px]`}>
            <div className="flex bg-zinc-950">
              <p className={`text-[15px] font-[600] px-[5px] rounded-t-md bg-zinc-900 ${msgUserType(msg)}`}>{msg.sender}</p>
            </div>
            <p className={`text-[15px] px-2 py-1 bg-zinc-800 rounded-b-md ${msg.sender == user ? 'rounded-l-md' : 'rounded-r-md'}`}>{msg.content}</p>
          </div>
        ))}
          <div className="mb-[50px]"/>
          <div ref={chatBoxRef}/>
      </div>
      <div className="bottom-0 left-0 absolute w-full border-t-2 border-t-zinc-800">
        <Input currentGrp={selectedGrp} user={user}/>
      </div>
    </div>
  );
}
