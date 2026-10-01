const express = require('express');
const { readDB, writeDB } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET all saved trips for the authenticated user
router.get('/', authenticateToken, (req, res) => {
  const db = readDB();
  const userTrips = (db.trips || []).filter(t => t.userId === req.user.id);
  res.json({ count: userTrips.length, trips: userTrips });
});

// POST save a new trip
router.post('/', authenticateToken, (req, res) => {
  try {
    const tripData = req.body;

    if (!tripData || !tripData.title) {
      return res.status(400).json({ error: 'Invalid trip payload' });
    }

    const db = readDB();
    if (!db.trips) db.trips = [];

    const newTrip = {
      ...tripData,
      id: tripData.id || ('trip_' + Date.now()),
      userId: req.user.id,
      createdAt: new Date().toISOString()
    };

    // Remove existing if updating
    db.trips = db.trips.filter(t => !(t.id === newTrip.id && t.userId === req.user.id));
    db.trips.unshift(newTrip);

    writeDB(db);

    res.status(201).json({ message: 'Trip saved successfully', trip: newTrip });
  } catch (err) {
    console.error('Save trip error:', err);
    res.status(500).json({ error: 'Failed to save trip' });
  }
});

// DELETE a saved trip
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const tripId = req.params.id;
    const db = readDB();

    if (!db.trips) db.trips = [];

    const initialLength = db.trips.length;
    db.trips = db.trips.filter(t => !(t.id === tripId && t.userId === req.user.id));

    if (db.trips.length === initialLength) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    writeDB(db);
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Delete trip error:', err);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

module.exports = router;
