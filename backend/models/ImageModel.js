const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  size: Number,
  imageUrl: { type: String, required: true }, // Store URL to access the image
  width: { type: Number, required: true }, // Width of the image
  height: { type: Number, required: true }, // Height of the image
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
