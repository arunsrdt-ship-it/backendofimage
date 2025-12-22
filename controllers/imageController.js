const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const image = await Image.create({
      user: req.user,
      imageUrl: req.file.path,        // Cloudinary URL
      publicId: req.file.filename,    // Cloudinary public_id
    });

    res.status(201).json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Image upload failed" });
  }
};

exports.getImages = async (req, res) => {
  const images = await Image.find({ user: req.user });
  res.json(images);
};

exports.deleteImage = async (req, res) => {
  const cloudinary = require("../config/cloudinary");
  const image = await Image.findById(req.params.id);

  await cloudinary.uploader.destroy(image.publicId);
  await image.deleteOne();

  res.json({ msg: "Deleted" });
};
