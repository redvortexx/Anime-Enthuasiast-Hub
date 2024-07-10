const express = require("express");
const axios = require("axios");
const router = express.Router();
const knex = require("../db/knex");

router.get("/top/anime", async (req, res) => {
  try {
    const response = await axios.get(
      "https://kitsu.io/api/edge/trending/anime"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top anime" });
  }
});

router.get("/top/manga", async (req, res) => {
  try {
    const response = await axios.get(
      "https://kitsu.io/api/edge/trending/manga"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top manga" });
  }
});

router.get("/anime", async (req, res) => {
  try {
    const animeList = await knex("anime").select("*");
    res.json(animeList);
  } catch (error) {
    console.error("Error fetching anime list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/anime/images", async (req, res) => {
  try {
    const animeImages = await knex("anime")
      .select("image_url")
      .whereNotNull("image_url");
    res.json(animeImages);
  } catch (error) {
    console.error("Error fetching anime images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/manga", async (req, res) => {
  try {
    const mangaList = await knex("manga").select("*").orderBy("id", "desc");
    res.json(mangaList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/anime/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const results = await knex("anime")
      .where("title", "ilike", `%${query}%`)
      .orWhere("description", "ilike", `%${query}%`)
      .select("id", "title", "image_url", "description", "release_year");
    res.json(results);
  } catch (err) {
    console.error("Error searching anime:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/top/characters", async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/characters");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top characters" });
  }
});

router.get("/watch/episodes", async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/watch/episodes");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recent episodes" });
  }
});
module.exports = router;
