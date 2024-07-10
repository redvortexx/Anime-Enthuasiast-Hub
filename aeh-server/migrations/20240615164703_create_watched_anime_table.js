/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("watched_anime", function (table) {
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.integer("anime_id").references("id").inTable("anime").notNullable();
    table.timestamp("watched_date");
    table.primary(["user_id", "anime_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("watched_anime");
};
