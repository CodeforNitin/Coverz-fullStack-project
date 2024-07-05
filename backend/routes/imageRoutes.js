const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');

// Route for image upload
router.post('/upload', imageController.uploadImage, imageController.saveImage);

// Route to fetch image by ID
router.get('/upload/:imageId', async (req, res) => {
    const imageId = req.params.imageId;
  
    try {
      const image = await Image.findById(imageId);
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.set('Content-Type', image.contentType); // Set response content type to image's contentType
      res.send(image.data); // Send image data as response
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;