import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./ForgotPassword.css";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../Footer/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const emailValidate = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValidate(email)) {
      return toast.error("Please enter a valid email address.");
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/forgot-password",
        { email }
      );
      console.log(response.data); 
      toast.success("Your new password has been sent to your e-mail address", {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error.response.data); 
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label htmlFor="email" className="forgot-password-label">
          E-mail address:
        </label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgot-password-input"
        />
        <br />
        <br />
        <button type="submit" className="forgot-password-button">
          Reset password
        </button>
      </form>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default ForgotPassword;