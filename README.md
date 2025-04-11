
# Inventory Management System

An inventory management system built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript, Prisma, and Swagger API documentation. The application facilitates efficient management of stores, products, and user roles. It supports features like authentication, authorization, CRUD operations for stores, and an admin dashboard to manage inventory.

## Features

- **User Authentication & Authorization**: 
  - JWT authentication for secure login and registration.
  - Admin and user roles with distinct access rights.

- **Store Management**:
  - Admin can create, update, delete stores.
  - Users can be assigned to stores, and each store has one owner.
  
- **Swagger API Documentation**:
  - Automatic generation of API documentation for easy testing and understanding of API endpoints.

- **Prisma ORM**:
  - Database interactions are managed using Prisma for a modern, type-safe, and efficient database layer.
  
- **TypeScript**:
  - Fully typed codebase for better maintainability, safety, and developer experience.

## Tech Stack

- **Backend**: 
  - Node.js with Express
  - TypeScript
  - Prisma (for ORM and DB management)
  - JWT Authentication
  - Swagger for API documentation
  - bcrypt for password hashing

- **Database**: 
  - PostgreSQL (connected via Prisma)

- **Frontend**: 
  - Not included (for the scope of this repo, backend-focused)

## Getting Started

### Prerequisites

1. **Node.js** (v16.x or later)
2. **npm** (v8.x or later)
3. **PostgreSQL** database (local or remote)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inventory-management.git
   cd inventory-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and configure the required environment variables such as `DATABASE_URL` (for PostgreSQL), JWT secret, etc.

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the application:
   ```bash
   npm run start
   ```

6. To run in development mode with hot-reloading:
   ```bash
   npm run dev
   ```

### Database Setup

1. Make sure you have a PostgreSQL database running.
2. Configure the connection URL in your `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
   ```

3. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate deploy
   ```

### API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

This provides an interactive interface for testing the API endpoints.

## API Endpoints

### Authentication Routes

- **POST** `/api/auth/signup`: Register a new user.
- **POST** `/api/auth/login`: Log in a user and receive a JWT token.
- **GET** `/api/auth/me`: Get details of the authenticated user.
- **POST** `/api/auth/logout`: Log out the current user.

### User Routes

- **GET** `/api/users`: Get all users (Admin only).
- **GET** `/api/users/:id`: Get a user by ID (Admin only).
- **PUT** `/api/users/:id`: Update a user (Admin only).
- **DELETE** `/api/users/:id`: Delete a user (Admin only).

### Store Routes

- **GET** `/api/stores`: Get all stores (Admin only).
- **POST** `/api/stores`: Create a new store (Admin only).
- **GET** `/api/stores/:id`: Get a store by ID.
- **PUT** `/api/stores/:id`: Update a store (Owner only).
- **DELETE** `/api/stores/:id`: Delete a store (Admin or Owner).

## Deployment

### Render Deployment

1. Set up your project on [Render](https://render.com).
2. Link your repository and configure the environment variables in the Render dashboard.
3. Set the build and start commands:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`

4. Deploy the application.

### Local Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start the server**:
   ```bash
   npm run start
   ```

3. Open your browser and navigate to `http://localhost:5000`.


## Testing

Unit tests can be added with a testing framework such as **Jest** or **Mocha**, and API tests can be written with **Supertest**.

## Contributing

Feel free to fork the project, submit pull requests, and report issues. Contributions are welcome!

## License

MIT License. See [LICENSE](./LICENSE) for details.

## Acknowledgments

- Thanks to the contributors and maintainers of Prisma, Swagger, and the Express community.
