# Implementation Plan: Phase III Frontend Web Application

**Branch**: `frontend-phase-3` | **Date**: 2026-01-25 | **Spec**: [specs/frontend/spec.md](specs/frontend/spec.md)
**Input**: Feature specification from `specs/frontend/spec.md`

## Summary
Build a high-performance, secure Next.js 15+ frontend using the App Router. The architecture focuses on server-side rendering (SSR) for initial data fetching where possible, secure JWT-based authentication via Better Auth, and a clean API abstraction layer that prevents logic duplication.

## Technical Context
**Language/Version**: TypeScript 5.0+  
**Primary Dependencies**: Next.js 15+, Tailwind CSS, Better Auth, Axios or Fetch API  
**Auth**: Better Auth (JWT Strategy)  
**Backend Interaction**: RESTful consumption of existing FastAPI endpoints  
**Target Platform**: Vercel / Node.js Runtime  
**Project Type**: Web Application (Next.js)  
**Performance Goals**: < 1s Largest Contentful Paint (LCP)  
**Constraints**: Zero business logic, strict JWT injection in headers, responsive design  

## Project Structure (Recommended)

```text
frontend/
├── app/                        # App Router (Pages, Layouts, API Routes)
│   ├── (auth)/                 # Route Group for Login/Signup
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/            # Protected Route Group
│   │   ├── layout.tsx          # Auth-check wrapper
│   │   └── page.tsx            # Main Task List Dashboard
│   ├── layout.tsx              # Root Layout
│   └── globals.css
├── components/                 # Reusable UI components
│   ├── forms/                  # Auth forms
│   ├── tasks/                  # TaskCard, TaskList, TaskModal
│   └── ui/                     # Basic atoms (Button, Input, Checkbox)
├── lib/                        # Infrastructure & Utilities
│   ├── auth.ts                 # Better Auth Client configuration
│   ├── api-client.ts           # Axios/Fetch instance with JWT interceptors
│   └── utils.ts                # Tailwind merge and formatting
├── types/                      # TypeScript definitions (shared with backend schemas)
└── .env.local                  # NEXT_PUBLIC_BACKEND_URL, etc.
```

## Architecture & Integration Design

### 1. Authentication Strategy (Better Auth)
- **Configuration**: `lib/auth.ts` will house the primary configuration.
- **Session Management**: Use JWT strategy. Tokens will be stored in `HttpOnly` cookies for security and handled by Better Auth's middleware.
- **Route Protection**: Use a Middleware-based or High-Order Component (HOC) approach in `app/(dashboard)/layout.tsx` to redirect unauthenticated users to `/login`.

### 2. API Client & JWT Injection
- **Abstraction**: A standard client in `lib/api-client.ts`.
- **Injection**: Every request will use a middleware/interceptor to pull the current session token and append it to the `Authorization: Bearer <token>` header.
- **SSR vs Client**: 
    - Server Components: Use `fetch` with cookies passed through the header.
    - Client Components: Use the client-side API instance.

### 3. State Management Approach
- **Server State**: Leverage Next.js 15's built-in caching and `useServerAction` or `revalidatePath` to handle data mutations (Add, Update, Delete) without needing a complex state library like Redux.
- **UI State**: React `useState` for modals, form inputs, and hover effects.

### 4. Error Handling & Loading States
- **Loading UI**: Utilize `loading.tsx` in page groups for automatic skeleton screens during data fetching.
- **Error Boundaries**: Utilize `error.tsx` for graceful fallbacks when the backend is unreachable.
- **Validation**: Client-side validation using Zod/React Hook Form matching backend requirements.

## Implementation Roadmap

### Phase 1: Infrastructure
- Next.js 15 project initialization.
- Tailwind and UI theme setup.
- Better Auth configuration.

### Phase 2: Authentication Flow
- Implementation of Signup and Login pages.
- Middleware setup for route protection.

### Phase 3: Task Dashboard (CRUD)
- API Client abstraction implementation.
- Fetching and displaying tasks (Read).
- Adding, Toggling, and Deleting tasks (Create/Update/Delete).

### Phase 4: Polish
- Loading states and Skeleton UI.
- Final responsive testing.
