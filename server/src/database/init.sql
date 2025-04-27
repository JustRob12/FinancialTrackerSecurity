-- Create the financial_tracker database if it doesn't exist
CREATE DATABASE IF NOT EXISTS financial_tracker;

-- Use the financial_tracker database
USE financial_tracker;

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255) NULL,
    reset_password_token VARCHAR(255) NULL,
    reset_password_expires TIMESTAMP NULL,
    INDEX email_index (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add some extra security measures
ALTER TABLE User
    ADD COLUMN failed_login_attempts INT DEFAULT 0,
    ADD COLUMN account_locked_until TIMESTAMP NULL;

-- If you want to add sample data (not recommended for production)
-- INSERT INTO User (full_name, email, password) VALUES 
-- ('Test User', 'test@example.com', '$2a$10$xPPMkpypPQEFBN0CwX7JhO5/n8w.q3FOb8hWbQN1r8vHOkS6Ow0sW');
-- The password hash above would be 'password123' using bcrypt, but you should generate proper hashes with your backend 