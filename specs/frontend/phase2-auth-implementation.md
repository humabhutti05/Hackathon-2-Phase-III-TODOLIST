# Phase 2: Authentication Implementation Guide

## Context
You are implementing Phase 2 of the Frontend Web Application (Task CRUD).
- **Spec**: `specs/frontend/spec.md`
- **Plan**: `specs/frontend/plan.md`
- **Tasks**: `specs/frontend/tasks.md`
- **Current Phase**: Authentication & Route Protection (P1)

## Tasks to Complete
- [ ] T004: Setup Better Auth configuration in `lib/auth.ts` (JWT Strategy)
- [ ] T005: Create Signup form and page in `app/(auth)/signup/page.tsx`
- [ ] T006: Create Login form and page in `app/(auth)/login/page.tsx`
- [ ] T007: Implement Auth middleware/HOC in `app/(dashboard)/layout.tsx` to protect routes

## Requirements

### Backend API Endpoints (Already Implemented)
Assume the FastAPI backend has these endpoints:
- POST `/auth/signup` - Register new user
  - Body: `{ email: string, password: string, name?: string }`
  - Response: `{ access_token: string, token_type: "bearer" }`
- POST `/auth/login` - Login existing user
  - Body: `{ email: string, password: string }`
  - Response: `{ access_token: string, token_type: "bearer" }`

### Implementation Details

#### 1. Better Auth Configuration (`src/lib/auth.ts`)
Create a simple auth helper that:
- Stores JWT token in localStorage
- Provides login/signup/logout functions
- Validates if user is authenticated

#### 2. Signup Page (`src/app/(auth)/signup/page.tsx`)
- Use react-hook-form with zod validation
- Fields: email (required), password (required, min 8 chars), name (optional)
- On success: store token and redirect to `/dashboard`
- Show error messages for validation and API errors
- Link to login page

#### 3. Login Page (`src/app/(auth)/login/page.tsx`)
- Use react-hook-form with zod validation
- Fields: email (required), password (required)
- On success: store token and redirect to `/dashboard`
- Show error messages
- Link to signup page

#### 4. Protected Route Layout (`src/app/(dashboard)/layout.tsx`)
- Check if user is authenticated on mount
- If not authenticated, redirect to `/login`
- Show loading state while checking auth

## Design Requirements
- Modern, clean UI using Tailwind CSS
- Responsive design (mobile-first)
- Loading states during API calls
- Clear error messages
- Accessible forms (labels, ARIA attributes)

## File Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   └── (dashboard)/
│       └── layout.tsx
├── lib/
│   └── auth.ts
└── components/
    └── forms/
        ├── LoginForm.tsx (optional, can be inline)
        └── SignupForm.tsx (optional, can be inline)
```

## Constraints
- NO backend logic in frontend
- Use existing `apiClient` from `src/lib/api-client.ts`
- Follow TypeScript strict mode
- Use Tailwind CSS only (no custom CSS files)
- Store token in localStorage (key: 'access_token')

## Success Criteria
- User can sign up with valid credentials
- User can log in with existing credentials
- Invalid credentials show appropriate errors
- Unauthenticated users cannot access `/dashboard`
- Token is automatically attached to all API requests (already handled by api-client.ts)

## Implementation Order
1. Create auth helper functions (`lib/auth.ts`)
2. Create signup page with form
3. Create login page with form
4. Create protected layout for dashboard
5. Test the complete flow

## Notes
- Since Better Auth setup is complex, we'll create a simpler custom auth helper
- Focus on functionality first, then polish UI
- Ensure all forms have proper validation
- Handle loading and error states gracefully

---

**Action**: Implement the above authentication flow following the Spec-Kit Plus methodology.
Create all necessary files and ensure the authentication works end-to-end.
