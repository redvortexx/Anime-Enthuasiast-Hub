/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("anime_genres").del();
  await knex("genres").del();
  await knex("anime").del();

  const genres = await knex("genres")
    .insert([{ name: "Action" }, { name: "Adventure" }, { name: "Comedy" }])
    .returning("id");

  const anime = await knex("anime")
    .insert([
      {
        title: "Naruto",
        synopsis:
          "A young ninja who seeks recognition from his peers and dreams of becoming the Hokage.",
        type: "TV",
        episodes: 220,
        start_date: "2002-10-03",
        end_date: "2007-02-08",
        score: 7.92,
        image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      },
      {
        title: "One Piece",
        synopsis:
          "Monkey D. Luffy, a boy whose body gained the properties of rubber after unintentionally eating a Devil Fruit.",
        type: "TV",
        episodes: 1000,
        start_date: "1999-10-20",
        score: 8.56,
        image_url: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      },
      {
        title: "Attack on Titan",
        synopsis:
          "Humans are nearly exterminated by giant creatures called Titans.",
        type: "TV",
        episodes: 75,
        start_date: "2013-04-07",
        end_date: "2021-03-29",
        score: 8.53,
        image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      },
    ])
    .returning("id");

  const animeGenres = [
    { anime_id: anime[0].id, genre_id: genres[0].id },
    { anime_id: anime[0].id, genre_id: genres[1].id },
    { anime_id: anime[1].id, genre_id: genres[0].id },
    { anime_id: anime[2].id, genre_id: genres[0].id },
    { anime_id: anime[2].id, genre_id: genres[2].id },
  ];

  await knex("anime_genres").insert(animeGenres);
};
