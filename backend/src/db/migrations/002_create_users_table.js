const pool = require('../connection');

async function up() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_users_email ON users(email);
  `;

  try {
    await pool.query(query);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Migration failed:', error.message);
    throw error;
  }
}

async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    console.log('Users table dropped successfully');
  } catch (error) {
    console.error('Rollback failed:', error.message);
    throw error;
  }
}

if (require.main === module) {
  const command = process.argv[2] || 'up';
  
  if (command === 'up') {
    up().then(() => process.exit(0)).catch(() => process.exit(1));
  } else if (command === 'down') {
    down().then(() => process.exit(0)).catch(() => process.exit(1));
  } else {
    console.error('Unknown command. Use "up" or "down"');
    process.exit(1);
  }
}

module.exports = { up, down };