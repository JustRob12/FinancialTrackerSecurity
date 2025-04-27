const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateRegistration, validateLogin } = require('../utils/validation');

// JWT Secret - should be in .env file in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Register a new user
const register = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user already exists
    const existingUser = await User.findByEmail(value.email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const user = await User.create({
      full_name: value.full_name,
      email: value.email,
      password: value.password,
    });

    // Create and sign a JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return the token and user information (excluding the password)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user exists
    const user = await User.findByEmail(value.email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the account is locked due to too many failed attempts
    const isLocked = await User.isAccountLocked(value.email);
    if (isLocked) {
      return res.status(401).json({ 
        message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.' 
      });
    }

    // Check if the password is correct
    const isMatch = await User.verifyPassword(value.password, user.password);
    if (!isMatch) {
      // Record the failed login attempt
      await User.recordFailedLoginAttempt(value.email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login timestamp
    await User.updateLastLogin(user.id);

    // Create and sign a JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return the token and user information (excluding the password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get the current user's profile
const getProfile = async (req, res) => {
  try {
    // The user ID comes from the authenticated request
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user information (excluding the password)
    res.status(200).json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        created_at: user.created_at,
        is_email_verified: user.is_email_verified,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
}; 