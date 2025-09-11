# nest-clean

A study project focused on Clean Architecture principles using NestJS.

## 🛠️ Tech Stack

- **NestJS** – Progressive Node.js framework for building scalable server-side applications
- **Biome** – Code formatting and linting
- **Docker + Docker Compose** – Containerized PostgreSQL database
- **PostgreSQL** – Relational database
- **Prisma** – Type-safe ORM for database access and migrations
- **@prisma/client** – Auto-generated Prisma client for database queries
- **bcryptjs** – Secure password hashing and verification
- **Zod** – Schema validation for request inputs and environment variables
- **passport-jwt** – JWT authentication strategy for Passport (used in NestJS Auth)

## �️ Project Structure & Patterns

- **Clean Architecture** – Separation of concerns: controllers, services, modules, pipes
- **Modular Design** – Features organized in modules (e.g., Auth)
- **Validation Layer** – Request validation using Zod pipes
- **Database Access** – Prisma service for database operations

## 🚀 Setup & Configuration

1. **Clone the repository**
2. **Install dependencies**

```fish
pnpm install
```

3. **Start PostgreSQL with Docker**

```fish
docker-compose up -d
```

4. **Run database migrations**

```fish
pnpm prisma migrate dev
```

5. **Start the API**

```fish
pnpm start:dev
```

## 🌐 API Endpoints

- The API runs at: http://localhost:3333
  - `POST /accounts` – Create a new user account
  - `POST /sessions` – Authenticate and create a new session
