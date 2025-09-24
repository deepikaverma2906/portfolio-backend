const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

/**
 * @swagger
 * /api/experience/add:
 *   post:
 *     summary: Add a new experience entry
 *     tags: [Experience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Experience added successfully
 */

router.post('/add', verifyToken, verifyAdmin, experienceController.addExperience);

/**
 * @swagger
 * /api/experience/all:
 *   get:
 *     summary: Get all experience entries
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: List of experience entries
 */
router.get('/all', experienceController.getExperiences);

// PUT - Update (Admin Only)
router.put('/update/:id', verifyToken, verifyAdmin, experienceController.updateExperience);

// DELETE - Delete (Admin Only)
router.delete('/delete/:id', verifyToken, verifyAdmin, experienceController.deleteExperience);

module.exports = router;
