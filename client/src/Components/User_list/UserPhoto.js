import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPhoto = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8001/speaking_room_user_photo",
          {
            username: username,
          }
        );
        const data = response.data;
        setProfileData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [username]);

  return (
    <div>
      <img src={`../../../${profileData?.image}`} alt="User Avatar"  />
    </div>
  );
};

export default UserPhoto;