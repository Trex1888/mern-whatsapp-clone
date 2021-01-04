import React, { useEffect, useState } from "react";
import "../styles/SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({ chat, mess }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat-info">
        <h2>{chat}</h2>
        <p>{mess}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
