import React from "react";
import { Link } from "react-router-dom";
import "./Banned.css";

export default function Banned() {
  return (
    <div className="banned_container">
      <Link to="/" className="banned_message">
        Kullanıcı banlı. Ana sayfaya dön
      </Link>
    </div>
  );
}