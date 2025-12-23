const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // seconds (optional)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
