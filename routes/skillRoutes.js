const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
// const verifyToken = require('../middleware/authMiddleware');
// const verifyAdmin = require('../middleware/verifyAdmin');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');


/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: List of all skills
 */
router.get('/', skillController.getSkills);

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Add a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               percentage:
 *                 type: number
 *     responses:
 *       201:
 *         description: Skill added successfully
 */
router.post('/add',verifyToken, verifyAdmin, skillController.addSkill);





// Public Route

// router.get('/', skillController.getSkills);

// router.post('/',verifyToken, verifyAdmin, skillController.addSkill);
// router.put('/:id', verifyAdmin, skillController.updateSkill);
// router.delete('/:id', verifyAdmin, skillController.deleteSkill);
// router.post('/', verifyToken, skillController.addSkill); phle wala code ka


module.exports = router;
