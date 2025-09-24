const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { uploadImage, getAllImages } = require('../controllers/imageController');
// const { uploadResume: uploadResumeMiddleware } = require('../middleware/upload'); // renamed



// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where image will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });



/**
 * @swagger
 * /api/upload/uploadImage:
 *   post:
 *     summary: Upload a profile image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 */

router.post('/upload', verifyToken, verifyAdmin, upload.single('image'),uploadImage );

/**
 * @swagger
 * /api/upload/all:
 *   get:
 *     summary: Get profile image
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Return the profile image
 */
router.get('/all', getAllImages);

//  router.post('/uploadResume', uploadResume.single('resume'), uploadResume);
//  router.post('/uploadResume', uploadResumeMiddleware.single('resume'), uploadResume);


module.exports = router;
