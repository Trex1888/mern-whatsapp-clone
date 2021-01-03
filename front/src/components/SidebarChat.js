import { Avatar } from "@material-ui/core";
import React from "react";
import "../styles/SidebarChat.css";

function SidebarChat({ chat, mess }) {
  return (
    <div className="sidebarChat">
      <Avatar src="https://image.flaticon.com/icons/svg/194/194938.svg" />
      <div className="sidebarChat-info">
        <h2>{chat}</h2>
        <p>{mess}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
