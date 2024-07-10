import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { UserContext } from "../context/userContext";

export default function Login() {
  const logo = "http://localhost:8080/images/logo.png";
  const [inputs, setInputs] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = inputs;
    try {
      const response = await axios.post("/login", { username, password });
      const { data } = response;

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("You have successfully logged in!");
        updateUser(data.user, data.token);
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="loginRegisterPage">
      <div className="container">
        <div className="bubbles">
          <span style={{ "--i": 11 }}></span>
          <span style={{ "--i": 12 }}></span>
          <span style={{ "--i": 24 }}></span>
          <span style={{ "--i": 10 }}></span>
          <span style={{ "--i": 14 }}></span>
          <span style={{ "--i": 23 }}></span>
          <span style={{ "--i": 18 }}></span>
          <span style={{ "--i": 16 }}></span>
          <span style={{ "--i": 19 }}></span>
          <span style={{ "--i": 20 }}></span>
          <span style={{ "--i": 22 }}></span>
          <span style={{ "--i": 25 }}></span>
          <span style={{ "--i": 18 }}></span>
          <span style={{ "--i": 21 }}></span>
          <span style={{ "--i": 15 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 26 }}></span>
          <span style={{ "--i": 17 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 28 }}></span>
          <span style={{ "--i": 11 }}></span>
          <span style={{ "--i": 12 }}></span>
          <span style={{ "--i": 24 }}></span>
          <span style={{ "--i": 10 }}></span>
          <span style={{ "--i": 14 }}></span>
          <span style={{ "--i": 23 }}></span>
          <span style={{ "--i": 18 }}></span>
          <span style={{ "--i": 16 }}></span>
          <span style={{ "--i": 19 }}></span>
          <span style={{ "--i": 20 }}></span>
          <span style={{ "--i": 22 }}></span>
          <span style={{ "--i": 25 }}></span>
          <span style={{ "--i": 18 }}></span>
          <span style={{ "--i": 21 }}></span>
          <span style={{ "--i": 15 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 26 }}></span>
          <span style={{ "--i": 17 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 28 }}></span>
          <span style={{ "--i": 21 }}></span>
          <span style={{ "--i": 15 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 26 }}></span>
          <span style={{ "--i": 17 }}></span>
          <span style={{ "--i": 13 }}></span>
          <span style={{ "--i": 28 }}></span>
        </div>
      </div>
      <div className="loginForm__wrapper">
        <img src={logo} alt="logo" className="loginForm__logo" />
        <h2>A community for anime lovers!</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <h1 className="loginForm__title">Login</h1>
          <div className="loginForm__content">
            <div className="loginForm__box">
              <FaUser className="loginForm__icon" />
              <div className="loginForm__box-input">
                <input
                  type="text"
                  name="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  className="loginForm__input"
                  placeholder=" "
                />
                <label className="loginForm__label">Username</label>
              </div>
            </div>
            <div className="loginForm__box">
              <FaLock className="loginForm__icon" />
              <div className="loginForm__box-input">
                <input
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  required
                  className="loginForm__input"
                  placeholder=" "
                />
                <label className="loginForm__label">Password</label>
              </div>
            </div>
          </div>
          <div className="loginForm__check">
            <div className="loginForm__check-group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMe}
                className="loginForm__check-input"
              />
              <label className="loginForm__check-label">Remember me</label>
            </div>
            <a href="/forgot-password" className="loginForm__forgot">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="loginForm__submit">
            Login
          </button>
          <div className="loginForm__register-link">
            <p>
              New to Anime-Enthusiast Hub?{" "}
              <a href="/register">Register Here!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
