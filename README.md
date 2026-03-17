# MarketNest Frontend

Frontend application for MarketNest, built with React and Vite. It provides public product browsing, product details, and a protected brand dashboard for product management.

## Features

- Public catalog with search, category filtering, pagination, and skeleton loading states
- Product details page with richer visual presentation
- Authentication screens for signup and login
- Brand-only dashboard routes for summary, create, edit, and manage products
- Shared component system for forms, cards, modals, and pagination
- Toast and auth context providers for global app behavior

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion

## 1. Architecture Explanation

The frontend follows a feature-oriented, component-driven architecture:

- Routing layer: Route definitions and guards live in src/routes and gate brand-only views.
- Layout layer: MainLayout and DashboardLayout provide consistent shell composition.
- Page layer: Route-level pages in src/pages orchestrate data loading and user interactions.
- Domain UI layer: Feature components in src/components implement reusable visual blocks.
- State and behavior layer: Context providers and hooks manage authentication, toasts, debouncing, and shared client state.
- API layer: Centralized Axios instance and domain-specific API modules in src/api isolate network concerns.

Typical interaction flow:

1. A page triggers an API call through src/api modules.
2. Axios applies auth headers and refresh handling.
3. Response data is normalized into local component state.
4. Reusable UI components render updated results.

## 2. Authentication Flow Explanation

Authentication is handled by the frontend AuthContext plus Axios interceptors.

1. Signup/login pages call auth endpoints.
2. On successful login, the frontend stores the access token and user profile in local storage.
3. Axios request interceptor appends Bearer token for protected calls.
4. If a request returns 401, Axios attempts a refresh call once.
5. On refresh success, queued requests are replayed with the new access token.
6. On refresh failure, auth state is cleared and protected routes redirect to login/public pages.

Route protection:

- PrivateRoute enforces authenticated access.
- Allowed roles are checked before entering dashboard routes.

## 3. Folder Structure Overview

```text
frontend/
  public/                   # Static assets
  src/
    api/                    # Axios instance and API wrappers
    assets/                 # Images and static frontend assets
    components/
      common/               # Cross-feature components
      dashboard/            # Dashboard widgets
      layout/               # Navbar and footer
      products/             # Product cards/forms/filter UI
      ui/                   # Generic reusable UI primitives
    context/                # Auth and toast providers
    hooks/                  # Reusable behavior hooks
    layouts/                # Main and dashboard layouts
    pages/                  # Route-level pages
      auth/                 # Login and signup pages
      dashboard/            # Create/edit/manage product pages
    routes/                 # Router configuration and route guards
    utils/                  # Small helper utilities
  index.html
```

## 4. Security Decisions

- No refresh token is stored in local storage; refresh handling depends on backend cookie-based refresh endpoint.
- Access token is attached only through centralized Axios interceptor logic to avoid scattered auth handling.
- Unauthorized responses trigger controlled token refresh and explicit auth reset on failure.
- Protected and role-restricted routes are enforced at routing level to reduce accidental UI access.
- Form payloads are sent to server-side validators; client-side checks are treated as UX helpers, not trust boundaries.

## 5. AI Tool Usage

AI tools were used as a development accelerator, with manual validation before finalizing changes.

Applied in this frontend repository:

- Documentation drafting and structuring
- UI copy refinements for product-facing text
- Support with repetitive refactoring patterns

Manual ownership retained for:

- Route design and feature behavior decisions
- API integration logic and auth handling expectations
- Final quality review and acceptance of all generated edits

## Setup and Run

1. Install dependencies.

```bash
npm install
```

2. Create environment variables in a .env file.

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server.

```bash
npm run dev
```

4. Additional scripts.

```bash
npm run lint
npm run build
npm run preview
```
