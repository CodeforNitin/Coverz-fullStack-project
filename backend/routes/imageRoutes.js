const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');

// Route for image upload
router.post('/upload', imageController.uploadImage, imageController.saveImage);

module.exports = router;