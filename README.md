# Smart Health Assistant: Multi-Modal Early Disease Screening Platform

## Overview
A Smart health assistant platform for early disease screening using symptoms, risk factors, and image analysis.

## Architecture
- **Frontend:** React app (see `frontend/`)
- **Backend:** FastAPI (python see `server/`)
- **Docker:** Unified setup with `docker-compose.yml`

## Quick Start

### Prerequisites
- Docker & Docker Compose

### Run with Docker
```sh
# From project root
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Run Locally (Dev)
#### Backend
```sh
cd server
pip install fastapi uvicorn
uvicorn app.main:app --reload
```
#### Frontend
```sh
cd frontend
npm install
npm start
```

## Endpoints
- `POST /symptoms/check` — Check symptoms
- `POST /risk/assess` — Assess risk
- `POST /imaging/analyze` — Analyze image

## Extend
- Add ML models or rules in backend
- Improve UI/UX in frontend
- Add authentication, database, etc.
