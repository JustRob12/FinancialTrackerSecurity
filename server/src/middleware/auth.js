const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret - should be in .env file in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find the user by id
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Add the user to the request object
    req.user = { id: user.id };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

module.exports = auth; 