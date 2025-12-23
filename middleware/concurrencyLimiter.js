let activeRequests = 0;
const MAX_CONCURRENT = 20;

module.exports = (req, res, next) => {
  if (activeRequests >= MAX_CONCURRENT) {
    return res.status(503).json({
      msg: "Server busy, please try again shortly",
    });
  }

  activeRequests++;

  res.on("finish", () => {
    activeRequests--;
  });

  next();
};
