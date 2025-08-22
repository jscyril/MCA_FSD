-- Social Networking Application Database Setup
-- Run these commands in your MySQL server
-- Create database
CREATE DATABASE IF NOT EXISTS social_network;

-- Use the database
USE social_network;

-- Create users table
CREATE TABLE
    IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        profile_picture VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Insert sample data (optional)
INSERT INTO
    users (name, email, phone)
VALUES
    ('John Doe', 'john.doe@example.com', '+1234567890'),
    (
        'Jane Smith',
        'jane.smith@example.com',
        '+0987654321'
    ),
    (
        'Mike Johnson',
        'mike.johnson@example.com',
        '+1122334455'
    );

-- Show tables
SHOW TABLES;

-- Describe users table structure
DESCRIBE users;
