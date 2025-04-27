const Joi = require('joi');

// Validation schema for user registration
const registerSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name cannot exceed 100 characters',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
    }),
  password: Joi.string().min(8).max(30).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  confirm_password: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'string.empty': 'Please confirm your password',
      'any.only': 'Passwords do not match',
    }),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Password is required',
    }),
});

// Validation function for registration
const validateRegistration = (data) => {
  return registerSchema.validate(data, { abortEarly: false });
};

// Validation function for login
const validateLogin = (data) => {
  return loginSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateRegistration,
  validateLogin,
}; 