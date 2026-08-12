const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  // Register a new user
  async register(email, password, name) {
    // Check if user exists
    const checkQuery = 'SELECT id FROM users WHERE email = $1';
    const checkResult = await pool.query(checkQuery, [email]);
    
    if (checkResult.rows.length > 0) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const insertQuery = `
      INSERT INTO users (email, password, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, role, created_at
    `;
    const result = await pool.query(insertQuery, [email, hashedPassword, name]);
    
    return result.rows[0];
  }

  // Login user
  async login(email, password) {
    // Find user
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = result.rows[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  // Get user by ID
  async getById(id) {
    const query = 'SELECT id, email, name, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

module.exports = new UserService();