const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Image = require('../models/ImageModel');

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

    console.log('File received:', req.file);

    const image = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      size: req.file.size,
      data: fs.readFileSync(req.file.path),
    });

    await image.save();

    // Delete the temporary -- dangerous since it would not save your file to respective path
    // fs.unlinkSync(req.file.path);

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
