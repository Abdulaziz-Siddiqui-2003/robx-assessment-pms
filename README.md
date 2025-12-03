Simple Product Management System

A full-stack Inventory Management application built with Next.js, Express.js, and MySQL. This project follows the MVC architecture and provides a clean interface for creating, reading, updating, and deleting products.

🛠 Tech Stack

Frontend: Next.js (App Router), TailwindCSS

Backend: Node.js, Express.js

Database: MySQL

Architecture: MVC (Model-View-Controller)

🚀 Setup & Run Instructions

Follow these steps to get the project running on your local machine.

1. Database Setup

Ensure MySQL is running.

Navigate to backend/database/ and find the products.sql file.

Import or run this SQL script in your MySQL Workbench or terminal.

It creates the product_db database.

It creates the products table.

It inserts dummy data for testing.

2. Backend Setup

Open a terminal and navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file in the backend root and configure your database:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=product_db


Start the backend server:

npm start


Server will run on http://localhost:5000

3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Option A: Development Mode

Use this to view code changes. (Note: A small Next.js badge may appear in the corner).

npm run dev


App will run on http://localhost:3000

Option B: Production Mode (Recommended for Review)

Use this to view the clean, optimized UI as a user would see it (No badges).

npm run build
npm start


App will run on http://localhost:3000

📖 API Documentation

The backend exposes the following RESTful API endpoints at http://localhost:5000/api.

Products

Method

Endpoint

Description

GET

/products

Retrieve a list of all products.

GET

/products/:id

Retrieve details of a single product.

POST

/products

Create a new product.

PUT

/products/:id

Update an existing product.

DELETE

/products/:id

Delete a product.

Request Body Examples

POST / Create Product

{
  "name": "Ergonomic Chair",
  "price": 199.99,
  "category": "Furniture"
}


PUT / Update Product

{
  "name": "Ergonomic Chair Pro",
  "price": 249.99,
  "category": "Furniture"
}



