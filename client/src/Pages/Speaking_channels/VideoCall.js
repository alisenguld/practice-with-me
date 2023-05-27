import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings.js";
import { Grid } from "@material-ui/core";
import Video from "./Video.js";
import Controls from "./Controls.js";
import "./VideoCall.css";
import Users from "../../Components/User_list/Users.js"

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const { roomId } = props.Id;
  const [myBool, setMyBool] = useState(true);
  let i = 0;
  const toggleBool = () => {
    setMyBool(!myBool);
  };

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          // önceki kullanıcıları alır user'den ve sonra yeni bir orada olan kullanıcıların listesini ve kendini geri döndürür.
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });
      i++;
      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop(); // kapalı değilse kapatmasını sağlıyor
        }
        if (mediaType === "video") {
          // Eğer kullanıcı ekranı kapattıysa otomatikman görüntüden çıkar.
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token[roomId], null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName[roomId]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName[roomId], client, ready, tracks]); //Herhangibiri değişti zaman bu fonksiyonu çalıştır.

  return (
    <div className="videocall">
      <div className="userlist">
        <Users tracks={tracks} users={users} roomId={roomId} client={client} channelName={channelName[roomId]} />
      </div>
      <div className="video_track">
        <Grid container direction="column" style={{ height: "850px" }}>
          <div className="user_video">
            <Grid item style={{ width: "100%" }}>
              {start && tracks && <Video tracks={tracks} users={users} myBool={myBool}/>}
            </Grid>
          </div>
        </Grid>
      </div>
      <div className="track">
        <Grid item style={{ height: "50px" }}>
          {ready && tracks && (
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
              toggleBool={toggleBool}
              roomId={roomId}
            />
          )}
        </Grid>
      </div>
    </div>
  );
}
