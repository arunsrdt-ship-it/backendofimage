const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,             // 5 login attempts per IP
  message: {
    msg: "Too many login attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginRateLimiter;
