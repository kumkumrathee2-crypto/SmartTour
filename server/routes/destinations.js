const express = require('express');
const { readDB } = require('../db');

const router = express.Router();

// Get all destinations (with optional filter by query)
router.get('/', (req, res) => {
  const db = readDB();
  let destinations = db.destinations || [];

  const { category, search } = req.query;

  if (search) {
    const q = search.toLowerCase();
    destinations = destinations.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.country.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    destinations = destinations.filter(d => 
      d.categories && d.categories.includes(category)
    );
  }

  res.json({ count: destinations.length, destinations });
});

// Get destination by ID
router.get('/:id', (req, res) => {
  const db = readDB();
  const dest = (db.destinations || []).find(d => d.id === req.params.id);

  if (!dest) {
    return res.status(404).json({ error: 'Destination not found' });
  }

  res.json(dest);
});

module.exports = router;
