/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("comments").del();
  await knex("posts").del();
  await knex("threads").del();
  await knex("forums").del();
  await knex("users").del();

  await knex("users").insert([
    {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      password_hash: "adminhashedpassword",
    },
    {
      id: 2,
      username: "user1",
      email: "user1@example.com",
      password_hash: "user1hashedpassword",
    },
  ]);

  await knex("forums").insert([
    { id: 1, title: "General Discussion", category: "General", created_by: 1 },
    { id: 2, title: "Anime Talk", category: "Anime", created_by: 1 },
  ]);

  await knex("threads").insert([
    {
      id: 1,
      forum_id: 1,
      title: "Welcome to General Discussion",
      created_by: 1,
    },
    { id: 2, forum_id: 2, title: "Favorite Anime?", created_by: 1 },
  ]);

  await knex("posts").insert([
    {
      id: 1,
      thread_id: 1,
      content: "This is the first post in General Discussion!",
      created_by: 1,
    },
    {
      id: 2,
      thread_id: 2,
      content: "My favorite anime is Attack on Titan!",
      created_by: 1,
    },
  ]);

  await knex("comments").insert([
    { id: 1, post_id: 1, content: "Thanks for the welcome!", created_by: 2 },
    { id: 2, post_id: 2, content: "Mine too!", created_by: 2 },
  ]);
};
