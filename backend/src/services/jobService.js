const pool = require('../db/connection');

class JobService {
  async getAll(filters = {}) {
    const { status, department, search } = filters;
    let query = 'SELECT * FROM jobs WHERE 1=1';
    const values = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      values.push(status);
      paramIndex++;
    }

    if (department) {
      query += ` AND department = $${paramIndex}`;
      values.push(department);
      paramIndex++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      values.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY posted_date DESC';
    const result = await pool.query(query, values);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT * FROM jobs WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(jobData) {
    const { title, department, location, type, description, requirements } = jobData;
    const query = `
      INSERT INTO jobs (title, department, location, type, description, requirements)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [title, department, location, type, description, requirements || []];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, jobData) {
    const { title, department, location, type, description, requirements, status } = jobData;
    const query = `
      UPDATE jobs 
      SET 
        title = COALESCE($1, title),
        department = COALESCE($2, department),
        location = COALESCE($3, location),
        type = COALESCE($4, type),
        description = COALESCE($5, description),
        requirements = COALESCE($6, requirements),
        status = COALESCE($7, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `;
    const values = [title, department, location, type, description, requirements, status, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = 'DELETE FROM jobs WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

module.exports = new JobService();