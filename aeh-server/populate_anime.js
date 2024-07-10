const axios = require("axios");
const knex = require("knex")(require("./knexfile").development);

const fetchAnimeData = async (year, season) => {
  const url = `https://api.jikan.moe/v4/seasons/${year}/${season}`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for ${year} ${season}:`, error);
    return [];
  }
};

const fetchCurrentSeasonAnime = async () => {
  const url = `https://api.jikan.moe/v4/seasons/now`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data for current season:", error);
    return [];
  }
};

const fetchAnimeDataANN = async () => {
  const url = `https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=400`;
  try {
    const response = await axios.get(url);
    const result = await xml2js.parseStringPromise(response.data);
    return result.report.item;
  } catch (error) {
    console.error("Error fetching anime data from ANN:", error);
    return [];
  }
};

const fetchAnimeDetailsANN = async (id) => {
  const url = `https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=${id}`;
  try {
    const response = await axios.get(url);
    const result = await xml2js.parseStringPromise(response.data);
    return result.ann.anime[0];
  } catch (error) {
    console.error(
      `Error fetching detailed info for anime ID ${id} from ANN:`,
      error
    );
    return null;
  }
};

const fetchMangaDataJikan = async () => {
  const url = `https://api.jikan.moe/v4/top/manga`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching manga data from Jikan:", error);
    return [];
  }
};

const storeAnimeData = async (animeList, season, year) => {
  for (const anime of animeList) {
    const formattedAnime = {
      title: anime.title.replace(/[{}]/g, ""),
      type: anime.type,
      release_year: year || anime.year,
      synopsis: anime.synopsis || "",
      image_url: anime.images?.jpg.image_url || "",
      episodes: anime.episodes,
      start_date: anime.aired?.from,
      end_date: anime.aired?.to,
      score: anime.score,
      trailer_url: anime.trailer?.url,
      youtube_id: anime.trailer?.youtube_id,
      season: season,
    };

    try {
      const existingAnime = await knex("anime")
        .where({
          title: formattedAnime.title,
          type: formattedAnime.type,
          release_year: formattedAnime.release_year,
          synopsis: formattedAnime.synopsis,
        })
        .first();

      if (!existingAnime) {
        await knex("anime").insert(formattedAnime).returning("id");
        console.log(`Anime ${formattedAnime.title} stored successfully`);
      } else {
        console.log(`Anime ${formattedAnime.title} already exists. Skipping.`);
      }
    } catch (error) {
      console.error("Error storing data in the database:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

const storeMangaData = async (mangaList) => {
  for (const manga of mangaList) {
    const formattedManga = {
      title: manga.title,
      type: manga.type,
      chapters: manga.chapters,
      synopsis: manga.synopsis || "",
      image_url: manga.images?.jpg.image_url || "",
    };

    try {
      const existingManga = await knex("manga")
        .where({
          title: formattedManga.title,
          type: formattedManga.type,
          synopsis: formattedManga.synopsis,
        })
        .first();

      if (!existingManga) {
        await knex("manga").insert(formattedManga).returning("id");
        console.log(`Manga ${formattedManga.title} stored successfully`);
      } else {
        console.log(`Manga ${formattedManga.title} already exists. Skipping.`);
      }
    } catch (error) {
      console.error("Error storing data in the database:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

const storeAnimeDataANN = async (animeList) => {
  for (const anime of animeList) {
    const details = await fetchAnimeDetailsANN(anime.id);
    if (!details) continue;

    const plotSummary = details.info.find((info) =>
      info._?.includes("Plot Summary")
    );

    const formattedAnime = {
      title:
        typeof anime.name === "string" ? anime.name.replace(/[{}]/g, "") : "",
      type: anime.type,
      release_year: new Date(anime.vintage).getFullYear(),
      synopsis: plotSummary ? plotSummary._ : "",
      image_url:
        details.info.find((info) => info.$.type === "Picture")?.$.src || "",
      episodes: details.episode?.length || 0,
      start_date: details.vintage?.[0]?.$.value,
      end_date: details.vintage?.[1]?.$.value,
      score: details.rating?.[0]?.$.value,
      season: null,
    };

    try {
      const existingAnime = await knex("anime")
        .where({
          title: formattedAnime.title,
          type: formattedAnime.type,
          release_year: formattedAnime.release_year,
          synopsis: formattedAnime.synopsis,
        })
        .first();

      if (!existingAnime) {
        await knex("anime").insert(formattedAnime).returning("id");
        console.log(`Anime ${formattedAnime.title} stored successfully`);
      } else {
        console.log(`Anime ${formattedAnime.title} already exists. Skipping.`);
      }
    } catch (error) {
      console.error("Error storing data in the database:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

const main = async () => {
  const seasons = ["winter", "spring", "summer", "fall"];
  const years = [2022, 2023, 2024];

  for (const year of years) {
    for (const season of seasons) {
      const animeData = await fetchAnimeData(year, season);
      await storeAnimeData(animeData, season, year);
    }
  }

  const currentSeasonAnimeData = await fetchCurrentSeasonAnime();
  await storeAnimeData(currentSeasonAnimeData, "current");

  const animeDataANN = await fetchAnimeDataANN();
  await storeAnimeDataANN(animeDataANN);

  const mangaDataJikan = await fetchMangaDataJikan();
  await storeMangaData(mangaDataJikan);

  console.log("Database populated successfully");
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error populating database:", err);
    process.exit(1);
  });
