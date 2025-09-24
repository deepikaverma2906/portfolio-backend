const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { saveAbout, getAbout } = require('../controllers/aboutController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/about');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET - public
router.get('/', getAbout);

// POST - with image/resume upload
router.post('/add', verifyToken, verifyAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  saveAbout
);

module.exports = router;
