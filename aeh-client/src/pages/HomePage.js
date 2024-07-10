import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
import axios from "axios";
import "../styles/HomePage.scss";
import TrendingCarousel from "../components/TrendingCarousel";
import WelcomeAnimation from "../components/WelcomeAnimation";
import SearchComponent from "../components/SearchComponent";
import Navbar from "../components/Navbar";
import TrendingCharactersEpisodes from "../components/TrendingCharactersEpisodes";

function HomePage() {
  const { user } = useContext(UserContext);
  const { searchResults, isSearching, closeSearchResults } =
    useContext(SearchContext);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animeImages, setAnimeImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (user) {
      const hasShownAnimation = localStorage.getItem("hasShownAnimation");
      if (!hasShownAnimation) {
        setShowAnimation(true);
        localStorage.setItem("hasShownAnimation", "true");
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchAnimeImages = async () => {
      try {
        const response = await axios.get("/api/anime/images");
        setAnimeImages(response.data.map((anime) => anime.image_url));
      } catch (error) {
        console.error("Error fetching anime images:", error);
      }
    };
    fetchAnimeImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % animeImages.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [animeImages]);

  const handleAnimationEnd = () => {
    setShowAnimation(false);
  };

  return (
    <div className="homepage-container">
      <div
        className={`homepage-wrapper ${isSearching ? "blurred" : ""}`}
        style={{ backgroundImage: `url(${animeImages[currentImageIndex]})` }}
      >
        <Navbar />
        {showAnimation ? (
          <WelcomeAnimation
            user={user.username}
            onAnimationEnd={handleAnimationEnd}
          />
        ) : (
          <>
            <WelcomeBanner />
            <div className="content">
              <div className="left-content">
                {!!user}
                {isSearching ? (
                  <>
                    <button onClick={closeSearchResults}>
                      Close Search Results
                    </button>
                    <SearchComponent results={searchResults} />
                  </>
                ) : (
                  <TrendingCarousel />
                )}
                {isSearching && searchResults.length === 0 && (
                  <p>No results found</p>
                )}
              </div>
              <div className="right-content">
                {isSearching ? null : <TrendingCharactersEpisodes />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const WelcomeBanner = () => {
  return (
    <div className="welcome-banner-content">
      <h1>Welcome to Anime Enthusiast Hub</h1>
      <p>Discover, connect, and share your love for anime and manga.</p>
    </div>
  );
};

export default HomePage;
