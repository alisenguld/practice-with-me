import axios from "axios";
import { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import UserPhoto from "./UserPhoto";

const Users = (props) => {
  const { users, tracks } = props;
  const { roomId } = props;
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  axios.defaults.withCredentials = true;

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
    axios
      .post("http://localhost:8001/speaking_room", {
        roomId: roomId,
      })
      .then((res) => {
        setUserCount(res.data.userCount);
        setUserList(res.data.userList);
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
  }, [tracks, users]);

  return (
    <div className="user_list_container">
      {userList && userList.length > 0 ? (
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
