import React, { useState } from "react";
import "../styles/LoginRegister.scss";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function ForgotPassword() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email } = inputs;
    try {
      const response = await axios.post("/forgot-password", {
        username,
        email,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("A password reset link was sent to your email");
        setTimeout(() => {
          navigate("/login");
        }, 15000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
    setInputs({});
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
        <form onSubmit={handleSubmit} className="loginForm">
          <h1 className="loginForm__title">Let's reset your password!</h1>
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
              <HiOutlineMail className="loginForm__icon" />
              <div className="loginForm__box-input">
                <input
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  required
                  className="loginForm__input"
                  placeholder=" "
                />
                <label className="loginForm__label">Email</label>
              </div>
            </div>
          </div>
          <button type="submit" className="loginForm__submit">
            Reset Password
          </button>
          <div className="loginForm__register-link">
            <p>
              Remember your password? <a href="/login">Login!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
