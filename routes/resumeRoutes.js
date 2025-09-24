const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const  {uploadResume}  = require('../middleware/upload');
const { uploadResume: uploadResumeController, getResume } = require('../controllers/resumeController');
const resumeController = require('../controllers/resumeController');

router.post('/upload', verifyToken, verifyAdmin, uploadResume.single('resume'), uploadResumeController);
router.get('/all', getResume);
router.get('/download/:filename', resumeController.downloadResume);


module.exports = router;
