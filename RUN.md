# Task Manager — Manual Run Guide

This guide runs the **Task Manager** app locally on Windows using the monorepo under `task-manager/`.

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Java | 21 | `java -version` |
| Maven | 3.9+ | `mvn -version` |
| Node.js | 18+ (24 recommended) | `node -v` |
| Docker Desktop | running | `docker ps` |
| PostgreSQL client (optional) | 16 | `psql --version` |

## Project layout

```
task-manager/
├── backend/     # Spring Boot 3 (Java 21) REST API on port 8080
├── frontend/    # React + Vite on port 5173
├── infra/       # docker-compose for Postgres
└── RUN.md
```

## 1. Start the database (Postgres via Docker)

```powershell
cd C:\Users\prane\Desktop\TM\task-manager\infra
docker compose up -d db
```

The container maps host port **5434** → container 5432 (to avoid clashing with a native Postgres on 5432).

Verify:

```powershell
docker ps
```

You should see `infra-db-1` running with `0.0.0.0:5434->5432/tcp`.

> **Note:** If you change the host port, also update the backend datasource URL in step 2.

## 2. Start the backend

```powershell
cd C:\Users\prane\Desktop\TM\task-manager\backend
$env:JAVA_TOOL_OPTIONS = "-Duser.timezone=UTC"
mvn spring-boot:run "-Dspring-boot.run.arguments=--spring.datasource.url=jdbc:postgresql://localhost:5434/taskmanager"
```

Wait for:

```
Tomcat started on port 8080 (http) with context path ''
Started TaskmanagerApplication in ...
```

Verify health:

```powershell
Invoke-WebRequest http://localhost:8080/api/health
# -> 200 ok
```

### Backend environment (defaults, overridable)

| Property | Default | Where |
|----------|---------|-------|
| Server port | 8080 | `application.yml` |
| DB URL | `jdbc:postgresql://localhost:5432/taskmanager` | `application.yml` (overridden above to 5434) |
| DB user | `taskmanager` | `application.yml` |
| DB password | `taskmanager123` | `application.yml` |
| JWT secret | `your-jwt-secret-key-change-in-production` | `application.yml` |
| JWT expiration | 86400000 ms (1 day) | `application.yml` |

## 3. Install frontend dependencies (first time only)

```powershell
cd C:\Users\prane\Desktop\TM\task-manager\frontend
npm install --no-workspaces
```

## 4. Start the frontend

```powershell
cd C:\Users\prane\Desktop\TM\task-manager\frontend
$env:VITE_API_URL = "http://localhost:8080/api"
npm run dev
```

Vite prints a local URL (usually http://localhost:5173). Open it in your browser.

## 5. Use the app

1. Open http://localhost:5173
2. Register a new account (name, email, password ≥ 8 chars)
3. Log in
4. Create / update / delete tasks

## API endpoints (quick reference)

Base URL: `http://localhost:8080/api`

| Method | Path | Auth |
|--------|------|------|
| POST | `/auth/register` | public |
| POST | `/auth/login` | public |
| GET | `/api/health` | public |
| GET | `/tasks` | Bearer token |
| POST | `/tasks` | Bearer token |
| PATCH | `/tasks/{id}/status` | Bearer token |
| DELETE | `/tasks/{id}` | Bearer token |

> Note: health is served at `/api/health` (controller path includes `/api` and there is no context path).

## Stopping

- Frontend: `Ctrl+C` in its terminal
- Backend: `Ctrl+C` in its terminal
- Database: `cd infra && docker compose down` (add `-v` to wipe data)

## Troubleshooting

**"password authentication failed for user taskmanager"**
The backend is hitting a different Postgres (native one on 5432). Use port 5434 as shown, or stop the native `postgresql-x64-16` service.

**"invalid value for parameter TimeZone: Asia/Calcutta"**
Set `$env:JAVA_TOOL_OPTIONS = "-Duser.timezone=UTC"` before starting the backend.

**Port 8080 / 5173 already in use**
Find and kill the process:
```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Frontend shows network/CORS errors**
Ensure `VITE_API_URL=http://localhost:8080/api` is set **before** `npm run dev`, and the backend is running.

**Docker compose "depends on" validation error**
Make sure `infra/docker-compose.yml` uses `depends_on` (with underscore), not `depends on`.