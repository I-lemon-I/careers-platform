const pool = require('../connection');

async function seed() {
  const jobs = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'France',
      type: 'Full-time',
      description: 'We are looking for a Senior Software Engineer to lead our core platform team. The ideal candidate has experience with Node.js, Vue.js, and cloud infrastructure.',
      requirements: ['5+ years experience', 'Node.js', 'Vue.js', 'AWS']
    },
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Germany',
      type: 'Full-time',
      description: 'Join our frontend team to build modern, responsive user interfaces using Vue.js and related technologies.',
      requirements: ['3+ years experience', 'Vue.js', 'JavaScript', 'CSS/SCSS']
    }
  ];

  try {
    const existing = await pool.query('SELECT COUNT(*)::int AS count FROM jobs');
    if (existing.rows[0].count > 0) {
      console.log('Jobs table already has data, skipping seed.');
      return;
    }

    for (const job of jobs) {
      const query = `
        INSERT INTO jobs (title, department, location, type, description, requirements)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await pool.query(query, [
        job.title,
        job.department,
        job.location,
        job.type,
        job.description,
        job.requirements
      ]);
      console.log(`Seeded: ${job.title}`);
    }
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await pool.end();
  }
}

seed();