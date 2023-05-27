import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks, myBool } = props;
  const [gridSpacing, setGridSpacing] = useState(12);
  useEffect(() => {
    if (myBool) {
      setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 3));
    } else {
      setGridSpacing(Math.max(Math.floor(12 / (users.length)), 3));
    }
  }, [users, tracks, myBool]); // User veya tracks değiştiği zaman devreye girecek.

  return (
    <Grid container style={{ width: "100%" }}>
      {myBool && (
        <Grid item xs={gridSpacing} style={{ padding: "10px" }}>
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
          
            style={{
              aspectRatio: "1 / 1",
              height: "100%",
              maxHeight: "700px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          />
        </Grid>
      )}
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing} style={{ padding: "10px" }}>
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{
                    aspectRatio: "1 / 1",
                    height: "100%",
                    maxHeight: "700px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}
