import React from "react";
import "../styles/SearchResultCard.scss";

const SearchResultCard = ({ anime, openModal }) => {
  return (
    <div className="search-result-card" onClick={() => openModal(anime)}>
      <img src={anime.image_url} alt={anime.title} className="anime-image" />
      <h3 className="anime-title">{anime.title}</h3>
    </div>
  );
};

export default SearchResultCard;
