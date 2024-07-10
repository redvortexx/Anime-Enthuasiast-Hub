/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("forums", function (table) {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.string("category", 50);
    table.integer("created_by").references("id").inTable("users").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("forums");
};
