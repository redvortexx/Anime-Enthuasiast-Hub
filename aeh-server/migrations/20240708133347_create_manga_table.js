/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("manga", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("type");
    table.integer("chapters");
    table.integer("volumes");
    table.string("status");
    table.boolean("publishing");
    table.date("published_from");
    table.date("published_to");
    table.text("synopsis");
    table.string("image_url");
    table.float("score");
    table.integer("scored_by");
    table.integer("rank");
    table.integer("popularity");
    table.integer("members");
    table.integer("favorites");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("manga");
};
