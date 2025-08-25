# Chores

Prototype backend for the Chore Management System described in `docs/design.md`. It exposes a FastAPI application with basic endpoints for managing chores, assignments, rewards, and point totals. A minimal React/Vite frontend lives in `frontend/` and consumes these APIs to show a child-facing chore board.

## Running
```
uvicorn backend.main:app --reload
```

For the frontend (after installing dependencies):
```
cd frontend
npm run dev
```

## Tests
```
pytest
```

For the frontend:
```
cd frontend
npm test
```
