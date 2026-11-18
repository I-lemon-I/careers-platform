const pool = require('../connection');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@careers.local';
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log('Admin user already exists, skipping.');
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, 'admin')`,
      [email, hashed, 'Admin']
    );

    console.log(`Admin user created: ${email} / ${password}`);
    console.log('Change this password after first login.');
  } catch (error) {
    console.error('Admin seed failed:', error.message);
  } finally {
    await pool.end();
  }
}

seedAdmin();