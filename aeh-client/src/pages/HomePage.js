import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
import "../styles/HomePage.scss";
import TrendingCarousel from "../components/TrendingCarousel";
import WelcomeAnimation from "../components/WelcomeAnimation";
import SearchComponent from "../components/SearchComponent";
import Navbar from "../components/Navbar";

function HomePage() {
  const { user } = useContext(UserContext);
  const { searchResults, isSearching, closeSearchResults } =
    useContext(SearchContext);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (user) {
      const hasShownAnimation = localStorage.getItem("hasShownAnimation");
      if (!hasShownAnimation) {
        setShowAnimation(true);
        localStorage.setItem("hasShownAnimation", "true");
      }
    }
  }, [user]);

  const handleAnimationEnd = () => {
    setShowAnimation(false);
  };

  return (
    <div className="homepage-wrapper">
      <Navbar />
      {showAnimation ? (
        <WelcomeAnimation
          user={user.username}
          onAnimationEnd={handleAnimationEnd}
        />
      ) : (
        <>
          {!!user}
          {isSearching ? (
            <>
              <button onClick={closeSearchResults}>Close Search Results</button>
              <SearchComponent results={searchResults} />
            </>
          ) : (
            <TrendingCarousel />
          )}
          {isSearching && searchResults.length === 0 && <p>No results found</p>}
        </>
      )}
    </div>
  );
}

export default HomePage;
