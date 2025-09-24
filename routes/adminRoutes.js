const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');


/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin profile data
 */
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user });
});

/**
 * @swagger
 * /api/admin/update-profile:
 *   put:
 *     summary: Update admin profile
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */

router.put('/update-profile', verifyToken, verifyAdmin, adminController.updateProfile);


module.exports = router;

