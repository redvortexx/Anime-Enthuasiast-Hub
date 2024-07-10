exports.up = async function (knex) {
  const hasTrailerUrl = await knex.schema.hasColumn("anime", "trailer_url");
  const hasYoutubeId = await knex.schema.hasColumn("anime", "youtube_id");
  const hasSeason = await knex.schema.hasColumn("anime", "season");
  const hasGenresTable = await knex.schema.hasTable("genres");
  const hasAnimeGenresTable = await knex.schema.hasTable("anime_genres");

  await knex.schema.table("anime", function (table) {
    if (!hasTrailerUrl) {
      table.string("trailer_url", 255);
    }
    if (!hasYoutubeId) {
      table.string("youtube_id", 50);
    }
    if (!hasSeason) {
      table.string("season", 50);
    }
  });

  if (!hasGenresTable) {
    await knex.schema.createTable("genres", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
    });
  }

  if (!hasAnimeGenresTable) {
    await knex.schema.createTable("anime_genres", function (table) {
      table.integer("anime_id").unsigned().notNullable();
      table.integer("genre_id").unsigned().notNullable();
      table.foreign("anime_id").references("anime.id").onDelete("CASCADE");
      table.foreign("genre_id").references("genres.id").onDelete("CASCADE");
      table.primary(["anime_id", "genre_id"]);
    });
  }
};

exports.down = async function (knex) {
  const hasTrailerUrl = await knex.schema.hasColumn("anime", "trailer_url");
  const hasYoutubeId = await knex.schema.hasColumn("anime", "youtube_id");
  const hasSeason = await knex.schema.hasColumn("anime", "season");
  const hasGenresTable = await knex.schema.hasTable("genres");
  const hasAnimeGenresTable = await knex.schema.hasTable("anime_genres");

  await knex.schema.table("anime", function (table) {
    if (hasTrailerUrl) {
      table.dropColumn("trailer_url");
    }
    if (hasYoutubeId) {
      table.dropColumn("youtube_id");
    }
    if (hasSeason) {
      table.dropColumn("season");
    }
  });

  if (hasAnimeGenresTable) {
    await knex.schema.dropTableIfExists("anime_genres");
  }

  if (hasGenresTable) {
    await knex.schema.dropTableIfExists("genres");
  }
};
