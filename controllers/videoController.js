const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");

/* 📤 Upload Video */
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No video uploaded" });
    }

    const video = await Video.create({
      user: req.user,
      videoUrl: req.file.path,        // Cloudinary URL
      publicId: req.file.filename,    // Cloudinary public_id
      duration: req.file.duration,    // optional
    });

    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Video upload failed" });
  }
};

/* 📥 Get User Videos */
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch videos" });
  }
};

/* ❌ Delete Video */
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });

    await video.deleteOne();

    res.json({ msg: "Video deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Delete failed" });
  }
};

