/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("anime", function (table) {
      table.text("synopsis");
      table.string("type", 50);
      table.integer("episodes");
      table.date("start_date");
      table.date("end_date");
      table.float("score");
      table.timestamps(true, true);
    })
    .createTable("genres", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable().unique();
    })
    .createTable("anime_genres", function (table) {
      table.increments("id").primary();
      table.integer("anime_id").unsigned().notNullable();
      table.integer("genre_id").unsigned().notNullable();
      table.foreign("anime_id").references("id").inTable("anime");
      table.foreign("genre_id").references("id").inTable("genres");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("anime_genres")
    .dropTable("genres")
    .alterTable("anime", function (table) {
      table.dropColumn("synopsis");
      table.dropColumn("type");
      table.dropColumn("episodes");
      table.dropColumn("start_date");
      table.dropColumn("end_date");
      table.dropColumn("score");
      table.dropTimestamps();
    });
};
