# E-Commerce Backend API

A production-style e-commerce backend built with Node.js, TypeScript, Express, and PostgreSQL.  

This project demonstrates real-world backend architecture, authentication, and transactional systems.

---

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Access & Refresh token system
  - Role-based access control (admin vs user)

- **Product Management**
  - Create, update, and fetch products
  - Admin-protected endpoints
  - Pagination and filtering (price range)

- **Cart System**
  - User-specific cart
  - Add, update, remove items
  - Prevents duplicate entries using constraints

- **Order System**
  - Converts cart → order
  - Transaction-based (ensures data consistency)
  - Stores historical pricing

- **Backend Architecture**
  - Clean separation: routes → controllers → services
  - Input validation using Zod
  - Centralized error handling

- **Performance & Security**
  - Indexed database queries
  - Helmet & CORS enabled
  - Optimized queries with joins

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express, TypeScript  
- **Database:** PostgreSQL  
- **Auth:** JSON Web Tokens (JWT)  
- **Validation:** Zod  
- **Security:** Helmet, CORS  

---

## 📂 Project Structure

src/
  controllers/
  middleware/
  routes/
  services/
  validator/
app.ts
db.ts
server.ts

---

## Setup

### 1. Clone Repository

git clone https://github.com/willio4/fullstack-foundation
cd fullstack-foundation

### 2. Install Dependencies

npm install

### 3. Configure environment variables

Create an .env file

PORT=3000
DATABASE_URL=postgres://localhost:5432/foundation_db
ACCESS_TOKEN_SECRET=your_access_token
REFRESH_TOKEN_SECRET=your_refresh_token

### 4. Run database

Make sure PostgreSQL is running and create required tables.

### 5. Start development server

npm run dev

### 6. Build for production

npm run build
npm start

## API Overview

### Auth

POST /users -> Register
POST /users/login -> Login
POST /users/refresh -> Refresh Access Token

### Products
GET /products -> List products
POST /products -> Create product (admin only)
PUT /products/:id -> Update product (admin only)

### Cart

GET /cart -> get user cart
POST /cart -> add item
PUT /cart -> update quantity
DELETE /cart -> remove item

### Orders
POST /orders -> create order from cart
GET /orders -> get user orders
