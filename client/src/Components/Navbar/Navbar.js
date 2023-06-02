import { useEffect, useState } from "react";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../Images/Logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8001").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setUsername(res.data.username);
      } else {
        setMessage(res.data.Message);
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8001/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.href = "/"; // Anasayfaya yönlendirir
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Practice With Me" />
          </Link>
        </div>
        <ul className="links">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/speakingrooms">Speaking Rooms</CustomLink>
          <CustomLink to="/about">About</CustomLink>
          {auth ? (
            <div className="logout">
              <ul>
                <li>
                  <Link to="/profile" className="profile_btn">
                    <AccountCircleIcon />
                    &nbsp;{username}
                  </Link>
                  <ul>
                    <li>
                      <button onClick={handleLogout} className="logout_btn">
                        <LogoutIcon />
                        &nbsp;Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <CustomLink to="/loginform" className="profile_btn">
                <AccountCircleIcon /> &nbsp;Login
              </CustomLink>
            </div>
          )}
        </ul>
        <div
          className="toggle_btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <MenuIcon />
        </div>
      </div>

      <div className={dropdownOpen ? "dropdown_menu open" : "dropdown_menu"}>
        {auth ? (
          <ul>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/speakingrooms">Speaking Rooms</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <li>
              <Link to="/profile" className="profile_btn">
                <AccountCircleIcon />
                &nbsp;{username}
              </Link>
              <button onClick={handleLogout} className="logout_btn_drop">
                <LogoutIcon />
                &nbsp;
              </button>
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <CustomLink to="/">Home</CustomLink>
              <CustomLink to="/speakingrooms">Speaking Rooms</CustomLink>
              <CustomLink to="/about">About</CustomLink>
              <CustomLink to="/loginform" className="profile_btn">
                <AccountCircleIcon /> &nbsp;Login
              </CustomLink>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;