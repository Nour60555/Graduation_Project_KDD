import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "/assets/images/Logo_Light2.png";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-title">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
          <span className="title">Kidney Scope</span>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/donation">Donation</Link>
        <Link to="/symptom-checker">Symptom Checker</Link>
        <Link to="/lifestyle-tips">Lifestyle Tips</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/news-events">News & Events</Link>
        <Link to="/research-development">Research & Development</Link>
      </nav>
    </header>
  );
}
