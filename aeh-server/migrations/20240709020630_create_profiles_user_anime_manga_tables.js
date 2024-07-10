/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("profiles", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.text("bio").nullable();
      table.timestamps(true, true);
    })
    .createTable("user_anime", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.integer("anime_id").unsigned().notNullable();
      table.foreign("anime_id").references("anime.id").onDelete("CASCADE");
    })
    .createTable("user_top_anime", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.integer("anime_id").unsigned().notNullable();
      table.foreign("anime_id").references("anime.id").onDelete("CASCADE");
    })
    .createTable("user_manga", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.integer("manga_id").unsigned().notNullable();
      table.foreign("manga_id").references("manga.id").onDelete("CASCADE");
    })
    .createTable("user_top_manga", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.integer("manga_id").unsigned().notNullable();
      table.foreign("manga_id").references("manga.id").onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user_top_manga")
    .dropTableIfExists("user_manga")
    .dropTableIfExists("user_top_anime")
    .dropTableIfExists("user_anime")
    .dropTableIfExists("profiles");
};
