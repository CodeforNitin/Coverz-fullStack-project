const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  size: Number,
  data: Buffer,
});

const Image = mongoose.model('Image', ImageSchema);

module.exports =Image