import axios from "axios";
import { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import UserPhoto from "./UserPhoto";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";

const Users = (props) => {
  const { users, tracks, onUserReport, ban, setIsBan } = props;
  const { roomId } = props;
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [username, setUsername] = useState("");
  const [userVotes, setUserVotes] = useState({});
  const [reportedUsers, setReportedUsers] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const [admin, setIsAdmin] = useState("");
  const [votedUsers, setVotedUsers] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8001").then((res) => {
      if (res.data.Status === "Success") {
        setUsername(res.data.username);
      }
    });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8001/speaking_room_user", {
        roomId: roomId,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Kullanıcı listeye girdi...");
        } else {
          console.log("Hata çıktı aga");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("liste yenileme çalıştı");
    axios
      .post("http://localhost:8001/speaking_room", {
        roomId: roomId,
      })
      .then((res) => {
        setUserCount(res.data.userCount);
        setUserList(
          res.data.userList.map((user) => ({ ...user, isButtonVisible: true }))
        );
        console.log(
          "UserCount: " +
            res.data.userCount +
            " UserList: " +
            res.data.userList[0].username +
            " Kullanıcı sayısı: " +
            res.data.userList.length
        );
      })
      .catch((err) => console.log(err));
  }, [tracks, users, ban, setIsBan]);

  useEffect(() => {
    axios.get("http://localhost:8001/admin").then((res) => {
      if (res.data.Status === "Success") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < reportedUsers.length; i++) {
      axios
        .post("http://localhost:8001/speaking_room_vote_control", {
          roomId: roomId,
          reportedUsers: reportedUsers[i],
        })
        .then((res) => {
          if (res.data.voteCount !== undefined) {
            setVoteCount(res.data.voteCount);
            console.log(
              "Oy sayısı alındı." +
                res.data.voteCount +
                " Kullanıcı sayısı " +
                userCount
            );
            console.log(
              "Oy oranı: " +
                res.data.voteCount +
                " Yüksek olması gereken sayı: " +
                userCount / 2
            );
            if (res.data.voteCount > userCount / 3) {
              console.log("Şuanda burası çalışıyor");
              banUser(reportedUsers[i]);
            }
          } else {
            console.log("Hata çıktı aga");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [reportedUsers, userCount]);

  const banUser = (username) => {
    axios
      .post("http://localhost:8001/speaking_room_ban", {
        roomId: roomId,
        username: username,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Kullanıcı banlandı.");
        } else {
          console.log("Hata çıktı aga");
          setIsBan((prevIsBanned) => prevIsBanned + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUserClick = (userIndex, votedname) => {
    const updatedUserList = userList.map((user, index) =>
      index === userIndex ? { ...user, isButtonVisible: false } : user
    );
    setUserList(updatedUserList);
    setReportedUsers((prevReportedUsers) => [...prevReportedUsers, votedname]);

    axios
      .post("http://localhost:8001/speaking_room_user_vote", {
        roomId: roomId,
        username: userList[userIndex].username,
      })
      .then((response) => {
        console.log(response.data);
        setUserVotes((prevVotes) => ({
          ...prevVotes,
          [userList[userIndex].username]:
            (prevVotes[userList[userIndex].username] || 0) + 1,
        }));
        onUserReport(userList[userIndex].username);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAdminClick = (userIndex, votedname) => {
    const updatedUserList = userList.map((user, index) =>
      index === userIndex ? { ...user, isButtonVisible: false } : user
    );
    setUserList(updatedUserList);
    setReportedUsers((prevReportedUsers) => [...prevReportedUsers, votedname]);

    axios
      .post("http://localhost:8001/speaking_room_user_vote", {
        roomId: roomId,
        username: userList[userIndex].username,
      })
      .then((response) => {
        console.log(response.data);
        setUserVotes((prevVotes) => ({
          ...prevVotes,
          [userList[userIndex].username]:
            (prevVotes[userList[userIndex].username] || 0) + 1000,
        }));
        onUserReport(userList[userIndex].username);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="user_list_container">
      {userList.length > 0 ? (
        <div>
          {userList.map((user, index) => (
            <div className="user_block" key={index}>
              <a
                href={`/profile/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="user_list_photo">
                  <UserPhoto username={user.username} />
                </div>
                <p>{user.username}</p>
              </a>

              {!admin && username !== user.username && user.isButtonVisible && (
                <button
                  onClick={() => handleUserClick(index, user.username)}
                  disabled={votedUsers.includes(user.username)}
                >
                  <ReportIcon />
                </button>
              )}
              {admin && username !== user.username && (
                <button
                  className="admin_button"
                  onClick={() => handleAdminClick(index, user.username)}
                >
                  <BlockIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default Users;
