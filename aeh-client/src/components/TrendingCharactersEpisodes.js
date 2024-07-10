import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/TrendingCharactersEpisodes.scss";

Modal.setAppElement("#root");

const TrendingCharactersEpisodes = () => {
  const [topCharacters, setTopCharacters] = useState([]);
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchTopCharacters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/top/characters"
        );
        setTopCharacters(response.data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top characters:", error);
      }
    };

    const fetchRecentEpisodes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/watch/episodes"
        );
        setRecentEpisodes(response.data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching recent episodes:", error);
      }
    };

    fetchTopCharacters();
    fetchRecentEpisodes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="trending-characters-episodes-carousel">
      <div className="carousel-section">
        <h2>Top Trending Characters</h2>
        <Slider {...settings}>
          {topCharacters.map((character) => (
            <div
              key={character.mal_id}
              className="carousel-item"
              onClick={() => openModal(character)}
            >
              <img src={character.images.jpg.image_url} alt={character.name} />
              <div>{character.name}</div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="carousel-section">
        <h2>Recently Added Episodes</h2>
        <Slider {...settings}>
          {recentEpisodes.map((episode) => (
            <div
              key={episode.entry.mal_id}
              className="carousel-item"
              onClick={() => openModal(episode)}
            >
              <img
                src={episode.entry.images.jpg.image_url}
                alt={episode.entry.title}
              />
              <div>{episode.entry.title}</div>
              <div>Episode: {episode.episode}</div>
            </div>
          ))}
        </Slider>
      </div>

      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onRequestClose={closeModal}
          contentLabel="Item Details"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>{selectedItem.name || selectedItem.entry.title}</h2>
            <img
              src={
                selectedItem.images?.jpg.image_url ||
                selectedItem.entry.images.jpg.image_url
              }
              alt={selectedItem.name || selectedItem.entry.title}
            />
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TrendingCharactersEpisodes;
