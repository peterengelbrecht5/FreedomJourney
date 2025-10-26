# Financial Freedom Landing Page

## Overview

A conversion-focused landing page application designed to guide users through a three-stage journey: initial signup, congratulations acknowledgment, and secure payment processing. Built with React, Express, and TypeScript, this application emphasizes trust-building through clean design and progressive disclosure, drawing inspiration from modern fintech leaders like Stripe, Revolut, and Coinbase.

The application collects user contact information, provides motivational feedback, and integrates with Yoco payment gateway for processing payments in South African Rand (ZAR).

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 26, 2025)

- **Complete Application Implementation**: Built all three pages (landing, congratulations, payment) with full backend integration
- **Backend API Routes**: Implemented contact submission endpoint and Yoco checkout creation endpoint
- **Yoco Payment Integration**: Added complete Yoco payment flow with redirect URLs for success/failure/cancel scenarios
- **Form Validation**: Integrated React Hook Form with Zod validation for contact form and payment amount
- **Error Handling**: Added comprehensive error handling with toast notifications for user feedback
- **Payment Success/Failure Pages**: Created dedicated pages for payment outcome handling

## System Architecture

### Frontend Architecture

**React with TypeScript SPA**
- Single-page application using React 18+ with TypeScript for type safety
- Client-side routing via Wouter (lightweight alternative to React Router)
- State management through React hooks and local component state
- Form validation using React Hook Form with Zod schema validation
- Query state management via TanStack Query (React Query) for server state synchronization

**UI Component System**
- Shadcn/ui component library (Radix UI primitives with Tailwind CSS)
- Design system configuration in `components.json` using "new-york" style preset
- Comprehensive component library including forms, dialogs, toasts, and navigation elements
- Consistent styling through Tailwind CSS with custom CSS variables for theming

**Page Flow Architecture**
1. **Landing Page** (`/`): Hero section with contact form (name, email, phone)
   - Full-screen hero image with gradient overlay
   - Centered contact form with validation
   - Trust indicators (Secure, Private, Instant Access)
   - Submits to `/api/contacts` endpoint
   - Redirects to `/congratulations` on success

2. **Congratulations Page** (`/congratulations`): Transitional motivational screen
   - Success icon with animation
   - Motivational messaging about financial freedom
   - 3-second countdown timer
   - Automatic redirect to `/payment`

3. **Payment Page** (`/payment`): Yoco payment integration
   - Amount input field (minimum R2.00)
   - "Proceed to Secure Payment" button
   - Calls `/api/yoco/create-checkout` endpoint
   - Redirects to Yoco's hosted checkout page

4. **Payment Success Page** (`/payment/success`): Confirmation screen
   - Success icon and messaging
   - Return to home button

5. **Payment Failure Page** (`/payment/failure`): Error handling
   - Error icon and messaging
   - Retry payment or return home options

Design follows principles from `design_guidelines.md`: bold typography (text-xl minimum), single-column layouts, generous whitespace, and aspirational messaging.

### Backend Architecture

**Express.js REST API**
- Node.js server using Express with TypeScript
- RESTful API endpoints under `/api` namespace
- JSON request/response format
- Custom logging middleware for API request tracking

**API Endpoints**
- `POST /api/contacts` - Create new contact entry (validates name, email, phone)
- `GET /api/contacts/:id` - Retrieve contact by ID
- `POST /api/yoco/create-checkout` - Initialize Yoco payment checkout
  - Accepts: amount (in cents), currency (default: ZAR), metadata
  - Returns: Yoco checkout object with redirectUrl
  - Validates: minimum amount of R2.00 (200 cents)
  - Includes: success, cancel, and failure redirect URLs

**Data Storage Strategy**
- In-memory storage implementation (`MemStorage` class) for contacts
- Interface-based storage abstraction (`IStorage`) allows future database integration
- Database schema defined using Drizzle ORM with PostgreSQL dialect
- Schema includes `contacts` table with id, name, email, and phone fields

The application is prepared for PostgreSQL integration through Drizzle configuration, but currently uses memory storage. The storage layer can be swapped without changing API contracts.

**Development Tooling**
- Vite for frontend bundling and HMR (Hot Module Replacement)
- ESBuild for backend compilation
- Development server with Vite middleware integration
- Separate build processes for client and server

### External Dependencies

**Payment Gateway**
- **Yoco Payments API** - South African payment processor
  - API endpoint: `https://payments.yoco.com/api`
  - Authentication via `YOCO_SECRET_KEY` environment variable
  - Minimum payment amount: R2.00 (200 cents)
  - Currency: ZAR (South African Rand)
  - Flow: Create checkout → Redirect to Yoco → User completes payment → Return to success/failure URL
  - Supports: Visa, Mastercard, AMEX, digital wallets (Apple Pay, Google Pay), Instant EFT

**Database (Configured but not active)**
- **PostgreSQL** via Neon serverless driver (`@neondatabase/serverless`)
- Connection string expected in `DATABASE_URL` environment variable
- Drizzle ORM for type-safe database queries and migrations
- Migration files generated in `./migrations` directory

**UI Component Libraries**
- **Radix UI** - Accessible component primitives (accordion, dialog, dropdown, select, etc.)
- **Lucide React** - Icon library for UI elements
- **Tailwind CSS** - Utility-first styling framework
- **Class Variance Authority** - Component variant management

**Form & Validation**
- **React Hook Form** - Form state management and validation
- **Zod** - Runtime type validation and schema definition
- **@hookform/resolvers** - Zod integration with React Hook Form

**Fonts**
- Google Fonts integration (Inter, Manrope, DM Sans, Geist Mono, Architects Daughter, Fira Code)
- Configured in `client/index.html`

**Development Environment**
- Replit-specific plugins for error overlay, cartographer, and dev banner
- PostCSS with Tailwind CSS and Autoprefixer

## Environment Variables

**Required Secrets:**
- `YOCO_SECRET_KEY` - Yoco API secret key (starts with `sk_test_` for sandbox or `sk_live_` for production)
- `YOCO_PUBLIC_KEY` - Yoco API public key (starts with `pk_test_` or `pk_live_`) - Currently not used in the app but available

**Auto-Generated:**
- `SESSION_SECRET` - Express session secret (auto-generated by Replit)

## Development Notes

### Testing
- Use Yoco test keys (`sk_test_...` and `pk_test_...`) for development
- Minimum payment amount is R2.00 (200 cents)
- Yoco requires HTTPS redirect URLs in production (HTTP URLs will fail)
- The development environment may show a 400 error when creating checkouts due to HTTP redirect URLs - this is expected and will work in production with HTTPS

### Production Deployment
Before deploying to production:
1. Switch from test keys to live Yoco keys
2. Ensure the application is served over HTTPS
3. Test the complete payment flow with a minimum R2.00 transaction
4. Consider implementing webhook verification for payment confirmation
5. Consider replacing in-memory storage with PostgreSQL database

### Known Limitations
- Contact data is stored in memory and will be lost on server restart
- No webhook verification implemented (payments are confirmed via redirect URLs only)
- No admin dashboard to view collected contacts
- No email confirmation system
