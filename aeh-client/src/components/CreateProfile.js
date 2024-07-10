import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { toast } from "react-hot-toast";
import "../styles/ProfileForm.scss";

const ProfileForm = () => {
  const { user } = useContext(UserContext);
  const [bio, setBio] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [selectedWatchedAnime, setSelectedWatchedAnime] = useState([]);
  const [selectedTopAnime, setSelectedTopAnime] = useState([]);
  const [selectedWatchedManga, setSelectedWatchedManga] = useState([]);
  const [selectedTopManga, setSelectedTopManga] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        console.log("User is not logged in or user.id is not available");
        return;
      }

      try {
        const [animeRes, mangaRes] = await Promise.all([
          axios.get("http://localhost:8080/api/anime"),
          axios.get("http://localhost:8080/api/manga"),
        ]);

        setAnimeList(animeRes.data);
        setMangaList(mangaRes.data);

        try {
          const profileRes = await axios.get(
            `http://localhost:8080/api/profile/${user.id}`
          );
          if (profileRes.data) {
            const { bio, watched_anime, top_anime, watched_manga, top_manga } =
              profileRes.data;

            setBio(bio);
            setSelectedWatchedAnime(watched_anime);
            setSelectedTopAnime(top_anime);
            setSelectedWatchedManga(watched_manga);
            setSelectedTopManga(top_manga);
            setIsEditing(false);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("Profile not found, setting up new profile.");
            setIsEditing(true);
          } else {
            throw error;
          }
        }
      } catch (error) {
        toast.error("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error("User is not logged in.");
      console.error("User is not logged in.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/profile", {
        user_id: user.id,
        bio,
        watched_anime: selectedWatchedAnime,
        top_anime: selectedTopAnime,
        watched_manga: selectedWatchedManga,
        top_manga: selectedTopManga,
      });
      toast.success("Profile created successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error creating profile");
      console.error("Error creating profile:", error);
    }
  };

  const handleSelectChange = (item, selectedItems, setSelectedItems, limit) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((id) => id !== item));
    } else {
      if (selectedItems.length < limit) {
        setSelectedItems([...selectedItems, item]);
      } else {
        toast.error(`You can only select up to ${limit} items.`);
      }
    }
  };

  if (!user) {
    console.log("User is null");
    return <div>Loading...</div>;
  }

  if (!isEditing) {
    return (
      <div className="profile-view-container">
        <div className="profile-header">
          <h1>{user.username}'s Profile</h1>
          <p>{bio}</p>
        </div>
        <div className="profile-section">
          <h2>Watched Anime</h2>
          <ul>
            {selectedWatchedAnime.map((animeId) => (
              <li key={animeId}>
                {animeList.find((anime) => anime.id === animeId)?.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-section">
          <h2>Top 5 Anime</h2>
          <ul>
            {selectedTopAnime.map((animeId) => (
              <li key={animeId}>
                {animeList.find((anime) => anime.id === animeId)?.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-section">
          <h2>Watched Manga</h2>
          <ul>
            {selectedWatchedManga.map((mangaId) => (
              <li key={mangaId}>
                {mangaList.find((manga) => manga.id === mangaId)?.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-section">
          <h2>Top 5 Manga</h2>
          <ul>
            {selectedTopManga.map((mangaId) => (
              <li key={mangaId}>
                {mangaList.find((manga) => manga.id === mangaId)?.title}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="edit-profile-button"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="profile-form-container">
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="watched-anime">Watched Anime:</label>
          <div className="select-box">
            {animeList.map((anime) => (
              <div
                key={anime.id}
                className={`select-item ${
                  selectedWatchedAnime.includes(anime.id) ? "selected" : ""
                }`}
                onClick={() =>
                  handleSelectChange(
                    anime.id,
                    selectedWatchedAnime,
                    setSelectedWatchedAnime,
                    animeList.length
                  )
                }
              >
                {anime.title}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="top-anime">Top 5 Anime:</label>
          <div className="select-box">
            {animeList.map((anime) => (
              <div
                key={anime.id}
                className={`select-item ${
                  selectedTopAnime.includes(anime.id) ? "selected" : ""
                }`}
                onClick={() =>
                  handleSelectChange(
                    anime.id,
                    selectedTopAnime,
                    setSelectedTopAnime,
                    5
                  )
                }
              >
                {anime.title}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="watched-manga">Watched Manga:</label>
          <div className="select-box">
            {mangaList.map((manga) => (
              <div
                key={manga.id}
                className={`select-item ${
                  selectedWatchedManga.includes(manga.id) ? "selected" : ""
                }`}
                onClick={() =>
                  handleSelectChange(
                    manga.id,
                    selectedWatchedManga,
                    setSelectedWatchedManga,
                    mangaList.length
                  )
                }
              >
                {manga.title}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="top-manga">Top 5 Manga:</label>
          <div className="select-box">
            {mangaList.map((manga) => (
              <div
                key={manga.id}
                className={`select-item ${
                  selectedTopManga.includes(manga.id) ? "selected" : ""
                }`}
                onClick={() =>
                  handleSelectChange(
                    manga.id,
                    selectedTopManga,
                    setSelectedTopManga,
                    5
                  )
                }
              >
                {manga.title}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="save-profile-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
