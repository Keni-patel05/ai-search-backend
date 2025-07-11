const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./db');
const aiContentRoutes = require("./routes/aiContentRoutes");
const indexRoutes = require("./routes/indexRoutes");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Allow CORS from trusted origins
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ai-search-frontend1.vercel.app',
    'https://ai-search-frontend-ten.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser middleware with larger limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Route handling
app.use("/api/ai-content", aiContentRoutes);
app.use("/api/users", indexRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Welcome to the AI Search Backend API!");
});

// Optional: Catch-all for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Optional: Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
