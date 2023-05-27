import { useState } from "react";
import VideoCall from "./VideoCall.js";

export default function Rooms(props) {
  const [inCall, setInCall] = useState(true);

    return (
      <div>
          <VideoCall Id={props} setInCall={setInCall}/>
      </div>
    );
  
}
