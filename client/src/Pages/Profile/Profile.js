import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Footer from "../Footer/Footer";
import Background from "../../Images/colors.mp4";
import { Link, useLocation } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  axios.defaults.withCredentials = true;

  const location = useLocation();
  const path = location.pathname;
  const pathSegments = path.split("/");
  let username = pathSegments[2];

  if (username === undefined) {
    username = "profil";
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8001/profile-data",
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
  }, []);

  return (
    <div>
      <div className="profile_container">
        <video src={Background} autoPlay muted loop />
        <div className="top_conteiner">
          <h2 className="center_title">Details</h2>
          <p className="short_text">{profileData?.quote}</p>
        </div>
        <div className="mid_conteiner">
          <div className="mid_conteiner_child">
            <span className="about">About me</span>
            <p className="p_font">{profileData?.about}</p>
          </div>
          <div className="mid_conteiner_child center_object">
            <img
              className="css_shadow"
              src={`../../../${profileData?.image}`}
              alt="User Avatar"
            />
          </div>{" "}
          <div className="mid_conteiner_child">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <p className="alan">
                  <span className="little_title">Name:</span>
                  <br />
                  {profileData?.name}
                </p>
                <p className="alan">
                  <span className="little_title">Surname:</span>
                  <br />
                  {profileData?.surname}
                </p>
                <p className="alan">
                  <span className="little_title">Username:</span>
                  <br />
                  {profileData?.username}
                </p>
                <p className="alan">
                  <span className="little_title">E-mail:</span>
                  <br />
                  {profileData?.email}
                </p>
                <br />

                <p>
                  {username === "profil" && (
                    <>
                      Click <Link to="/EditProfile">here</Link> to update your
                      details
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
