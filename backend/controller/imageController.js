const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Image = require('../models/ImageModel');
const sharp = require('sharp');

// Construct the path to the uploads directory
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const uploadImage = upload.single('image');

const saveImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Please upload a file');
    }

    const targetPath = path.join(uploadsDir, req.file.filename);
    const imageUrl = `/uploads/${req.file.filename}`;
    
    // Get image dimensions using sharp
    const { width, height } = await sharp(targetPath).metadata();

    const image = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      size: req.file.size,
      imageUrl,
      width,
      height,
    });

    await image.save();
    
    console.log('File received 2ND POSTION:', req.file);

    res.status(201).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  uploadImage,
  saveImage,
};
