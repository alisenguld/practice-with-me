import Rooms from "./Pages/Speaking_channels/Rooms";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import SpeakingRooms from "./Pages/SpeakingRooms/SpeakingRooms";
import LoginForm from "./Pages/Login/LoginForm";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Register from "./Pages/Register/Register";

import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const pathSegments = path.split("/");
  const language = pathSegments[2];
  const roomId = pathSegments[3];

  const isRoomPath = pathSegments[1] === "Room";

  return (
    <div className="App">
      {!isRoomPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/speakingrooms" element={<SpeakingRooms />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path={`/Room/${language}/${roomId}`}
          element={<Rooms roomId={roomId} />}
        />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
export default App;
