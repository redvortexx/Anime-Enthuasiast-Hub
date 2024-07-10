/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table
      .integer("thread_id")
      .references("id")
      .inTable("threads")
      .notNullable();
    table.text("content").notNullable();
    table.integer("created_by").references("id").inTable("users").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
