const express = require('express');
const cors = require('cors');
const path = require('path');
const { readDB, writeDB, initDB } = require('./db');

const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');
const tripRoutes = require('./routes/trips');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize DB and populate default destinations if empty
function seedDatabase() {
  initDB();
  const db = readDB();
  
  // Seed initial destinations if none exist
  if (!db.destinations || db.destinations.length === 0) {
    const initialDestinations = [
      {
        id: "paris",
        name: "Paris",
        country: "France",
        continent: "Europe",
        tagline: "The City of Light, Art, and Romance",
        description: "Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy, and culture.",
        heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
        thumbImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        reviewsCount: 3420,
        budgetTier: "$$$",
        avgCostPerDay: 180,
        currency: "EUR",
        bestSeason: "Spring (Apr–Jun) & Autumn (Sep–Nov)",
        weather: { temp: "18°C", icon: "cloud-sun", desc: "Mild & Pleasant" },
        lat: 48.8566,
        lng: 2.3522,
        categories: ["Culture", "Romance", "Food", "Heritage"],
        highlights: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Notre-Dame", "Montmartre"]
      },
      {
        id: "tokyo",
        name: "Tokyo",
        country: "Japan",
        continent: "Asia",
        tagline: "Neon-lit Skyscrapers & Ancient Traditions",
        description: "Tokyo, Japan’s bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.",
        heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
        thumbImage: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=600&q=80",
        rating: 4.95,
        reviewsCount: 4100,
        budgetTier: "$$$",
        avgCostPerDay: 200,
        currency: "JPY",
        bestSeason: "Spring (Mar–May) & Autumn (Sep–Nov)",
        weather: { temp: "22°C", icon: "sun", desc: "Clear & Sunny" },
        lat: 35.6762,
        lng: 139.6503,
        categories: ["Culture", "Food", "Technology", "Shopping"],
        highlights: ["Senso-ji Temple", "Shibuya Crossing", "Tokyo Skytree", "Akihabara", "Meiji Shrine"]
      },
      {
        id: "rome",
        name: "Rome",
        country: "Italy",
        continent: "Europe",
        tagline: "The Eternal City of History & Gastronomy",
        description: "Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display.",
        heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
        thumbImage: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=600&q=80",
        rating: 4.85,
        reviewsCount: 2980,
        budgetTier: "$$",
        avgCostPerDay: 160,
        currency: "EUR",
        bestSeason: "Spring (Apr–May) & Autumn (Sep–Oct)",
        weather: { temp: "24°C", icon: "sun", desc: "Warm & Sunny" },
        lat: 41.9028,
        lng: 12.4964,
        categories: ["Heritage", "Culture", "Food", "Romance"],
        highlights: ["Colosseum", "Vatican Museums", "Trevi Fountain", "Pantheon", "Piazza Navona"]
      },
      {
        id: "kyoto",
        name: "Kyoto",
        country: "Japan",
        continent: "Asia",
        tagline: "Serene Temples, Zen Gardens & Tea Ceremonies",
        description: "Kyoto, once the capital of Japan, is famous for its numerous classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
        heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
        thumbImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        reviewsCount: 2150,
        budgetTier: "$$",
        avgCostPerDay: 150,
        currency: "JPY",
        bestSeason: "Spring Cherry Blossom (Apr) & Autumn Foliage (Nov)",
        weather: { temp: "20°C", icon: "cloud-sun", desc: "Pleasant" },
        lat: 35.0116,
        lng: 135.7681,
        categories: ["Culture", "Nature", "Heritage"],
        highlights: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji (Golden Pavilion)", "Gion District"]
      }
    ];
    db.destinations = initialDestinations;
    writeDB(db);
    console.log('Database seeded with initial destinations.');
  }

  // Seed demo user if no users exist
  if (!db.users || db.users.length === 0) {
    const bcrypt = require('bcryptjs');
    const demoPasswordHash = bcrypt.hashSync('demo123456', 10);
    db.users = [
      {
        id: 'user_demo',
        name: 'Demo Traveler',
        email: 'demo@smarttour.com',
        passwordHash: demoPasswordHash,
        createdAt: new Date().toISOString()
      }
    ];
    writeDB(db);
    console.log('Database seeded with demo user.');
  }
}

seedDatabase();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString(), app: 'Smart Tour Backend API' });
});

// Serve frontend static files if running together
app.use(express.static(path.join(__dirname, '..')));

// Fallback route to index.html for single page app routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Smart Tour Backend Server running at http://localhost:${PORT}`);
});
