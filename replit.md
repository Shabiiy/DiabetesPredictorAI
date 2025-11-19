# DiabetesAI - Diabetes Risk Prediction Application

## Overview

DiabetesAI is a web-based health application that uses machine learning to predict diabetes risk. Users input their health metrics and lifestyle factors through an intuitive form, and receive AI-powered risk assessments with personalized insights. The application provides dashboard analytics, health calculators, and educational resources to help users understand and manage their diabetes risk.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool
- Single-page application (SPA) using Wouter for client-side routing
- Component-based architecture with shadcn/ui (Radix UI primitives)
- Design system based on Material Design principles with healthcare app aesthetics
- Responsive layouts using Tailwind CSS with custom healthcare-focused design tokens

**UI Component Library**: shadcn/ui configured with the "new-york" style
- Radix UI primitives for accessible, unstyled components
- Custom theming with HSL color system supporting light/dark modes
- Typography hierarchy using Inter (body), Poppins (headings), and JetBrains Mono (metrics)

**State Management**:
- TanStack Query (React Query) for server state and API data caching
- React Hook Form with Zod validation for form state management
- Query client configured with infinite stale time and disabled refetching

**Key Pages**:
- Home: Landing page with features and call-to-action
- Predict: Multi-section health assessment form with sliders, switches, and inputs
- Results: Prediction visualization with risk metrics and recommendations
- Dashboard: Historical predictions with trend charts (using Recharts)
- Resources: Educational content about diabetes
- Tools: BMI calculator and blood sugar interpreter

### Backend Architecture

**Runtime**: Node.js with Express.js
- ESM modules (type: "module" in package.json)
- TypeScript compiled with tsx in development, esbuild for production builds
- Middleware for JSON parsing, URL encoding, and request logging

**API Design**: RESTful endpoints
- `GET /api/predictions` - Retrieve all predictions
- `GET /api/predictions/:id` - Retrieve specific prediction
- `POST /api/predictions` - Create new prediction with ML-based risk calculation

**Machine Learning Model**: Logistic regression implementation
- Trained on Pima Indians Diabetes Dataset features
- Features: glucose, blood pressure, BMI, age, pregnancies, family history, lifestyle factors
- Sigmoid activation function for probability calculation (0-1 risk score)
- Feature weights calibrated for raw (unnormalized) values
- Risk categorization: Low (<30%), Moderate (30-60%), High (>60%)

**Validation**: Zod schemas defined in shared layer
- Type-safe validation for all prediction inputs
- Range constraints (e.g., glucose 0-500, BMI 10-70, age 1-120)
- Shared schema between client and server ensures consistency

### Data Storage

**Current Implementation**: In-memory storage using Map data structure
- `MemStorage` class implementing `IStorage` interface
- Predictions stored with UUID identifiers
- Sorted by creation date (newest first)
- Suitable for development/demo; not persistent across restarts

**Database Configuration**: PostgreSQL with Drizzle ORM (configured but not actively used)
- Drizzle schema defined in `shared/schema.ts` with predictions table
- Neon Database serverless driver configured
- Migration system ready (`drizzle-kit push` command available)
- Schema includes all health metrics, risk scores, and timestamps

**Schema Design**:
- Single `predictions` table with 14 columns
- Numeric health metrics stored as `real` (floating point)
- Boolean flags for family history and smoking status
- Auto-generated UUIDs for primary keys
- Timestamp tracking for prediction creation

### External Dependencies

**UI Framework & Components**:
- React 18+ with TypeScript
- Radix UI component primitives (accordion, dialog, dropdown, select, slider, switch, tabs, toast, etc.)
- shadcn/ui configured component system
- Wouter for lightweight routing (alternative to React Router)

**Styling & Design**:
- Tailwind CSS with custom configuration
- PostCSS for CSS processing
- Custom CSS variables for theming in HSL format
- Design tokens for healthcare-specific UI patterns

**Data Visualization**:
- Recharts for line charts and data visualization
- Chart components for dashboard trend analysis

**Form Management**:
- React Hook Form for form state and submission
- @hookform/resolvers for Zod schema integration
- Controlled and uncontrolled form patterns

**Database & ORM**:
- Drizzle ORM with PostgreSQL dialect
- @neondatabase/serverless for database connection
- drizzle-zod for automatic Zod schema generation from database schema

**Validation**:
- Zod for runtime type validation
- Shared validation schemas between client and server

**Development Tools**:
- Vite with React plugin and HMR
- tsx for TypeScript execution in development
- esbuild for production server bundling
- Replit-specific plugins for runtime error overlay and dev tools

**Fonts**: Google Fonts integration
- Inter: Primary body text and UI elements
- Poppins: Headings and emphasis
- JetBrains Mono: Numeric health metrics
- Additional fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono

**Utilities**:
- clsx and tailwind-merge for className composition
- class-variance-authority for component variant management
- date-fns for date manipulation
- nanoid for unique ID generation