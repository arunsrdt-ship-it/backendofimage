const mongoose = require("mongoose");
const crypto = require("crypto");

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Actual Cloudinary URL (used for playback)
    videoUrl: {
      type: String,
      required: true,
    },

    // Real Cloudinary public_id (used internally)
    cloudinaryPublicId: {
      type: String,
      required: true,
      select: false, // hidden by default
    },

    // 🔐 Hashed public identifier (safe for frontend)
    publicId: {
      type: String,
      unique: true,
      index: true,
    },

    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);

/* 🔒 Generate hashed publicId before save */
videoSchema.pre("save", function (next) {
  if (!this.publicId) {
    this.publicId = crypto
      .createHash("sha256")
      .update(this._id.toString())
      .digest("hex");
  }
  next();
});

module.exports = mongoose.model("Video", videoSchema);
