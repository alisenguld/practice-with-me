import { useEffect, useState } from "react";
import VideoCall from "./VideoCall.js";
import axios from "axios";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Rooms.css";

export default function Rooms(props) {
  const [inCall, setInCall] = useState(true);
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isBanned, setUserBanned] = useState(false);
  const [ban, setIsBan] = useState(0);
  const [reportedUsers, setReportedUsers] = useState([]);

  const handleUserReport = (reportedUser) => {
    setReportedUsers((prevReportedUsers) => [
      ...prevReportedUsers,
      reportedUser,
    ]);
  };
  axios.defaults.withCredentials = true;

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

  useEffect(() => {
    axios
      .post("http://localhost:8001/speaking_room_user_isbanned", {
        roomId: props.roomId,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Kullanıcı banlı");
          window.location.href = "/banned";
          setUserBanned(true);
        } else {
          console.log("Kullanıcı banlı değil");
          setUserBanned(false);
        }
      })
      .catch((err) => console.log(err));
  }, [ban]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8001/speaking_room_user_isbanned", {
          roomId: props.roomId,
        })
        .then((res) => {
          if (res.data.Status === "Success") {
            console.log("Kullanıcı banlı");
            setUserBanned(true);
            window.location.href = "/banned";
          } else {
            console.log("Kullanıcı banlı değil");
            setUserBanned(false);
          }
        })
        .catch((err) => console.log(err));
    }, 5000); // Her 5 saniyede bir çalışacak

    return () => {
      clearInterval(interval); // Komponent temizlendiğinde interval'i temizle
    };
  }, [ban]);

  return (
    <div>
      {isBanned ? (
        <div className="login_conteiner">
          {" "}
          <Link to="/">Kullanıcı banlı.</Link>
        </div>
      ) : auth ? (
        <VideoCall
          Id={props}
          setInCall={setInCall}
          ban={ban}
          setIsBan={setIsBan}
        />
      ) : (
        <div className="login_container">
          <p>Please log in before entering the chat room.</p>
          <br />
          <br />
          <div>
            <Link to="/loginform">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}
