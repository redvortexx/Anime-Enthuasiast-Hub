import React, { useState } from "react";
import "../styles/LoginRegister.scss";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Register() {
  const [inputs, setInputs] = useState({});
  const logo = "http://localhost:8080/images/logo.png";
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    setInputs({});
    const { username, email, password } = inputs;
    try {
      const inputs = await axios.post("/register", {
        username,
        email,
        password,
      });
      if (inputs.data.error) {
        toast.error(inputs.data.error);
      } else {
        setInputs({});
        toast.success("You have successfully registered an account!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="loginForm__title">Register</h1>
          <div className="loginForm__content">
            <div className="loginForm__box">
              <FaUser className="loginForm__icon" />
              <div className="loginForm__box-input">
                <input
                  type="text"
                  name="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  required
                  className="loginForm__input"
                  id="username"
                  placeholder=" "
                />
                <label htmlFor="username" className="loginForm__label">
                  Username
                </label>
              </div>
            </div>
            <div className="loginForm__box">
              <HiOutlineMail className="loginForm__icon" />
              <div className="loginForm__box-input">
                <input
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  required
                  className="loginForm__input"
                  id="email"
                  placeholder=" "
                />
                <label htmlFor="email" className="loginForm__label">
                  Email
                </label>
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
                  id="password"
                  placeholder=" "
                />
                <label htmlFor="password" className="loginForm__label">
                  Password
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="loginForm__submit">
            Register
          </button>
          <div className="loginForm__register-link">
            <p>
              Already a member? <a href="/login">Welcome Back!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
