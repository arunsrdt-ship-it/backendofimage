const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");
const auth = require("../middleware/authMiddleware");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/imageController");

//  Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "photo-safe",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", auth, upload.single("image"), uploadImage);
router.get("/", auth, getImages);
router.delete("/:id", auth, deleteImage);

module.exports = router;
