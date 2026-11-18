# Careers Platform

A full-stack job-listing platform. Visitors register and browse open positions; administrators post, edit and delete them.

- **Backend:** Node.js + Express REST API with a layered structure (routes → controllers → services → data access), PostgreSQL with parameterised queries, JWT authentication, bcrypt password hashing, role-based access (admin/user), Helmet security headers and request logging.
- **Frontend:** React 19 + Vite, React Router, protected and admin-only routes, a shared auth context, and job listing, search/filtering, detail and management views.
- **Infrastructure:** the API and database run with Docker Compose (database health check, migrations and seed scripts).

## Running locally

Requirements: Docker Desktop and Node.js 18+.

```sh
# 1. Configuration: copy the example file and set JWT_SECRET to a long random string
cp .env.example .env

# 2. Start the database and API (http://localhost:3000)
docker compose up -d --build

# 3. Create the tables and seed sample jobs and an admin account
sh setup-db.sh

# 4. Start the frontend (http://localhost:5173)
cd frontend
cp .env.example .env
npm install
npm run dev
```

Log in with the admin account from `.env` (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`) to post and manage jobs. Accounts created through the Register page are regular users and can browse jobs.

pgAdmin is optional: `docker compose --profile tools up -d`, then open http://localhost:5050.

## API overview

| Method | Endpoint | Access |
|---|---|---|
| GET | `/health` | public |
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/auth/me` | logged in |
| GET | `/api/jobs?search=&department=&status=` | public |
| GET | `/api/jobs/:id` | public |
| POST | `/api/jobs` | admin |
| PUT | `/api/jobs/:id` | admin |
| DELETE | `/api/jobs/:id` | admin |

## Project structure

```
backend/
  src/api/        routes, controllers, middleware (auth, roles, validation)
  src/services/   business logic and SQL queries
  src/db/         connection pool, migrations, seeds
frontend/
  src/components/ auth, jobs and shared components
  src/context/    authentication state
  src/api/        Axios client with JWT interceptor
```
