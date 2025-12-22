require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

connectDB();

const app = express();

/* 🔐 CORS CONFIG */
app.use(
  cors({
    origin: "https://frontendofimage.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ✅ HEALTH CHECK ROUTE (NO AUTH) */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

/* 🔐 PROTECTED ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
