const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const { authenticateToken, validateRequest } = require("../helpers/auth");

router.get("/forums", authenticateToken, async (req, res) => {
  try {
    const forums = await knex("forums")
      .leftJoin("threads", "forums.id", "threads.forum_id")
      .leftJoin("users", "forums.created_by", "users.id")
      .groupBy("forums.id", "users.username")
      .select(
        "forums.*",
        knex.raw("COUNT(threads.id) as total_threads"),
        "users.username as created_by_username"
      )
      .orderBy("forums.created_at", "asc");
    res.json(forums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/forums/:forumId", authenticateToken, async (req, res) => {
  try {
    const { forumId } = req.params;
    const forum = await knex("forums").where("id", forumId).first();
    res.json(forum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/forums/:forumId/threads", authenticateToken, async (req, res) => {
  try {
    const { forumId } = req.params;
    const threads = await knex("threads")
      .where("forum_id", forumId)
      .select("*");
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/threads/:threadId/posts", authenticateToken, async (req, res) => {
  try {
    const posts = await knex("posts")
      .leftJoin("users", "posts.created_by", "users.id")
      .select("posts.*", "users.username as created_by_username")
      .where("thread_id", req.params.threadId);

    for (let post of posts) {
      const comments = await knex("comments")
        .leftJoin("users", "comments.created_by", "users.id")
        .select("comments.*", "users.username as username")
        .where("post_id", post.id);
      post.comments = comments;
    }

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/posts/:postId/comments", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await knex("comments")
      .where("post_id", postId)
      .select("*");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/posts/:postId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await knex("posts").where("id", postId).first();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/forums",
  authenticateToken,
  validateRequest(["title", "category"]),
  async (req, res) => {
    try {
      const { title, category } = req.body;
      const created_by = req.user.id;
      const [forumId] = await knex("forums")
        .insert({ title, category, created_by })
        .returning("id");
      res.json({ id: forumId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.post(
  "/threads",
  authenticateToken,
  validateRequest(["forum_id", "title"]),
  async (req, res) => {
    try {
      const { forum_id, title } = req.body;
      const created_by = req.user.id;
      const [threadId] = await knex("threads")
        .insert({ forum_id, title, created_by })
        .returning("id");
      res.json({ threadId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.post(
  "/posts",
  authenticateToken,
  validateRequest(["thread_id", "content"]),
  async (req, res) => {
    try {
      const { thread_id, content } = req.body;
      const created_by = req.user.id;
      const [postId] = await knex("posts")
        .insert({ thread_id, content, created_by })
        .returning("id");
      res.json({ postId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.post(
  "/comments",
  authenticateToken,
  validateRequest(["post_id", "content"]),
  async (req, res) => {
    try {
      const { post_id, content } = req.body;
      const created_by = req.user.id;

      const [commentId] = await knex("comments")
        .insert({ post_id, content, created_by })
        .returning("id");

      const newComment = await knex("comments")
        .leftJoin("users", "comments.created_by", "users.id")
        .select("comments.*", "users.username as username")
        .where("comments.id", commentId.id)
        .first();

      res.json(newComment);
    } catch (err) {
      console.error("Error adding comment:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/threads/:threadId", authenticateToken, async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await knex("threads").where("id", threadId).first();
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/profile", authenticateToken, async (req, res) => {
  const { user_id, bio, watched_anime, top_anime, watched_manga, top_manga } =
    req.body;

  try {
    const existingProfile = await knex("profiles").where({ user_id }).first();
    if (existingProfile) {
      await knex("profiles").where({ user_id }).update({ bio });
    } else {
      await knex("profiles").insert({ user_id, bio });
    }

    await knex("user_anime").where({ user_id }).del();
    for (const anime_id of watched_anime) {
      await knex("user_anime").insert({ user_id, anime_id });
    }

    await knex("user_top_anime").where({ user_id }).del();
    for (const anime_id of top_anime) {
      await knex("user_top_anime").insert({ user_id, anime_id });
    }

    await knex("user_manga").where({ user_id }).del();
    for (const manga_id of watched_manga) {
      await knex("user_manga").insert({ user_id, manga_id });
    }

    await knex("user_top_manga").where({ user_id }).del();
    for (const manga_id of top_manga) {
      await knex("user_top_manga").insert({ user_id, manga_id });
    }

    res.json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Error saving profile" });
  }
});

router.get("/profile/:user_id", authenticateToken, async (req, res) => {
  const { user_id } = req.params;

  try {
    const profile = await knex("profiles").where({ user_id }).first();

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const watched_anime = await knex("user_anime")
      .where({ user_id })
      .pluck("anime_id");
    const top_anime = await knex("user_top_anime")
      .where({ user_id })
      .pluck("anime_id");
    const watched_manga = await knex("user_manga")
      .where({ user_id })
      .pluck("manga_id");
    const top_manga = await knex("user_top_manga")
      .where({ user_id })
      .pluck("manga_id");

    res.json({
      bio: profile.bio,
      watched_anime,
      top_anime,
      watched_manga,
      top_manga,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Error fetching profile" });
  }
});

module.exports = router;
