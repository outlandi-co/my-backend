// routes/products.js
const express = require('express');
const router = express.Router();

// Sample products data (replace this with your actual data)
let products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 15.99 }
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET a single product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST a new product
router.post('/', (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});

// PUT (update) an existing product
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...req.body, id };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
