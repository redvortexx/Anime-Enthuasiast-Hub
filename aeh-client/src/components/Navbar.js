import React, { useRef, useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.scss";
import { SearchContext } from "../context/searchContext";

function Navbar() {
  const logo = "http://localhost:8080/images/logo.png";
  const searchIcon = "http://localhost:8080/images/search.png";
  const navRef = useRef();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { handleSearchResults } = useContext(SearchContext);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown((prev) => !prev);
  };

  const closeProfileDropdown = () => {
    setProfileDropdown(false);
  };

  const handleMainMenuClick = () => {
    closeNavbar();
    closeProfileDropdown();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("hasShownAnimation");
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const handleLogoClick = () => {
    handleMainMenuClick();
    navigate("/");
  };

  const handleSearch = async () => {
    if (!query) return;

    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/anime/search`,
        { params: { query } }
      );
      handleSearchResults(data);
      navigate("/");
    } catch (error) {
      console.error("Error fetching search results:", error);
      handleSearchResults([]);
    }
  };

  return (
    <header className="navbar">
      <img
        src={logo}
        alt="logo"
        className="navbar__logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      />
      <nav className="navbar__list" ref={navRef}>
        <a href="/anime" onClick={handleMainMenuClick}>
          Anime
        </a>
        <a href="/manga" onClick={handleMainMenuClick}>
          Manga
        </a>
        <a href="/forums" onClick={handleMainMenuClick}>
          Forums
        </a>
        <div
          className={`navbar__profile ${profileDropdown ? "show" : ""}`}
          onClick={toggleProfileDropdown}
        >
          Profile
          <div
            className={`navbar__profile-dropdown ${
              profileDropdown ? "show" : ""
            }`}
          >
            <a href="/profile" onClick={handleMainMenuClick}>
              My Profile
            </a>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <button
          className="navbar__button navbar__close-button"
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>

      <div className="navbar__search-box">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search-icon"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>

      <button className="navbar__button" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
