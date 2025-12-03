const express = require('express');
const router = express.Router();

// Import the Controller (Ensure you have this file created as well)
const productController = require('../controllers/productController');

// Define the routes mapping to controller functions

// GET /api/products - Fetch all products (with optional search)
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Fetch a single product by ID
router.get('/:id', productController.getProductById);

// POST /api/products - Create a new product
router.post('/', productController.createProduct);

// PUT /api/products/:id - Update an existing product
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;