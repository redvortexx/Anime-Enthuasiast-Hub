import React, { useState } from "react";
import "../styles/SearchComponent.scss";
import SearchResultCard from "./SearchResultCard";
import Modal from "react-modal";

const SearchComponent = ({ results }) => {
  const [selectedAnime, setSelectedAnime] = useState(null);

  const openModal = (anime) => {
    setSelectedAnime(anime);
  };

  const closeModal = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="search-component">
      <div className="search-results">
        {results.map((anime) => (
          <SearchResultCard
            key={anime.id}
            anime={anime}
            openModal={openModal}
          />
        ))}
      </div>

      {selectedAnime && (
        <Modal
          isOpen={!!selectedAnime}
          onRequestClose={closeModal}
          contentLabel="Anime Details"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>{selectedAnime.title}</h2>
            <img src={selectedAnime.image_url} alt={selectedAnime.title} />
            <p>{selectedAnime.description}</p>
            <p>
              <strong>Genres:</strong>{" "}
              {selectedAnime.genres ? selectedAnime.genres.join(", ") : "N/A"}
            </p>
            <p>
              <strong>Release Date:</strong> {selectedAnime.releaseDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedAnime.status}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SearchComponent;
