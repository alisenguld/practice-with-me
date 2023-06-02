import React, { useState } from "react";
import "./Register.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (username.length < 4) {
      toast.error("Username must be at least 4 characters long");
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      toast.error("Username must contain only letters.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "The password must be at least 6 characters long and contain at least one special character (!@#$%^&*)"
      );
      return;
    }

    Axios.post("http://localhost:8001/register", {
      email: email,
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.message) {
          toast.error("Kayit basarisiz", {
            autoClose: 2000,
          });
        } else {
          toast.success(
            "Registration successful! You will be redirected to the login page"
          );
          setTimeout(() => {
            navigate("/loginform");
          }, 6000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred.");
      });
  };

  return (
    <div className="container">
      <div className="loginForm">
        <form>
          <h2>Register</h2>
          <label htmlFor="email">
            <strong>Email Address</strong>
          </label>
          <input
            className="textInput"
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your Email Address"
            required
          />
          <label htmlFor="username">
            <strong>Username</strong>
          </label>
          <input
            className="textInput"
            type="username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter your Username"
            required
          />
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            className="textInput"
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your Password"
            required
          />
          <input
            className="button"
            type="submit"
            onClick={register}
            value="Create an account"
          />
          <br />
          <br />
          Already have an account? <Link to="/loginform">Log in</Link>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;