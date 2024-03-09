import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../../components";
import "./Chat.css";
import Groups from "../../components/Groups/Groups";
import Welcome from "../../components/Welcome/Welcome";
import ChatSpace from "../../components/ChatSpace/ChatSpace";
import { UserAuth } from "../../context/AuthContext";

function Chat() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const {auth} = UserAuth()
  const [chatgrps, setChatgrps] = useState([]);
  const [selectedGrp, setSelectedGrps] = useState(undefined);
  const changeSelected = (grp) => {
    setSelectedGrps(grp);
  };
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
      setUser(auth.username);
      setChatgrps(auth.chatgrps);
    }
  }, []);
  return (
    <ProtectedRoute>
      <div className="container mt-4 px-2">
        <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
          <Groups
            grps={chatgrps}
            handleSelect={changeSelected}
            selectedGrp={selectedGrp}
            uaer={user}
          ></Groups>
          <div className="flex w-9/12 justify-center">
            {selectedGrp === undefined ? (
              <Welcome />
            ) : (
              <ChatSpace selectedGrp={selectedGrp} user={user} />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Chat;
