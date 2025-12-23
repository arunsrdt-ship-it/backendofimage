const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

const loginRateLimiter = require("../middleware/rateLimiter");
const concurrencyLimiter = require("../middleware/concurrencyLimiter");

// Register user (usually less strict)
router.post("/register", loginRateLimiter, concurrencyLimiter, register);


// Login user (STRICT)
router.post(
  "/login",
  loginRateLimiter,
  concurrencyLimiter,
  login
);

module.exports = router;
