const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/authMiddleware");
const {
  uploadImage,
  getImages,
  deleteImage
} = require("../controllers/imageController");

const upload = multer({ dest: "uploads/" });

// Upload image
router.post("/upload", auth, upload.single("image"), uploadImage);

// Get user images
router.get("/", auth, getImages);

// Delete image
router.delete("/:id", auth, deleteImage);

module.exports = router;
