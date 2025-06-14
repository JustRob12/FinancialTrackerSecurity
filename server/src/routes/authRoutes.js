const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Get user profile (protected route)
router.get('/profile', auth, getProfile);

module.exports = router; 