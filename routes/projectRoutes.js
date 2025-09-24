const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addProject, getAllProjects, updateProject, deleteProject } = require('../controllers/projectController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/**
 * @swagger
 * /api/projects/add:
 *   post:
 *     summary: Add a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Project added successfully
 */

router.post('/add', verifyToken, verifyAdmin, upload.single('image'), addProject);
/**
 * @swagger
 * /api/projects/all:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
 */

router.get('/all', getAllProjects);
router.put('/update/:id', verifyToken, verifyAdmin, upload.single('image'), updateProject);
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteProject);

module.exports = router;
