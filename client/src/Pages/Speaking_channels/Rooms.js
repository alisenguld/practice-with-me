import { useEffect, useState } from "react";
import VideoCall from "./VideoCall.js";
import axios from "axios";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Rooms.css";

export default function Rooms(props) {
  const [inCall, setInCall] = useState(true);
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8001").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setUsername(res.data.username);
      } else {
        setMessage(res.data.Message);
      }
    });
  }, []);

  return (
    <div>
      {auth ? (
        <VideoCall Id={props} setInCall={setInCall} />
      ) : (
        <div className="login_conteiner">
          <p>Please log in before entering the chat room.</p><br /><br />
          <div>
            <Link to="/loginform">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}
