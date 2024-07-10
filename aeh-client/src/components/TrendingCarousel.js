import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/TrendingCarousel.scss";

Modal.setAppElement("#root");

const TrendingCarousel = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/top/anime");
        setTopAnime(response.data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top anime:", error);
      }
    };

    const fetchTopManga = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/top/manga");
        setTopManga(response.data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top manga:", error);
      }
    };

    fetchTopAnime();
    fetchTopManga();
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
    <div>
      <div className="trending-carousel">
        <h2>Top Trending Anime</h2>
        <Slider {...settings}>
          {topAnime.map((anime) => (
            <div
              key={anime.id}
              className="carousel-item"
              onClick={() => openModal(anime)}
            >
              <img
                src={anime.attributes.posterImage.large}
                alt={anime.attributes.canonicalTitle}
              />
              <div>{anime.attributes.canonicalTitle}</div>
              <div>Rating: {anime.attributes.averageRating}</div>
            </div>
          ))}
        </Slider>

        <h2>Top Trending Manga</h2>
        <Slider {...settings}>
          {topManga.map((manga) => (
            <div
              key={manga.id}
              className="carousel-item"
              onClick={() => openModal(manga)}
            >
              <img
                src={manga.attributes.posterImage.large}
                alt={manga.attributes.canonicalTitle}
              />
              <div>{manga.attributes.canonicalTitle}</div>
              <div>Rating: {manga.attributes.averageRating}</div>
            </div>
          ))}
        </Slider>

        {selectedItem && (
          <Modal
            isOpen={!!selectedItem}
            onRequestClose={closeModal}
            contentLabel="Item Details"
            className="modal"
            overlayClassName="overlay"
          >
            <div className="modal-content">
              <h2>{selectedItem.attributes.canonicalTitle}</h2>
              <img
                src={selectedItem.attributes.posterImage.large}
                alt={selectedItem.attributes.canonicalTitle}
              />
              <p>{selectedItem.attributes.synopsis}</p>
              <p>
                <strong>Rating:</strong> {selectedItem.attributes.averageRating}
              </p>
              <p>
                <strong>Episodes:</strong>{" "}
                {selectedItem.attributes.episodeCount}
              </p>
              <p>
                <strong>Status:</strong> {selectedItem.attributes.status}
              </p>
              {selectedItem.attributes.youtubeVideoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${selectedItem.attributes.youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </a>
              )}
              <button onClick={closeModal}>Close</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TrendingCarousel;
