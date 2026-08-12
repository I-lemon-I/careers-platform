echo "Running database migrations..."
docker exec -it careers-backend node src/db/migrations/001_create_jobs_table.js up

echo "Seeding database..."
docker exec -it careers-backend node src/db/seeds/seed_jobs.js

echo "Database setup complete!"