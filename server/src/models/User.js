const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute('SELECT * FROM User WHERE email = ?', [email]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM User WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Create a new user
  static async create(userData) {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Insert the user into the database
      const [result] = await pool.execute(
        'INSERT INTO User (full_name, email, password) VALUES (?, ?, ?)',
        [userData.full_name, userData.email, hashedPassword]
      );

      return { id: result.insertId, ...userData, password: undefined };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user's last login timestamp
  static async updateLastLogin(userId) {
    try {
      await pool.execute(
        'UPDATE User SET last_login = CURRENT_TIMESTAMP, failed_login_attempts = 0, account_locked_until = NULL WHERE id = ?',
        [userId]
      );
      return true;
    } catch (error) {
      console.error('Error updating last login:', error);
      throw error;
    }
  }

  // Record failed login attempt
  static async recordFailedLoginAttempt(email) {
    try {
      await pool.execute(
        `UPDATE User 
         SET failed_login_attempts = failed_login_attempts + 1,
             account_locked_until = CASE 
                 WHEN failed_login_attempts >= 4 THEN DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 15 MINUTE)
                 ELSE NULL
             END
         WHERE email = ?`,
        [email]
      );
      return true;
    } catch (error) {
      console.error('Error recording failed login attempt:', error);
      throw error;
    }
  }

  // Check if account is locked
  static async isAccountLocked(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT account_locked_until FROM User WHERE email = ? AND account_locked_until > CURRENT_TIMESTAMP',
        [email]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error checking if account is locked:', error);
      throw error;
    }
  }

  // Verify user's password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User; 