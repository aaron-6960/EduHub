import React, { useState } from "react";
import "./Group.css";
import axios from "axios";
import { createGrp, joinGroup } from "../../utils/APIRoutes";
import Button from "../Button";
import { UserAuth } from "../../context/AuthContext";
import HrtLn from "../HrtLn";
import { IoMdAdd } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";

function Groups({ grps, handleSelect, selectedGrp }) {
  const {auth,setAuth} = UserAuth()

  const [grpName, setGrpName] = useState("")

  const setSelectGrp = (grp) => {
    handleSelect(grp);
  };

  const joinGrp = async (e) => {
    e.preventDefault();
    try {
      console.log(joinGroup)
      const res = await axios.post(joinGroup, {
        grp: grpName,
        user: auth.username,
      });
      addValueToList(grpName);
    } catch (err) {
      console.log(err);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    if (grpName === "") return;
    try {
      const res = await axios.post(createGrp, {
        grp: grpName,
        user: auth.username,
      });
      addValueToList(grpName);
    } catch (err) {
      console.log(err);
    }
  };

  function addValueToList(value) {
    let existingList = auth.chatgrps;
    existingList.push(value);
    setAuth({...auth, chatgrps:existingList})
    auth.chatgrps = existingList;
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  const selectedClass = (grp) => {
    return selectedGrp === grp ? "selected" : "bg-zinc-800"
  }

  return (
    <div className="flex bg-zinc-950 p-2 rounded-md flex-col text-center gap-2 w-3/12 h-[calc(100vh-19rem)]">
      <div className="flex gap-2 max-xl:flex-col">
        <input
          type="text"
          className="inputdata bg-zinc-900"
          placeholder="Group Name"
          value={grpName}
          onChange={(e) => setGrpName(e.target.value)}
        ></input>
        <div className="flex gap-2">
          <Button handleClick={joinGrp} text="Join" variant="chatbtn" leftIcon={<IoMdAdd/>}/>
          <Button handleClick={createHandler} text="Create" variant="chatbtn" leftIcon={<MdAddToPhotos/>}/>
        </div>
      </div>
      <HrtLn />
      {grps.map((grp, index) => {
        return (
          <div
            className={`p-2 rounded-md hover:cursor-pointer ${selectedClass(grp)}`}
            key={index}
            onClick={() => setSelectGrp(grp)}
          >
            <p className="text-left font-[500]">{grp}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Groups;
