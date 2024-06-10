const express = require('express');
const router = express.Router();

// Sample product data
let products = [
  { id: 1, name: 'Product 1', price: 10.99, description: 'Description 1' },
  { id: 2, name: 'Product 2', price: 15.99, description: 'Description 2' }
  // Add more products as needed
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get a single product by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Create a new product
router.post('/', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Assign a new id
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update an existing product by id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Delete a product by id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
