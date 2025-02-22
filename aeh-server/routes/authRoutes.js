const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  forgotPasswordUser,
  getProfile,
  logoutUser,
} = require("../controllers/authControllers");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordUser);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);

module.exports = router;
