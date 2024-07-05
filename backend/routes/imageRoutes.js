const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');
const getImage = require('../controller/imageController')

// Route for image upload
router.post('/upload', imageController.uploadImage, imageController.saveImage);

// Route to fetch image by ID
router.get('/upload/:id', imageController.getImage);


module.exports = router;