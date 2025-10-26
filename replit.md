# Financial Freedom Landing Page

## Overview

A conversion-focused landing page application designed to guide users through a three-stage journey: initial signup, congratulations acknowledgment, and secure payment processing. Built with React, Express, and TypeScript, this application emphasizes trust-building through clean design and progressive disclosure, drawing inspiration from modern fintech leaders like Stripe, Revolut, and Coinbase.

The application collects user contact information, provides motivational feedback, and integrates with Yoco payment gateway for processing payments in South African Rand (ZAR).

## User Preferences

Preferred communication style: Simple, everyday language.

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
- **Landing Page**: Hero section with contact form (name, email, phone)
- **Congratulations Page**: Transitional motivational screen with 3-second countdown
- **Payment Page**: Yoco payment integration with amount selection
- **Payment Success/Failure**: Result pages for transaction outcomes

Design follows principles from `design_guidelines.md`: bold typography (text-xl minimum), single-column layouts, generous whitespace, and aspirational messaging.

### Backend Architecture

**Express.js REST API**
- Node.js server using Express with TypeScript
- RESTful API endpoints under `/api` namespace
- JSON request/response format
- Custom logging middleware for API request tracking

**API Endpoints**
- `POST /api/contacts` - Create new contact entry
- `GET /api/contacts/:id` - Retrieve contact by ID
- `POST /api/yoco/create-checkout` - Initialize Yoco payment checkout

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
  - Creates checkout sessions and handles payment redirects

**Database (Configured)**
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