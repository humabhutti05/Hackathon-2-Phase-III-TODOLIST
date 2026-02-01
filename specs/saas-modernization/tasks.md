# Tasks: SaaS Modernization

**Input**: `specs/saas-modernization/plan.md`
**Prerequisites**: Phase II & III Complete

## Phase 1: Backend Data Extensions

- [ ] T001 Update `backend/models.py` with `priority`, `due_date`, and `category` fields
- [ ] T002 Update `backend/api/tasks.py` to support new fields in CRUD
- [ ] T003 Re-init database to incorporate schema changes

## Phase 2: Frontend UI Infrastructure

- [ ] T004 Install `framer-motion` and `date-fns` in `frontend/`
- [ ] T005 [P] Create `components/layout/Sidebar.tsx` with category filters
- [ ] T006 [P] Create `components/ui/Badge.tsx` for Priority levels
- [ ] T007 Implement `components/ui/AnimatedList.tsx` using Framer Motion

## Phase 3: Premium CRUD Experience

- [ ] T008 Redesign `components/tasks/CreateTask.tsx` as a "Notion-style" entry block
- [ ] T009 [P] Update `TaskCard.tsx` with priority colors and due date display
- [ ] T010 Implement Search functionality on the Dashboard
- [ ] T011 Implement Task Filtering (e.g., show only 'High' priority)

## Phase 4: Final SaaS Polish

- [ ] T012 Add entrance animations for the entire Dashboard
- [ ] T013 Implement "Glassmorphism" effect for Sidebar and Modals
- [ ] T014 [P] Final Responsive/UX walkthrough (Notion-look check)

---

**Execution Plan**: I will begin with Phase 1 to ensure the backend can store the professional metadata (Priority/Dates).
