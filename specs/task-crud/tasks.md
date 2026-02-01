# Tasks: Task CRUD

**Input**: Design documents from `specs/task-crud/`
**Prerequisites**: plan.md (required), spec.md (required)

## Phase 1: Setup

- [ ] T001 Initialize backend directory structure
- [ ] T002 Create `pyproject.toml` or `requirements.txt` with FastAPI, SQLModel, Psycopg2-binary
- [ ] T003 Create `.env` file template with `DATABASE_URL`

## Phase 2: Foundational

- [ ] T004 Implement `backend/database.py` with SQLModel engine and session generator
- [ ] T005 Implement base `Task` SQLModel in `backend/models.py`
- [ ] T006 [P] Setup `backend/main.py` with FastAPI initialization and inclusive routing
- [ ] T007 Configure basic error handling middleware in `backend/main.py`

---

## Phase 3: User Story 1 - Create and Read Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to persist new tasks and retrieve them.

**Independent Test**: POST to `/tasks`, then GET `/tasks` to see the new item.

### Implementation for User Story 1

- [ ] T008 [US1] Create `backend/api/tasks.py` with router and basic dependency injection
- [ ] T009 [US1] Implement POST `/tasks` endpoint in `backend/api/tasks.py`
- [ ] T010 [US1] Implement GET `/tasks` endpoint (list all) in `backend/api/tasks.py`
- [ ] T011 [US1] Implement GET `/tasks/{id}` endpoint (get details) in `backend/api/tasks.py`
- [ ] T012 [US1] Write integration tests in `backend/tests/test_tasks_read_create.py`

**Checkpoint**: MVP logic for creating and viewing tasks is functional.

---

## Phase 4: User Story 2 - Update and Delete Tasks (Priority: P2)

**Goal**: Enable users to modify or remove tasks.

**Independent Test**: PATCH `/tasks/{id}`, then DELETE `/tasks/{id}`, verify results.

### Implementation for User Story 2

- [ ] T013 [US2] Implement PATCH `/tasks/{id}` endpoint in `backend/api/tasks.py`
- [ ] T014 [US2] Implement DELETE `/tasks/{id}` endpoint in `backend/api/tasks.py`
- [ ] T015 [US2] Add input validation (Pydantic models) for updates in `backend/models.py`
- [ ] T016 [US2] Write integration tests in `backend/tests/test_tasks_update_delete.py`

---

## Phase 5: Polish & Deployment Ready

- [ ] T017 [P] Add README.md in `backend/` with setup instructions
- [ ] T018 Ensure all Neon PostgreSQL connection parameters are securely handled
- [ ] T019 Final manual verification of all CRUD operations using Swagger UI (/docs)
