const knex = require("../db/knex"); // Assuming you have set up knex in this file
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || username.length < 5) {
      return res.json({
        error: "Username is required and should be at least 5 characters long",
      });
    }
    if (!password || password.length < 7) {
      return res.json({
        error: "Password is required and should be at least 7 characters long",
      });
    }

    const emailExists = await knex("users").where({ email }).first();
    if (emailExists) {
      return res.json({
        error: "Email is already taken",
      });
    }

    const usernameExists = await knex("users").where({ username }).first();
    if (usernameExists) {
      return res.json({
        error: "Username is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    const [user] = await knex("users")
      .insert({
        username,
        email,
        password_hash: hashedPassword,
      })
      .returning(["id", "username", "email"]);

    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const forgotPasswordUser = async (req, res) => {};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex("users").where({ username }).first();
    if (!user) {
      return res.status(400).json({ error: "No user found!" });
    }

    const match = await comparePassword(password, user.password_hash);
    if (match) {
      const token = jwt.sign(
        { email: user.email, id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("Token", token, { httpOnly: true }).json({ user, token });
    } else {
      return res.status(400).json({ error: "Passwords do not match!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const token = req.cookies.Token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      console.error("Error verifying JWT:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const user = await knex("users").where({ id: decoded.id }).first();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ id: user.id, username: user.username, email: user.email });
    } catch (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("Token").json({ message: "Logout successful" });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  forgotPasswordUser,
  getProfile,
  logoutUser,
};
