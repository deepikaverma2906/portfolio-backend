const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, authController.login);
router.post('/register', authController.register);
console.log(authController); // Yeh dekhne ke liye ki login/register aa raha hai ya nahi

// Forgot password routes
router.post('/forgot-password', authController.sendResetCode);
router.put('/reset-password', authController.resetPassword);

module.exports = router;

