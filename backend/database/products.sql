CREATE DATABASE IF NOT EXISTS product_db;


USE product_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dummy Data 
INSERT INTO products (name, price, category) VALUES 
('Wireless Mouse', 25.50, 'Electronics'),
('Mechanical Keyboard', 85.00, 'Electronics'),
('Cotton T-Shirt', 15.99, 'Clothing'),
('Stainless Steel Water Bottle', 12.00, 'Home'),
('JavaScript: The Good Parts', 29.99, 'Books');