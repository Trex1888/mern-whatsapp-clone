import React from "react";
import "../styles/Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../components/SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png" />
        <div className="sidebar-headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChat
          chat="Exercise & Fitness"
          mess="Ready to work out? We are!"
        />
        <SidebarChat chat="Fishing Room" mess="Welcome to the Fishing Room" />
        <SidebarChat chat="Video Games" mess="This is the Video Game Room" />
      </div>
    </div>
  );
}

export default Sidebar;
