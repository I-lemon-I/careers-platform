#!/bin/sh
# Creates the database tables and seeds sample jobs plus an admin user.
# Run after `docker compose up -d`.
set -e

echo "Running database migrations..."
docker compose exec -T backend node src/db/migrations/001_create_jobs_table.js up
docker compose exec -T backend node src/db/migrations/002_create_users_table.js up

echo "Seeding database..."
docker compose exec -T backend node src/db/seeds/seed_jobs.js
docker compose exec -T backend node src/db/seeds/seed_admin.js

echo "Database setup complete!"
