// backend/src/db/migrations/001_create_jobs_table.js
const pool = require('../connection');

async function up() {
  const query = `
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      department VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT[],
      posted_date DATE DEFAULT CURRENT_DATE,
      status VARCHAR(20) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Jobs table created successfully');
  } catch (error) {
    console.error('Migration failed:', error.message);
    throw error;
  }
}

async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS jobs;');
    console.log('Jobs table dropped successfully');
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