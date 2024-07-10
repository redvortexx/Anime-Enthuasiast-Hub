import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../styles/MangaGrid.scss";

const MangaGrid = () => {
  const [mangaList, setMangaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mangaPerPage] = useState(20);
  const [selectedManga, setSelectedManga] = useState(null);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await axios.get("/api/manga");
        const mangaData = response.data;

        const filteredManga = mangaData.filter((manga) => manga.image_url);

        const reversedManga = filteredManga.reverse();

        setMangaList(reversedManga);
      } catch (error) {
        console.error("Error fetching manga list:", error);
      }
    };

    fetchMangaList();
  }, []);

  const openModal = (manga) => {
    setSelectedManga(manga);
  };

  const closeModal = () => {
    setSelectedManga(null);
  };

  const indexOfLastManga = currentPage * mangaPerPage;
  const indexOfFirstManga = indexOfLastManga - mangaPerPage;
  const currentMangaList = mangaList.slice(indexOfFirstManga, indexOfLastManga);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="manga-grid-wrapper">
      <div className="manga-grid">
        {currentMangaList.map((manga) => (
          <div
            key={manga.id}
            className="manga-card"
            onClick={() => openModal(manga)}
          >
            <img
              src={manga.image_url}
              alt={manga.title}
              className="manga-image"
            />
            <h3 className="manga-title">{manga.title}</h3>
          </div>
        ))}
      </div>

      {selectedManga && (
        <Modal
          isOpen={!!selectedManga}
          onRequestClose={closeModal}
          contentLabel="Manga Details"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>{selectedManga.title}</h2>
            <img src={selectedManga.image_url} alt={selectedManga.title} />
            <p>{selectedManga.synopsis}</p>
            <p>
              <strong>Genres:</strong>{" "}
              {selectedManga.genres ? selectedManga.genres.join(", ") : "N/A"}
            </p>
            <p>
              <strong>Score:</strong> {selectedManga.score}
            </p>
            <p>
              <strong>Publishing Status:</strong> {selectedManga.status}
            </p>
            <p>
              <strong>Published From:</strong> {selectedManga.published_from}
            </p>
            <p>
              <strong>Published To:</strong> {selectedManga.published_to}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}

      <div className="pagination">
        {[...Array(Math.ceil(mangaList.length / mangaPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`page-button ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MangaGrid;
