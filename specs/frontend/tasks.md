# Tasks: Phase III Frontend Web Application

**Input**: Design documents from `specs/frontend/`
**Prerequisites**: plan.md (required), spec.md (required)

## Phase 1: Setup & Infrastructure

- [ ] T001 Initialize Next.js 15 project in `frontend/` directory (App Router, TS, Tailwind)
- [ ] T002 Install core dependencies: `better-auth`, `axios`, `lucide-react`, `zod`, `react-hook-form`
- [ ] T003 Configure `lib/api-client.ts` for FastAPI communication with JWT header support

## Phase 2: Authentication & Route Protection (P1)

- [ ] T004 Setup Better Auth configuration in `lib/auth.ts` (JWT Strategy)
- [ ] T005 Create Signup form and page in `app/(auth)/signup/page.tsx`
- [ ] T006 Create Login form and page in `app/(auth)/login/page.tsx`
- [ ] T007 Implement Auth middleware/HOC in `app/(dashboard)/layout.tsx` to protect routes

---

## Phase 3: Dashboard & Task Reading (P1) 🎯 MVP

**Goal**: Authenticated users can see their tasks.

- [ ] T008 Design base layout for Dashboard in `app/(dashboard)/page.tsx`
- [ ] T009 Create `components/tasks/TaskList.tsx` and `components/tasks/TaskCard.tsx`
- [ ] T010 Implement task fetching (Read) from Backend in `app/(dashboard)/page.tsx`
- [ ] T011 [P] Implement Skeleton loaders in `app/(dashboard)/loading.tsx`

---

## Phase 4: Full Task CRUD Operations (P1)

**Goal**: Full interactivity with the task list.

- [ ] T012 Implement Create Task modal/form in `components/tasks/CreateTask.tsx`
- [ ] T013 Implement Toggle Task Completion (Update) logic
- [ ] T014 Implement Delete Task functionality with confirmation
- [ ] T015 Implement Edit Task Title/Description (Update) modal

---

## Phase 5: UX Polish & Error Handling (P2)

- [ ] T016 Setup global error boundary in `app/error.tsx`
- [ ] T017 Implement Toast notifications for API successes/failures (e.g., "Task Deleted")
- [ ] T018 Final Responsive UI check (Mobile/Desktop)
- [ ] T019 [P] Write base integration tests for Auth flow using Playwright/Cypress
