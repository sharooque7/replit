# Alex Morgan - Backend Software Engineer Portfolio

## Overview

This is a full-stack portfolio website for Alex Morgan, a Backend Software Engineer. The application showcases professional experience, projects, skills, and provides contact functionality. It's built as a modern single-page application with a React frontend and Express.js backend, designed to demonstrate technical expertise in backend development.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Production**: ESBuild for bundling and optimization

### Database & ORM
- **Database**: PostgreSQL (configured for production, with in-memory storage fallback)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon Database serverless driver for PostgreSQL
- **Schema**: Type-safe schema definitions with Zod validation

## Key Components

### Frontend Components
- **Navigation**: Fixed navigation with smooth scrolling to sections
- **Hero Section**: Introduction with call-to-action buttons and social links
- **About Section**: Professional overview with technology showcase
- **Projects Section**: Portfolio of backend projects with technology badges
- **Resume Section**: Experience timeline with download functionality
- **Contact Form**: Interactive contact form with validation and submission
- **Footer**: Social links and copyright information

### Backend Services
- **Resume Download**: File serving endpoint for PDF resume download
- **Contact Form**: Form submission handler (placeholder for future email integration)
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Static Assets**: Vite development server integration and static file serving

### UI System
- **Design System**: Custom color palette optimized for professional presentation
- **Typography**: Inter font family for modern, readable text
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## Data Flow

### Development Flow
1. Client requests served by Vite development server
2. API requests proxied to Express backend on port 5000
3. Hot module replacement for instant development feedback
4. TypeScript compilation and type checking across shared modules

### Production Flow
1. Frontend built and bundled into static assets
2. Backend compiled and bundled with ESBuild
3. Express serves both API endpoints and static frontend assets
4. Database connections established via environment variables

### Data Models
```typescript
// User schema for future authentication features
users: {
  id: serial (primary key)
  username: text (unique, not null)
  password: text (not null)
}
```

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with excellent TypeScript support
- **@tanstack/react-query**: Powerful data fetching and caching
- **@radix-ui/***: Accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Fast build tool with HMR
- **typescript**: Type safety and developer experience
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production builds

### External Services
- **Unsplash**: Stock photography for project showcases and hero images
- **Google Fonts**: Inter font family for typography
- **Replit**: Development and deployment platform integration

## Deployment Strategy

### Environment Configuration
- **Development**: Local development with hot reloading on port 5000
- **Production**: Autoscale deployment with build optimization
- **Database**: Environment variable configuration for PostgreSQL connection

### Build Process
1. **Frontend Build**: Vite compiles React/TypeScript to optimized static assets
2. **Backend Build**: ESBuild bundles server code with external package handling
3. **Asset Management**: Static assets served from dist/public directory

### Deployment Features
- **Port Configuration**: External port 80 mapping to internal port 5000
- **Workflow Integration**: Parallel task execution for development
- **Environment Detection**: Conditional features based on REPL_ID and NODE_ENV

## Changelog
- June 16, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.