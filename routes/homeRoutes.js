const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');


router.get('/all', homeController.getHomeData);
router.post('/add', verifyAdmin, verifyToken,homeController.createHomeData);  // ✅ Post route with auth
router.put('/update', verifyAdmin,verifyToken, homeController.updateHomeData); // only admin can update

module.exports = router;

