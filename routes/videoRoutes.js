const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");
const auth = require("../middleware/authMiddleware");
const {
  uploadVideo,
  getVideos,
  deleteVideo,
} = require("../controllers/videoController");

/* ✅ Correct Cloudinary Video Storage */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "photo-safe-videos",
    resource_type: "video",   // 🔥 MUST be here
    public_id: `video_${Date.now()}`,
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

/* ROUTES */
router.post("/upload", auth, upload.single("video"), uploadVideo);
router.get("/", auth, getVideos);
router.delete("/:id", auth, deleteVideo);

module.exports = router;
