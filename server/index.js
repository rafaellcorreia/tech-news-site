import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import newsRoutes from './routes/news.js';
import eventsRoutes from './routes/events.js';
import contactsRoutes from './routes/contacts.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Serve static files from public folder (videos, images, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/contacts', contactsRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
