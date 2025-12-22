const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const image = await Image.create({
    user: req.user,
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });
  res.json(image);
};

exports.getImages = async (req, res) => {
  const images = await Image.find({ user: req.user });
  res.json(images);
};

exports.deleteImage = async (req, res) => {
  const image = await Image.findById(req.params.id);
  await cloudinary.uploader.destroy(image.publicId);
  await image.deleteOne();
  res.json({ msg: "Deleted" });
};
