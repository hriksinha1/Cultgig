import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Express
const app = express();

// MongoDB connection
let db;
let client;

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

async function connectDB() {
  try {
    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: (process.env.CORS_ORIGINS || '*').split(','),
    methods: ['*'],
    allowedHeaders: ['*'],
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// Routes
// ============================================================================

// GET /api/
app.get('/api/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// POST /api/status - Create a status check
app.post('/api/status', async (req, res) => {
  try {
    const { client_name } = req.body;

    if (!client_name) {
      return res.status(400).json({ error: 'client_name is required' });
    }

    const statusCheck = {
      id: uuidv4(),
      client_name,
      timestamp: new Date().toISOString(),
    };

    const result = await db.collection('status_checks').insertOne(statusCheck);

    // Return the inserted document
    res.status(201).json(statusCheck);
  } catch (err) {
    console.error('Error creating status check:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/status - Get all status checks
app.get('/api/status', async (req, res) => {
  try {
    const statusChecks = await db
      .collection('status_checks')
      .find({})
      .project({ _id: 0 })
      .toArray();

    // Convert ISO string timestamps to Date objects for consistency
    const formattedChecks = statusChecks.map((check) => ({
      ...check,
      timestamp: new Date(check.timestamp),
    }));

    res.json(formattedChecks);
  } catch (err) {
    console.error('Error fetching status checks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================================
// Error handling middleware
// ============================================================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================================
// Start server
// ============================================================================
const PORT = process.env.PORT || 8000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ API routes available under /api prefix`);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
