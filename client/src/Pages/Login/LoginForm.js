import React, { useState } from "react";
import "./LoginForm.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for valid email format
    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailFormat.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    Axios.post("http://localhost:8001/loginform", {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
          window.location.reload(false);
        } else if (res.data.Status === "EmailNotRegistered") {
          toast.error("E-mail is not registered.");
        } else if (res.data.Status === "WrongPassword") {
          toast.error("E-mail or password is incorrect");
        } else {
          alert(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              placeholder="Enter Email"
              name="email"
              autoComplete="off"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-submit-btn">
            Log in
          </button>
          <div className="form-bottom-links">
            Don't you have an account?{" "}
            <Link to="/register">Create Account</Link>
            <br />
            <br />
            <Link to="/forgotpassword">Forgot Your Password?</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
