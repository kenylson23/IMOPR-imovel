# Overview

This is a full-stack real estate web application called "Palanca Real" built for the Angolan market. The application allows users to browse properties, search with filters, view property details, and contact agents. It features a modern responsive design with Portuguese language support and focuses on providing a comprehensive property listing platform for Angola's major cities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern component-based UI using functional components with hooks
- **Wouter**: Lightweight client-side routing instead of React Router
- **TanStack Query**: Server state management for API calls, caching, and data synchronization
- **Tailwind CSS + shadcn/ui**: Utility-first styling with pre-built component library
- **Vite**: Fast build tool and development server with HMR support

### Backend Architecture
- **Express.js**: Node.js web framework handling REST API endpoints
- **In-Memory Storage**: Current implementation uses Map-based storage with sample data
- **TypeScript**: Full type safety across the entire application stack
- **Shared Schema**: Common type definitions between frontend and backend via shared directory

### Database Layer
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Schema Definition**: Centralized database schema in shared/schema.ts covering properties, agents, and contacts
- **Migration Support**: Database migration system using Drizzle Kit

### API Design
- **RESTful Endpoints**: Standard HTTP methods for property and agent operations
- **Filtering Support**: Query parameter-based filtering for properties (city, type, price, bedrooms)
- **Form Handling**: Contact form submission with validation
- **Error Handling**: Centralized error middleware with proper status codes

### UI/UX Architecture
- **Component Structure**: Organized into layout, property, agent, and contact modules
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Form Management**: React Hook Form with Zod validation
- **Toast Notifications**: User feedback system for actions and errors
- **Accessibility**: Proper ARIA attributes and semantic HTML

### Development Architecture
- **Monorepo Structure**: Client and server code in same repository with shared types
- **Hot Reload**: Development setup with automatic reloading for both frontend and backend
- **Type Safety**: End-to-end TypeScript with strict configuration
- **Path Aliases**: Simplified imports using @ prefixes for better developer experience

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless environments
- **@tanstack/react-query**: Powerful data synchronization for React applications
- **@radix-ui/react-***: Comprehensive accessible UI primitives for complex components
- **drizzle-orm & drizzle-kit**: Type-safe ORM and database toolkit

### UI and Styling
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Utility for managing component variants
- **cmdk**: Command palette component for enhanced user interaction
- **embla-carousel-react**: Touch-friendly carousel component

### Form and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Integration layer for external validation libraries
- **zod**: TypeScript-first schema validation

### Development Tools
- **vite**: Fast build tool with optimized development experience
- **tsx**: TypeScript execution engine for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Database and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **date-fns**: Comprehensive date utility library

The application is structured as a monorepo with clear separation between client, server, and shared code. The architecture supports both development and production deployments with proper build optimization and error handling throughout the stack.