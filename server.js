require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

connectDB();

const app = express();

const corsOptions = {
  origin: "https://frontendofimage.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/* ✅ APPLY CORS GLOBALLY */
app.use(cors(corsOptions));

/* ✅ HANDLE PREFLIGHT WITHOUT WILDCARD */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());



/* ✅ HEALTH CHECK */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





