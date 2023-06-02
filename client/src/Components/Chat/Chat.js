import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./Chat.css";

const ENDPOINT = "http://localhost:8001"; // WebSocket server endpoint

const Chat = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatMessagesRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8001").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setUsername(res.data.username);
      }
    });

    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    newSocket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    chatMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== "") {
      const newMessage = {
        sender: username,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      socket.emit("chat message", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <h2>Chat</h2>

      <div className="chat_messages">
        {messages.map((msg, index) => (
          <div
            className={`chat_message ${
              msg.sender === username
                ? "chat_message-self"
                : "chat_message-other"
            }`}
            key={index}
          >
            <p className="chat_message-text">{msg.text}</p>
            <p className="chat_message-info">
              <span className="chat_message-sender">{msg.sender}</span>
              <span className="chat_message-time">{msg.time}</span>
            </p>
          </div>
        ))}
        <div ref={chatMessagesRef} />
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <textarea
          id="input"
          rows="3"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
