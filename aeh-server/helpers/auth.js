const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(`Error hashing password: ${err.message}`);
  }
};

const comparePassword = async (password, hashed) => {
  try {
    if (!password || !hashed) {
      throw new Error("Both password and hashed password are required");
    }
    const match = await bcrypt.compare(password, hashed);
    return match;
  } catch (err) {
    throw new Error(`Error comparing passwords: ${err.message}`);
  }
};

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

const validateRequest = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (
        !req.body[field] ||
        (typeof req.body[field] !== "string" &&
          typeof req.body[field] !== "number") ||
        req.body[field].toString().trim() === ""
      ) {
        return res
          .status(400)
          .json({
            error: `${field} is required and must be a non-empty string`,
          });
      }
    }
    next();
  };
};

module.exports = validateRequest;

module.exports = validateRequest;

module.exports = {
  hashPassword,
  comparePassword,
  authenticateToken,
  validateRequest,
};
