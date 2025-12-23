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
      videoUrl: req.file.path,
      cloudinaryPublicId: req.file.filename,
      duration: null, // compute later if needed
    });

    res.status(201).json({
      publicId: video.publicId,
      videoUrl: video.videoUrl,
      createdAt: video.createdAt,
    });
  } catch (err) {
    console.error("VIDEO UPLOAD ERROR:", err);
    res.status(500).json({ msg: "Video upload failed" });
  }
};

/* 📥 Get User Videos */
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user }).select("publicId videoUrl duration createdAt");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch videos" });
  }
};

/* ❌ Delete Video */
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findOne({
      publicId: req.params.id,
      user: req.user, // 🔒 ownership check
    }).select("+cloudinaryPublicId");

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
      resource_type: "video",
    });

    await video.deleteOne();

    res.json({ msg: "Video deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Delete failed" });
  }
};
