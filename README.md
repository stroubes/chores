# Chores

Prototype backend for the Chore Management System described in `docs/design.md`. It exposes a FastAPI application with basic endpoints for managing chores, assignments, rewards, and point totals. A React/Vite frontend lives in `frontend/` and now includes a parent dashboard for managing kids, chores and rewards in addition to the child-facing chore board. Demo data with three kids and five chores each is loaded on startup.

## Running
```
uvicorn backend.main:app --reload
```

For the frontend (after installing dependencies):
```
cd frontend
npm run dev
```

The parent dashboard can be accessed from the frontend using the credentials `parent` / `secret`.

## Tests
```
pytest
```

For the frontend:
```
cd frontend
npm test
```
