const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyToken = require('../middleware/verifyToken');
const { contactLimiter } = require('../middleware/rateLimiter');
const { contactForm, getAllContacts } = require('../controllers/contactController');

/**
 * @swagger
 * /api/contact/add:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
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
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
router.post('/add', contactLimiter, contactForm);
router.get('/all', verifyToken, verifyAdmin, getAllContacts);

module.exports = router;
