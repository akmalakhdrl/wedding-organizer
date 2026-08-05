import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Helper function to read database
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { bookings: [], availability: {} };
  }
};

// Helper function to write database
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to db.json:', err);
  }
};

// --- REST API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Aura Luxury Wedding Organizer API',
    timestamp: new Date().toISOString()
  });
});

// Brand Config
app.get('/api/config', (req, res) => {
  const db = readDB();
  res.json(db.brandConfig || {});
});

// Availability Checker
app.get('/api/availability', (req, res) => {
  const db = readDB();
  res.json({
    availability: db.availability || {}
  });
});

// Create Booking / Consultation Submission
app.post('/api/bookings', (req, res) => {
  const { coupleName, phone, email, weddingDate, guestCount, city, packageChoice, notes } = req.body;

  if (!coupleName || !phone) {
    return res.status(400).json({ error: 'Nama pasangan dan nomor WhatsApp wajib diisi.' });
  }

  const db = readDB();
  const newBooking = {
    id: `BOOK-${Date.now().toString().slice(-6)}`,
    coupleName,
    phone,
    email: email || '',
    weddingDate: weddingDate || 'Belum pasti',
    guestCount: guestCount || '300-500 Undangan',
    city: city || 'Jakarta',
    packageChoice: packageChoice || 'Gold Royalty Package',
    notes: notes || '',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  db.bookings = [newBooking, ...(db.bookings || [])];

  // Lock date in calendar if provided
  if (weddingDate) {
    db.availability = db.availability || {};
    if (!db.availability[weddingDate]) {
      db.availability[weddingDate] = 'limited';
    }
  }

  writeDB(db);

  res.status(201).json({
    message: 'Permintaan booking/konsultasi berhasil dicatat.',
    booking: newBooking
  });
});

// Admin Get All Bookings
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json({
    total: (db.bookings || []).length,
    bookings: db.bookings || []
  });
});

// Budget Estimator Endpoint
app.post('/api/estimator', (req, res) => {
  const { guests = 400, venueType = 'ballroom', decorTier = 'deluxe', cateringTier = 'vip', docTier = 'cinematic' } = req.body;

  let baseWO = 15000000;
  if (guests > 600) baseWO = 25000000;

  let cateringRate = 120000;
  if (cateringTier === 'vip') cateringRate = 180000;
  if (cateringTier === 'luxury') cateringRate = 260000;

  const totalCatering = guests * cateringRate;

  let decorCost = 25000000;
  if (decorTier === 'deluxe') decorCost = 45000000;
  if (decorTier === 'royal') decorCost = 85000000;

  let venueCost = 20000000;
  if (venueType === 'ballroom') venueCost = 40000000;
  if (venueType === 'resort') venueCost = 65000000;
  if (venueType === 'glasshouse') venueCost = 35000000;

  let docCost = 12000000;
  if (docTier === 'cinematic') docCost = 22000000;

  let miscCost = 15000000;

  const min = Math.round((baseWO + totalCatering + decorCost + venueCost + docCost + miscCost) * 0.95);
  const max = Math.round((baseWO + totalCatering + decorCost + venueCost + docCost + miscCost) * 1.15);

  res.json({
    guests,
    venueType,
    decorTier,
    cateringTier,
    docTier,
    estimatedMin: min,
    estimatedMax: max,
    breakdown: {
      catering: totalCatering,
      decor: decorCost,
      venue: venueCost,
      doc: docCost,
      wo: baseWO,
      misc: miscCost
    }
  });
});

// Export default app for Vercel Serverless Functions
export default app;

// Start Express Server locally if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`👑 Aura Luxury Wedding Organizer REST API Online!`);
    console.log(`🚀 Running at: http://localhost:${PORT}`);
    console.log(`==================================================`);
  });
}
