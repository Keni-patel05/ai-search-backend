const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./db'); 
const aiContentRoutes = require("./routes/aiContentRoutes");
const dotenv = require("dotenv");
const indexRoutes = require("./routes/indexRoutes");

dotenv.config();
const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ai-search-frontend1.vercel.app',
    'https://ai-search-frontend-ten.vercel.app' // ✅ NEW frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Increase the JSON payload limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

connectDB();

//route prefixes
app.use("/api/ai-content", aiContentRoutes);  
app.use("/api/users", indexRoutes); 

app.get("/", (req, res) => {
  res.send("Welcome to My API");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));