import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditProfile.css";
import Background from "../../Images/colors.mp4";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8001/profile-data",
          {
            username: "profil",
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

  const handleInputChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Profil verilerini güncelleme isteği gönderin
      const response = await axios.put(
        "http://localhost:8001/update-profile",
        profileData,
        {
          withCredentials: true,
        }
      );
      // Güncellenen verileri state'e kaydedin
      setProfileData(response.data);
      setIsLoading(false);

      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmit = async () => {
    try {
      setIsLoading(true);

      if (!selectedFile) {
        console.error("No file selected.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      // add username to form data before the file
      formData.append("username", profileData.username);
      formData.append("profile", selectedFile);

      const response = await axios.post(
        "http://localhost:8001/upload-profile-image",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const filepath = response.data.filepath;
      setProfileData((prevState) => ({
        ...prevState,
        image: filepath,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="epprofile_container">
        <video src={Background} autoPlay muted loop />
        <div className="eptop_conteiner">
          <h2 className="epcenter_title">Details</h2>
          <p className="epshort_text">{profileData?.quote}</p>
        </div>
        <div className="epmid_conteiner">
          <div className="epmid_conteiner_child">
            <span className="eplittle_title"> About me</span>
            <p className="epp_font">
              <textarea
                className="epinput-field"
                id="about"
                name="about"
                value={profileData?.about}
                onChange={handleInputChange}
              />
            </p>
          </div>
          <div className="epmid_conteiner_child center_object">
            <img
              className="epcss_shadow"
              src={profileData?.image}
              alt="User Avatar"
            />
          </div>

          <div className="epmid_conteiner_child">
            {isLoading ? (
              "Loading..."
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="eplittle_title">
                    Name:
                  </label>
                  <br />
                  <input
                    type="text"
                    className="epinput-field"
                    id="name"
                    name="name"
                    value={profileData?.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="surname" className="eplittle_title">
                    Surname:
                  </label>
                  <br />
                  <input
                    type="text"
                    className="epinput-field"
                    id="surname"
                    name="surname"
                    value={profileData?.surname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="eplittle_title">
                    Username:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    className="epinput-field"
                    name="username"
                    value={profileData?.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eplittle_title">
                    E-mail:
                  </label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    className="epinput-field"
                    name="email"
                    value={profileData?.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eplittle_title">
                    Profile Picture:{" "}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="epinput-field"
                    name="profile"
                    onChange={handleFileUpload}
                  />{" "}
                  <button type="button" onClick={handleFileSubmit}>
                    Change Profile Picture
                  </button>
                </div>
                <div></div>
                <button type="submit">Update details</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;