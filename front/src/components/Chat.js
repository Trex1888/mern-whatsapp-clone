import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import axios from "../axios";
import "../styles/Chat.css";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios
      .post("/messages/new", {
        message: input,
        name: "Demo",
        timestamp: "Just now!",
        received: false,
      })
      .then(() => setInput(""))
      .catch((err) => console.log(err));
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src="https://tse4.mm.bing.net/th?id=OIP.9S6CZhLIEr9JDvvPkzJqzQHaHa&pid=Api&P=0&w=300&h=300" />
        <div className="chat-headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={` chat-message ${message.received && "chat-receiver"}`}
          >
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
