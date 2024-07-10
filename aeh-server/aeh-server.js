const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { PORT, BACKEND_URL } = process.env;
const app = express();
const knex = require("./db/knex");
const authRoutes = require("./routes/authRoutes");
const animeRoutes = require("./routes/animeRoutes");
const forumRoutes = require("./routes/forumRoutes");
const cookieParser = require("cookie-parser");

knex
  .raw("select 1+1 as result")
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(
  cors({
    credentials: true,
    origin: BACKEND_URL,
  })
);
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/api", animeRoutes);
app.use("/api", forumRoutes);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
