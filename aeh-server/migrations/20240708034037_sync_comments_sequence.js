/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(
    `SELECT setval('comments_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) + 1 FROM comments), 1))`
  );
};

exports.down = function (knex) {
  return Promise.resolve();
};
