# Vehicle Registration & Management Platform

A production-style React frontend for a Vehicle Registration and Management assignment. The app combines mock client-side authentication, protected routes, strict mirrored validation, segmented data fetching, and a polished dashboard UI for working with a vehicle registry API.

## Live Links

- GitHub Repository: https://github.com/theresiew/Vehicle-Registration-Management-Platform
- Live Deployment: https://vehicle-registration-management-platform-89t7mahuy.vercel.app

## Features

- Public home page with cached vehicle listing
- Mock login using React Context and `localStorage`
- Protected routes for dashboard, details, create, edit, and delete flows
- Multi-step vehicle registration wizard powered by React Hook Form and Zod
- Client-side validation aligned to the assignment rules to reduce `422` errors
- Segmented vehicle details tabs using:
  - `GET /api/vehicle-service/vehicle/:id/info`
  - `GET /api/vehicle-service/vehicle/:id/owner`
  - `GET /api/vehicle-service/vehicle/:id/registration`
  - `GET /api/vehicle-service/vehicle/:id/insurance`
- TanStack Query caching, invalidation, and mutation handling
- Toast-based feedback for API and validation errors

## Tech Stack

- React
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Axios

## Project Structure

```text
src/
  components/
  context/
  hooks/
  lib/
  pages/
  services/
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file from the example:

```bash
cp .env.example .env
```

3. Set your backend URL:

```env
VITE_API_BASE_URL=https://your-api-base-url-here
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Authentication Approach

The backend does not provide a login endpoint, so the app uses a mock authentication flow in `AuthContext`.

- Valid credentials are hardcoded as `admin@example.com` and `password123`
- Successful login stores a session flag and user object in `localStorage`
- `ProtectedRoute` blocks guests from restricted pages and redirects them to `/login`
- The sidebar automatically switches between guest and authenticated navigation

## State Management Approach

The app uses TanStack Query for server state and React Context for authentication state.

- `useQuery` is used for the public list, single vehicle details, and segmented tabs
- `useMutation` handles create, update, and delete actions
- Query invalidation refreshes stale vehicle data automatically after mutations
- Segmented query keys help avoid over-fetching the full record when only one tab is needed

## Validation Approach

Validation is centralized in `src/lib/validation.js`.

- Zod mirrors backend enum and field rules
- The multi-step wizard validates per step before continuing
- Errors appear inline on fields and API validation errors are surfaced as toasts
- Conditional rules are supported, such as company registration number for `COMPANY` owners

## Deployment Notes

- Deploy the frontend to Vercel, Netlify, or Render
- Set `VITE_API_BASE_URL=https://student-management-system-backend.up.railway.app` in your hosting platform environment variables
- If deploying behind static hosting, configure SPA routing rewrites so React Router routes resolve correctly

## Verification

- Production build completed successfully with `npm run build`

## Important Note

The frontend is configured to read its backend URL from `VITE_API_BASE_URL`. The deployed app uses the Railway backend at `https://student-management-system-backend.up.railway.app`.
