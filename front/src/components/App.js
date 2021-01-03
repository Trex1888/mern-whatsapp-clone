import React, { useEffect, useState } from "react";
import "../styles/App.css";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Pusher from "pusher-js";
import axios from "../axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/messages/sync")
      .then((response) => setMessages(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("060ed5f036b8eec6d77c", {
      cluster: "us2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) => {
      setMessages([...messages, newMessages]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
