import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/AnimeGrid.scss";

Modal.setAppElement("#root");

const AnimeGrid = () => {
  const [seasonalAnime, setSeasonalAnime] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await axios.get("/api/anime");
        const animeData = response.data;

        const seasons = animeData.reduce((acc, anime) => {
          const season =
            anime.season && anime.release_year
              ? `${anime.season} ${anime.release_year}`
              : "Investigating!";
          if (!acc[season]) {
            acc[season] = [];
          }
          acc[season].push(anime);
          return acc;
        }, {});

        if (seasons["Investigating!"]) {
          seasons["Investigating!"] = seasons["Investigating!"].sort((a, b) => {
            if (a.image_url && !b.image_url) return -1;
            if (!a.image_url && b.image_url) return 1;
            return 0;
          });
        }

        setSeasonalAnime(seasons);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };

    fetchAnimeList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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

  const sortedSeasons = Object.keys(seasonalAnime).sort((a, b) => {
    if (a === "current") return -1;
    if (b === "current") return 1;
    if (a === "Investigating!") return 1;
    if (b === "Investigating!") return -1;

    const [seasonA, yearA] = a.split(" ");
    const [seasonB, yearB] = b.split(" ");
    const seasonsOrder = ["Winter", "Spring", "Summer", "Fall"];

    if (yearA === yearB) {
      return seasonsOrder.indexOf(seasonB) - seasonsOrder.indexOf(seasonA);
    }

    return yearB - yearA;
  });

  return (
    <div>
      {sortedSeasons.map((season) => (
        <div key={season} className="season-section">
          <h2 className="season-heading">{season}</h2>
          <Slider {...settings}>
            {seasonalAnime[season].map((anime) => (
              <div
                key={anime.id}
                className="anime-card"
                onClick={() => openModal(anime)}
              >
                <div className="anime-card-content">
                  <img
                    src={anime.image_url}
                    alt={anime.title}
                    className="anime-image"
                  />
                  <div className="anime-title">{anime.title}</div>
                  <div className="anime-rating">Rating: {anime.score}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}

      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onRequestClose={closeModal}
          contentLabel="Anime Details"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>{selectedItem.title}</h2>
            <img src={selectedItem.image_url} alt={selectedItem.title} />
            <p>{selectedItem.description}</p>
            <p>
              <strong>Score:</strong> {selectedItem.score}
            </p>
            <p>
              <strong>Episodes:</strong> {selectedItem.episodes}
            </p>
            <p>
              <strong>Status:</strong> {selectedItem.status}
            </p>
            {selectedItem.youtube_id && (
              <a
                href={`https://www.youtube.com/watch?v=${selectedItem.youtube_id}`}
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
  );
};

export default AnimeGrid;
