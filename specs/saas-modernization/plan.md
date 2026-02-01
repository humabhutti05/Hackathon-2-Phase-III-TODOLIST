# Implementation Plan: SaaS Modernization

**Branch**: `saas-modernization` | **Date**: 2026-01-26 | **Spec**: [specs/saas-modernization/spec.md](specs/saas-modernization/spec.md)
**Input**: Specification for professional SaaS UI and advanced features.

## Summary
The goal is to migrate from a basic layout to a sidebar-centric SaaS architecture. We will introduce `Framer Motion` for high-end animations and update the backend `SQLModel` to support priorities and dates.

## Technical Context
**Frontend Extensions**: `framer-motion`, `date-fns`, `lucide-react` (extended icons)
**Backend Updates**: Schema migration for `priority`, `due_date`, and `category` fields.
**Design Tokens**:
- Background: `#FBFCFE`
- Primary: `#5D5CDE` (Indigo)
- Border: `#F1F3F5`

## Project Structure Changes
```text
frontend/
├── src/
│   ├── components/
│   │   ├── layout/             # Sidebar, Header, PageTransition
│   │   └── ui/                 # AnimatedButton, CustomCheckbox
│   └── hooks/                  # useSearch, useFilter
backend/
├── migrations/                 # If using Alembic (or manual update for SQLite)
```

## Architecture Decisions

### 1. Unified Design Component (Glassmorphism)
All cards and modals will share a `SaaSWrapper` component that applies consistent blurring and edge-lighting to mimic a professional desktop app experience.

### 2. Animation Orchestration
Use `AnimatePresence` from Framer Motion for list reordering and item deletion. This ensures tasks don't just disappear but slide away smoothly.

### 3. Backend Schema Evolution
The `Task` model needs 3 new fields:
- `priority`: Enum (Low, Medium, High)
- `due_date`: DateTime (Optional)
- `category`: String (Default: 'Inbox')

## Implementation Roadmap

### Phase 1: Backend Upgrade
- Update `backend/models.py` with new fields.
- Re-initialize DB to reflect schema changes.
- Update `api/tasks.py` to handle metadata in POST/PATCH.

### Phase 2: Frontend Foundation (UI Kit)
- Install `framer-motion`.
- Create the **Professional Sidebar** and **Activity Header**.
- Implement shared UI atoms (Priority badges, animated checkboxes).

### Phase 3: Enhanced CRUD UI
- Build the "Notion-style" task entry bar.
- Implement animated task list with search & filter (by priority/status).

### Phase 4: Micro-animations & Polish
- Add entry animations for page load.
- Performance audit for smooth 60fps interaction.

## complexity Tracking
| Violation | Why Needed | Alternative |
|-----------|------------|-------------|
| Heavy Animation | Premium SaaS requirement | CSS transitions (rejected: less control over list reordering) |
