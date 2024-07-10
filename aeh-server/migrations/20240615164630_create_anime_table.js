/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("anime", function (table) {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.string("genre", 50);
    table.integer("release_year");
    table.text("description");
    table.string("image_url", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("anime");
};
