import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      {userList && userList.length > 0 ? (
        userList.map((user, index) => <p key={index}>{user.username}</p>)
      ) : (
        <p>No users available</p>
      )}
      {userList && userList.length}
        
    </div>
  );
};

export default Users;
